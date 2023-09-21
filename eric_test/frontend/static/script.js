const map = L.map('map').setView([40.70, -73.94], 13); // New York City coordinates


const url = `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=API_KEY`;

// Add a tile layer to the map (Mapbox Streets tile layer)
L.tileLayer(url, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

// Fetch the data once
fetch('http://127.0.0.1:5000/api/v1.0/kayak_restaurants_data')
    .then(response => response.json())
    .then(data => {
        // Function to create and add markers to the map
        function createAndAddMarker(d) {
            L.marker([d.latitude, d.longitude])
                .addTo(map)
                .bindPopup(`<b>${d.name}</b><br>Cuisine: ${d.cuisine}<br><a href="${d.url}" target="_blank">View on Kayak</a>`);
        }

        // Add markers to the map
        data.forEach(d => {
            createAndAddMarker(d);
        });

        function populateFilterOptions(id, field) {
            const uniqueValues = [...new Set(data.map(item => item[field]))];
            uniqueValues.sort();
            const sortedValues = ['all', ...uniqueValues];

            d3.select(id)
                .selectAll("option")
                .data(sortedValues)
                .enter()
                .append("option")
                .text(d => d)
                .attr("value", d => d);
        }
        function applyFilters() {
            const selectedRating = document.getElementById("rating-filter").value;
            const selectedCuisine = document.getElementById("cuisine-filter").value;
            const selectedPrice = document.getElementById("price_per_person-filter").value;
            const selectedLocality = document.getElementById("locality-filter").value;
            const selectedDiningStyle = document.getElementById("dining-style-filter").value;

            map.eachLayer(layer => {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer);
                }
            });

            data.forEach(d => {
                if ((selectedRating === "all" || d.overall_rating === selectedRating) &&
                    (selectedCuisine === "all" || d.cuisine === selectedCuisine) &&
                    (selectedPrice === "all" || d.price_per_person === selectedPrice) &&
                    (selectedLocality === "all" || d.locality === selectedLocality) &&
                    (selectedDiningStyle === "all" || d.dining_style === selectedDiningStyle)) {

                    createAndAddMarker(d);
                }
            });
        }
        populateFilterOptions("#rating-filter", "overall_rating");
        populateFilterOptions("#cuisine-filter", "cuisine");
        populateFilterOptions("#price_per_person-filter", "price_per_person");
        populateFilterOptions("#locality-filter", "locality");
        populateFilterOptions("#dining-style-filter", "dining_style");


        document.getElementById("apply-filters").addEventListener("click", applyFilters);



        const cuisineCounts = {};
        data.forEach(d => {
            if (cuisineCounts[d.cuisine]) {
                cuisineCounts[d.cuisine]++;
            } else {
                cuisineCounts[d.cuisine] = 1;
            }
        });

        const labels = Object.keys(cuisineCounts);
        const chartData = Object.values(cuisineCounts);

        const ctx = document.getElementById('myDoughnutChart').getContext('2d');
        const myDoughnutChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Number of Restaurants by Cuisine',
                    data: chartData,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',  // Red
                        'rgba(54, 162, 235, 0.5)',  // Blue
                        'rgba(255, 206, 86, 0.5)',  // Yellow
                        'rgba(75, 192, 192, 0.5)',  // Green
                        'rgba(153, 102, 255, 0.5)', // Purple
                        'rgba(255, 159, 64, 0.5)',  // Orange
                        'rgba(128, 0, 0, 0.5)',     // Maroon
                        'rgba(128, 128, 0, 0.5)',   // Olive
                        'rgba(0, 128, 0, 0.5)',     // Green
                        'rgba(128, 0, 128, 0.5)',   // Purple
                        'rgba(0, 128, 128, 0.5)',   // Teal
                        'rgba(0, 0, 128, 0.5)',     // Navy
                        'rgba(220, 20, 60, 0.5)',   // Crimson
                        'rgba(255, 0, 255, 0.5)',   // Magenta
                        'rgba(0, 255, 255, 0.5)',   // Cyan
                        'rgba(255, 215, 0, 0.5)',   // Gold
                        'rgba(210, 105, 30, 0.5)',  // Chocolate
                        'rgba(107, 142, 35, 0.5)',  // Olive Drab
                        'rgba(0, 191, 255, 0.5)',   // Deep Sky Blue
                        'rgba(255, 20, 147, 0.5)'   // Deep Pink
                    ],
                }],
            },
        });
    })
    .catch(error => console.log('Error:', error));
