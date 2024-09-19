let lastProcessedTime = 0;
const processInterval = 1000;  // Minimum interval (1 second) between processing requests
let latestGPX = "";  // Store the most recent GPX content here
let listName = "";   // Store the list name for the GPX filename

// Function to update the icon
function updateIcon(hasGPX) {
  const iconPath = hasGPX ? "icons/gpx-ready-icon.png" : "icons/gpx-icon.png";
  browser.browserAction.setIcon({ path: iconPath });
}

// Listen for the Google Maps entity list request
browser.webRequest.onCompleted.addListener(
  async (details) => {
    let currentTime = Date.now();
    if (currentTime - lastProcessedTime < processInterval) {
      console.log("Skipping repeated request.");
      return;  // Skip if the request was processed recently
    }

    lastProcessedTime = currentTime;

    try {
      let response = await fetch(details.url);
      let text = await response.text();
      let cleanResponse = text.substring(4);  // Remove first 4 characters
      let jsonResponse = JSON.parse(cleanResponse);

      // Extract the list name at position [0][4]
      listName = jsonResponse[0][4];
      console.log("Extracted list name:", listName);

      let entries = jsonResponse[0][8];
      if (!entries || entries.length === 0) {
        console.warn("No entries found in JSON response.");
        updateIcon(false);  // No GPX available
        return;
      }

      function toGPX(entry) {
        let name = entry[2];
        let lat = entry[1][5][2];
        let lon = entry[1][5][3];
        let comment = entry[3];
        return `<wpt lat="${lat}" lon="${lon}">
                  <name>${name}</name>
                  <desc>${comment}</desc>
                </wpt>`;
      }

      function generateGPX(entries) {
        let gpxHeader = '<?xml version="1.0" encoding="UTF-8"?>\n<gpx version="1.1" creator="Firefox-Plugin">\n';
        let gpxFooter = '</gpx>';
        let gpxWaypoints = entries.map(toGPX).join("\n");
        return `${gpxHeader}${gpxWaypoints}\n${gpxFooter}`;
      }

      if (entries.length > 0) {
        latestGPX = generateGPX(entries);
        console.log("GPX data stored successfully.");
        updateIcon(true);  // GPX available, update the icon
      } else {
        console.warn("No waypoints found.");
        updateIcon(false);  // No GPX available
      }

    } catch (error) {
      console.error("Error processing Google Maps response:", error);
      updateIcon(false);  // No GPX available due to error
    }
  },
  { urls: ["*://www.google.com/maps/preview/entitylist/getlist*"] }
);

// Listen for the user clicking the browser action button
browser.browserAction.onClicked.addListener(() => {
  if (latestGPX) {
    // Use listName as the file name for the GPX file
    let sanitizedListName = listName.replace(/[^a-zA-Z0-9_-]/g, "_");  // Replace invalid characters with underscores
    let blob = new Blob([latestGPX], { type: "application/gpx+xml" });
    let url = URL.createObjectURL(blob);
    browser.downloads.download({
      url: url,
      filename: `${sanitizedListName}.gpx`,
      saveAs: true
    });
    console.log("GPX file download initiated with filename:", `${sanitizedListName}.gpx`);

    // Reset the icon after download
    latestGPX = "";  // Clear the GPX data
    updateIcon(false);  // Reset icon to default
  } else {
    console.warn("No GPX data available for download.");
  }
});

