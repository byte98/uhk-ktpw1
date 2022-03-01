// Copyright 2022 Jiri Skoda <skodaji1@uhk.cz>
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Script which handles displaying actual position of International Space Station
 */

/**
 * Interval of refreshing position of map (in miliseconds)
 */
const REFRESH_INTERVAL = 5000;

/**
 * API key to show BING maps
 */
const BING_API_KEY = "AnUEAHBkSYyrU_HBjDYDpi6KC-PRMU7Dbx3AsfqQhDISTvlmn77xrT87Tu6aZbra";

/**
 * URL address of API of station location
 */
const POSITION_API_URL = "http://api.open-notify.org/iss-now.json";

/**
 * Array of already loaded positions
 */
var positions = [];

/**
 * Variable holding reference to map
 */
var map;

/**
 * Variable holding path of already loaded positions
 */
var path = L.polyline.antPath(positions, {
    "delay": 400,
    "dashArray": [
      25,
      50
    ],
    "weight": 5,
    "color": "#0044FF",
    "pulseColor": "#FFFFFF",
    "paused": false,
    "reverse": false,
    "hardwareAccelerated": true
  });


  /**
   * Icon of marker of position of station
   */
var marker = L.marker([50.2041, 15.8294], {icon: L.icon({
    iconUrl: "images/station.webp",
    shadowUrl: "images/station_shadow.webp",
    iconSize: [128, 128],
    shadowSize: [128, 128],
    iconAnchor: [64, 64],
    shadowAnchor: [64, 64],
    popupAnchor: [64, 0]
})}) ;




document.addEventListener("readystatechange", function(){
    if (this.readyState == "complete")
    {
        // Initialise map
        map = L.map(document.getElementById("iss-map")).setView([50.2041, 15.8294], 9);
        let bing = new L.BingLayer(BING_API_KEY, {imagerySet: "AerialWithLabelsOnDemand"});
        map.addLayer(bing);
        map.addLayer(path);
        map.addLayer(marker);
        updatePosition();

        // Create update loop
        window.setInterval(function(){
            updatePosition();
        }, REFRESH_INTERVAL);
    }
});

/**
 * Function which updates position of station on map
 */
function updatePosition()
{
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200)
        {
            let data = JSON.parse(this.responseText);
            if (data.message == "success")
            {
                let longitude = Number.parseFloat(data.iss_position.longitude);
                let latitude = Number.parseFloat(data.iss_position.latitude);
                let position = {lon: longitude, lat: latitude};
                map.setView(position);
                positions.push(position);

                let timestamp = new Date(Number.parseInt(data.timestamp * 1000));
                document.getElementById("update-time-value").textContent = timestamp.toLocaleString();
                path.addLatLng(position);
                marker.setLatLng(position);
            }
        }
    }; 
    xhttp.open("GET", POSITION_API_URL);
    xhttp.send();
}