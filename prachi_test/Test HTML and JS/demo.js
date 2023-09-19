// Initialize the map
var mymap = L.map('map').setView([40.7128, -74.0060], 13); // New York coordinates

// Add a tile layer to the map (Mapbox Streets tile layer)
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=API_KEY', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1
}).addTo(mymap);

// Fetch the data from your Flask API
fetch("http://127.0.0.1:5000/api/v1.0/kayak_restaurants_data")
  .then(response => response.json())
  .then(data => {
    // Loop through the data to add markers to the map
    data.forEach(restaurant => {
      L.marker([restaurant.latitude, restaurant.longitude])
        .bindPopup(`
          <h3>${restaurant.name}</h3>
          <p>Locality: ${restaurant.locality}</p>
          <p>Cuisine: ${restaurant.cuisine}</p>
          <p>Price Per Person: ${restaurant.price_per_person}</p>
          <p>Overall Rating: ${restaurant.overall_rating}</p>
          <p>Food: ${restaurant.food}</p>
          <p>Service: ${restaurant.service}</p>
          <p>Ambiance: ${restaurant.ambiance}</p>
          <p>Reviews: ${restaurant.reviews}</p>
          <p>Noise: ${restaurant.noise}</p>
          <p>Dining Style: ${restaurant.dining_style}</p>
        `)
        .addTo(mymap);
    });
  })
  .catch(error => console.log("Error fetching data: ", error));

fetch("http://127.0.0.1:5000/api/v1.0/kayak_restaurants_data")
  .then(response => response.json())
  .then(data => {
    console.log("Fetched Data:", data);
    // rest of your code
  })
  .catch(error => console.log("Error fetching data: ", error));


L.marker([40.7128, -74.0060]).addTo(mymap);
