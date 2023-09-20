// Initialize the map
const map = L.map('map').setView([40.70, -73.94], 13); // New York City coordinates

import { access_token } from './secrets.js';

const url = `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${access_token}`;

// Add a tile layer to the map (Mapbox Streets tile layer)
L.tileLayer(url, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

document.getElementById("loading-spinner").style.display = "block";

// Load restaurant data
d3.csv("kayak_data_v04-2.csv").then(data => {
    // Add restaurant data points to the map in initial state
    data.forEach(d => {
        L.marker([d.latitude, d.longitude])
         .addTo(map)
         .bindPopup(`<b>${d.name}</b><br>Cuisine: ${d.cuisine}<br><a href="${d.url}" target="_blank">View on Kayak</a>`);
    });

    // Function to populate filter options
    function populateFilterOptions(id, field) {
        const uniqueValues = [...new Set(data.map(item => item[field]))];
        uniqueValues.sort();  // Sort the values
        const sortedValues = ['all', ...uniqueValues];  // Add 'all' at the beginning

        d3.select(id)
          .selectAll("option")
          .data(uniqueValues)
          .enter()
          .append("option")
          .text(d => d)
          .attr("value", d => d);
    }

    // Populate filter options
    populateFilterOptions("#rating-filter", "overall_rating");
    populateFilterOptions("#cuisine-filter", "cuisine");
    populateFilterOptions("#price_per_person-filter", "price_per_person");
    populateFilterOptions("#locality-filter", "locality");
    populateFilterOptions("#dining-style-filter", "dining_style");

    // Apply Filters
    document.getElementById("apply-filters").addEventListener("click", function() {

        let markerCount = 0;  // Initialize a counter for the number of markers added
        
        const selectedRating = document.getElementById("rating-filter").value;
        const selectedCuisine = document.getElementById("cuisine-filter").value;
        const selectedPrice = document.getElementById("price_per_person-filter").value;
        const selectedLocality = document.getElementById("locality-filter").value;
        const selectedDiningStyle = document.getElementById("dining-style-filter").value;

        // Clear existing markers
        map.eachLayer(layer => {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });

        // Add filtered markers
        data.forEach(d => {
            if ((selectedRating === "all" || d.overall_rating === selectedRating) &&
                (selectedCuisine === "all" || d.cuisine === selectedCuisine) &&
                (selectedPrice === "all" || d.price_per_person === selectedPrice) &&
                (selectedLocality === "all" || d.locality === selectedLocality) &&
                (selectedDiningStyle === "all" || d.dining_style === selectedDiningStyle)) {
                
                L.marker([d.latitude, d.longitude])
                 .addTo(map)
                 .bindPopup(`<b>${d.name}</b><br>Cuisine: ${d.cuisine}`);

                 markerCount++;  // Increment the counter
            }
        });

        // Show or hide the "No results found" message
        if (markerCount === 0) {
            document.getElementById("no-results").style.display = "inline";
        } else {
            document.getElementById("no-results").style.display = "none";
        }
    });
    // Hide spinner after data is loaded
    document.getElementById("loading-spinner").style.display = "none";

}).catch(error => {
    console.error("Error loading the data:", error);
    document.getElementById("map").innerHTML = "";
    document.getElementById("error-message").style.display = "block";
    document.getElementById("loading-spinner").style.display = "none";
});
