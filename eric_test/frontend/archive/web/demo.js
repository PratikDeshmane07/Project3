const tileLayer = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZXJpY2ZheWh1eW5oIiwiYSI6ImNsbXBzYmJteTBoNXoybG51bnlwaXNxaDQifQ.fQ6iaJMaFDwYlxWRMvuFBA', {});
const mymap = L.map('map', {
  center: [40.7128, -74.0060],
  zoom: 13,
  maxBounds: [[40.4774, -74.2591], [40.9176, -73.7004]],
  maxZoom: 18,
  minZoom: 10,
  zoomDelta: 0.5,
  wheelPxPerZoomLevel: 5
}).fitBounds([[40.4774, -74.2591], [40.9176, -73.7004]]).addLayer(tileLayer);

let restaurantData = [];


const populateFilters = (data) => {
  const cuisines = [...new Set(data.map(item => item.cuisine))];
  console.log("Unique Cuisines:", cuisines);
};

const addMarkers = (data) => {
  data.forEach(restaurant => {
    L.marker([restaurant.latitude, restaurant.longitude]).addTo(mymap)
      .bindPopup(`<b>${restaurant.name}</b><br>Cuisine: ${restaurant.cuisine}`)
      .openPopup();
  });
};

const fetchData = async () => {
  try {
    const response = await fetch("http://127.0.0.1:5000/api/v1.0/kayak_restaurants_data");
    restaurantData = await response.json();
    console.log("Sample Data:", restaurantData);
    populateFilters(restaurantData);
    addMarkers(restaurantData);
  } catch (error) {
    console.log("Error fetching data: ", error);
  }
};

fetchData();
