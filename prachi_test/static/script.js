fetch('http://127.0.0.1:5000/api/v1.0/kayak_restaurants_data')
    .then(response => response.json())
    .then(data => {


        // Interactive Restaurant Map of NYC
        function createAndAddMarker(d) {
            L.marker([d.latitude, d.longitude])
                .addTo(map)
                .bindPopup(`<b>${d.name}</b><br>Cuisine: ${d.cuisine}<br><a href="${d.url}" target="_blank">View on Kayak</a>`);
        }
        data.forEach(d => { createAndAddMarker(d); });
        function populateFilterOptions(id, field) {
            if (id !== "#rating-filter") {
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
                let ratingMatches = false;
                if (selectedRating === "all") {
                    ratingMatches = true;
                } else {
                    const [min, max] = selectedRating.split('-').map(Number);
                    if (d.overall_rating >= min && d.overall_rating < max) {
                        ratingMatches = true;
                    }
                }
                if (ratingMatches &&
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


        //rating bar chart data
        const uniqueCuisines = [...new Set(data.map(restaurant => restaurant.cuisine))];
        createMasterBarChart(uniqueCuisines, data);

        //cuisine pie chart data
        createPieChart(data);


        //reviews bar chart data
        drawTop10BarChart(data)
        populateFilterOptions("#cuisine-filter-top10", "cuisine");


        //dining radar chart data
        createRadarChart(data);


        //price polar chart data
        createPolarChart(data);


    })
    .catch(error => console.log('Error:', error));






////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////








// Map
const map = L.map('map').setView([40.70, -73.94], 13);
const url = `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZXJpY2ZheWh1eW5oIiwiYSI6ImNsbXBzYmJteTBoNXoybG51bnlwaXNxaDQifQ.fQ6iaJMaFDwYlxWRMvuFBA`;
L.tileLayer(url, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);









//cuisine pie chart
function createPieChart(data) {
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
        options: {
            aspectRatio: 2,
            plugins: {
                legend: {
                    position: 'right',
                },
                title: {
                    display: true,
                    text: ''
                }

            }
        },
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
}



//dining-style radar chart
function createRadarChart(data) {
    const uniqueLocalities = [...new Set(data.map(item => item.locality))];
    const uniqueDiningStyles = [...new Set(data.map(item => item.dining_style))];
    const sums = [];
    uniqueDiningStyles.forEach(diningStyle => {
        const sumObj = { diningStyle };
        uniqueLocalities.forEach(locality => {
            const sum = data.filter(item => item.locality === locality && item.dining_style === diningStyle).length;
            sumObj[locality] = sum;
        });
        sums.push(sumObj);
    });
    const radarData = {
        labels: uniqueLocalities,
        datasets: uniqueDiningStyles.map(diningStyle => ({
            label: diningStyle,
            data: uniqueLocalities.map(locality => {
                const sumObj = sums.find(item => item.diningStyle === diningStyle);
                return sumObj[locality] || 0;
            }),
            borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
        })),
    };
    const config = {
        type: 'radar',
        data: radarData,
        options: {
            aspectRatio: 2.5,
            plugins: {
                legend: {
                    display: true,
                    position: "right",
                },
            },
        },

    };
    const ctx3 = document.getElementById('radarChart').getContext('2d');
    new Chart(ctx3, config);
}






//most-reviews bar chart
let api_data = null;
let bar_chart = null;
function optionChangedTop10Filter(value) {
    if (value == 'all') {
        drawTop10BarChart(api_data)
    }
    else {
        cuisine_data = api_data.filter(function (d) {
            return d['cuisine'] === value;
        })
        drawTop10BarChart(cuisine_data)
    }
}
function drawTop10BarChart(Bar_data) {
    Bar_data.sort(function (a, b) {
        return b.reviews - a.reviews
    })
    let top_10 = Bar_data.slice(0, 10)
    let labels = top_10.map(function (value) {
        return value['name']
    });
    const data1 = {
        labels: labels,
        datasets: [
            {
                data: top_10.map(function (value) {
                    return value['reviews'];
                }),
                borderWidth: 1,
                barThickness: 25,
                label: '# of Reviews',
            },
        ],
    };
    const config = {
        type: 'bar',
        data: data1,
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Number of Reviews',
                    },
                },
            },
            plugins: {
                legend: {
                    display: false,
                },
            },
            responsive: true,
        },
    };
    if (bar_chart !== null) {
        bar_chart.destroy();
    }
    const barctx = document.getElementById('barchart').getContext('2d');
    bar_chart = new Chart(barctx, config);
}





//top-cuisine donut chart
function countCuisineOccurrences(data) {
    const doughnutcuisineCounts = {};
    data.forEach(restaurant => {
        const cuisine = restaurant.cuisine;
        doughnutcuisineCounts[cuisine] = (doughnutcuisineCounts[cuisine] || 0) + 1;
    });
    return doughnutcuisineCounts;
}
function getTop10Cuisines(doughnutcuisineCounts) {
    const sortedCuisines = Object.keys(doughnutcuisineCounts).sort(
        (a, b) => doughnutcuisineCounts[b] - doughnutcuisineCounts[a]
    );
    return sortedCuisines.slice(0, 10);
}
function createDoughnutChart(top10Cuisines, doughnutcuisineCounts) {
    const ctx2 = document.getElementById("cuisineChart").getContext("2d");
    const labels = top10Cuisines;
    const dataValues = top10Cuisines.map(cuisine => doughnutcuisineCounts[cuisine]);
    const chartConfig = {
        type: "doughnut",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Cuisine Distribution",
                    data: dataValues,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(255, 159, 64, 0.7)',
                        'rgba(255, 205, 86, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(153, 102, 255, 0.7)',
                        'rgba(201, 203, 207, 0.7)',
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(255, 159, 64, 0.7)',
                        'rgba(255, 205, 86, 0.7)',
                    ],
                },
            ],
        },
        options: {
            aspectRatio: 2,
            responsive: true,
            plugins: {
                legend: {
                    position: "right",
                },
                title: {
                    display: true,
                    text: "",
                },
            },
        },
    };
    const cuisineChart = new Chart(ctx2, chartConfig);
}



//price polar chart
function createPolarChart(data) {
    const doughnutcuisineCounts = countCuisineOccurrences(data);
    const top10Cuisines = getTop10Cuisines(doughnutcuisineCounts);
    createDoughnutChart(top10Cuisines, doughnutcuisineCounts);
    const pricePerPersonData = data.map(restaurant => restaurant.price_per_person);
    const priceDistribution = calculatePriceDistribution(pricePerPersonData);
    const ctx2 = document.getElementById('pieChart').getContext('2d');
    const myChart = new Chart(ctx2, {
        type: 'polarArea',
        data: {
            labels: ['$ = $30 & under', '$$ = $31 to $50', '$$$ = $50 and over'],
            datasets: [{
                data: priceDistribution,
                backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(255, 159, 64, 0.5)', 'rgba(75, 192, 192, 0.5)'],
            }],
        },
        options: {

            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                },
                title: {
                    display: true,
                    text: ''
                }

            }
        },
    });
}
function calculatePriceDistribution(priceData) {
    const distribution = {
        '$': 0,
        '$$': 0,
        '$$$': 0
    };
    priceData.forEach(price => {
        if (price === '$') {
            distribution['$']++;
        } else if (price === '$$') {
            distribution['$$']++;
        } else if (price === '$$$') {
            distribution['$$$']++;
        }
    });
    return Object.values(distribution);
}





//rating bar chart
function createMasterBarChart(uniqueCuisines, data) {
    const ratingZones = [
        "2.9 and below",
        "3.0 to 3.5",
        "3.6 to 3.9",
        "4.0 to 4.5",
        "4.6 to 4.9",];
    const ratingsByCuisineAndZone = {};
    uniqueCuisines.forEach(cuisine => {
        ratingZones.forEach(zone => {
            const filteredData = data.filter(restaurant => {
                const rating = parseFloat(restaurant.overall_rating);
                if (zone === "2.9 and below") {
                    return restaurant.cuisine === cuisine && rating <= 2.9;
                } else {
                    const range = zone.split(" to ");
                    const min = parseFloat(range[0]);
                    const max = parseFloat(range[1]);
                    return restaurant.cuisine === cuisine && rating >= min && rating <= max;
                }
            });
            ratingsByCuisineAndZone[`${cuisine} - ${zone}`] = filteredData.length;
        });
    });
    const xAxisLabels = uniqueCuisines;
    const datasets = ratingZones.map(zone => ({
        label: zone,
        backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.7)`,
        data: xAxisLabels.map(cuisine => ratingsByCuisineAndZone[`${cuisine} - ${zone}`] || 0),
    }));
    const ctx = document.getElementById("cuisineRatingsChart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: xAxisLabels,
            datasets: datasets,
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                    title: {
                        display: true,
                        text: "Type of Cuisine",
                    },
                },
                y: {
                    stacked: true,
                    title: {
                        display: true,
                        text: "Number of Restaurants",
                    },
                },
            },
            plugins: {
                legend: {
                    display: true,
                    position: "right",
                },
            },
        },
    });
}