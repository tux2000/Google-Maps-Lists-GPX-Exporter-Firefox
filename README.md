# Overview:
This plugin allows users to export saved places from Google Maps Lists into a GPX file. The plugin provides a user-friendly way to download the a GPX file with points from the Google Maps Lists for offline use, navigation, or importing into other mapping tools. The file is dynamically named after the Google Maps List it is based on.

## Key Features:
- Google Maps List Integration: Extracts saved locations from any custom Google Maps List created by the user.
- GPX Export: Generates a GPX file of saved places, making it easy to import the locations into GPS devices or mapping software.
- On-Demand Download: A button is provided in the interface to manually trigger the download of the latest GPX file, ensuring that the user only downloads when they are ready.
- Dynamic Naming: The GPX file is automatically named based on the Google Maps List name, making it easy to manage and identify exported files.
- Status Indicator: The download button icon dynamically changes appearance based on the availability of new content, indicating when a new GPX file is ready for download.
- Customizable GPX Output: Includes latitude, longitude, name, and comments for each saved place, extracted directly from the Google Maps List.

## How It Works:
- The plugin continuously monitors if a Google Maps Lists is loaded.
- Once a list is detected, the plugin parses the necessary location data (name, coordinates, and additional comments).
- When a GPX file is ready for export, the download button becomes active, notifying the user that a new GPX file can be downloaded.
- Users can click the download button to save the GPX file locally, named after the Google Maps List they are exporting.

## Use Cases:
- Travel Planning: Convert Google Maps Lists into GPX files for easy integration into GPS devices for offline navigation during trips.
- Offline Navigation: Travelers can easily take custom location lists into areas with limited or no internet connectivity.
- Route Planning: Export a collection of destinations (such as restaurants, landmarks, or activity locations) into a GPX file to help with route planning on GPS software or devices.
- Backup and Sharing: GPX files provide a portable backup of your saved locations and can easily be shared with friends or other mapping tools.

## Installation:

