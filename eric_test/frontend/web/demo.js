const tileLayer = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=APIKEY', {});
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
const fetchData = async () => {
  try {
    const response = await fetch("http://127.0.0.1:5000/api/v1.0/kayak_restaurants_data");
    restaurantData = await response.json();
    populateFilters(restaurantData);
    addMarkers(restaurantData);
  } catch (error) {
    console.log("Error fetching data: ", error);
  }
};
fetchData();

function createMarker(restaurant) {
  return L.marker([restaurant.latitude, restaurant.longitude])
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
    `);
}


function populateFilters(data) {
  const filters = ['locality', 'cuisine', 'overall_rating', 'dining_style', 'price_per_person'];
  filters.forEach(filter => {
    const uniqueValues = new Set(data.map(item => item[filter]));
    const dropdown = document.getElementById(filter);

    let defaultOption = document.createElement("option");
    defaultOption.value = "All";
    defaultOption.text = "All";
    dropdown.add(defaultOption);

    uniqueValues.forEach(value => {
      let option = document.createElement("option");
      option.value = value;
      option.text = value;
      dropdown.add(option);
    });
  });
}

function addMarkers(data) {
  data.forEach(restaurant => {
    if (restaurant.latitude && restaurant.longitude) {
      createMarker(restaurant).addTo(mymap);
    }
  });
}

document.getElementById("apply-filters").addEventListener("click", function (event) {
  event.preventDefault();
  const selectedLocality = document.getElementById("locality").value;

  mymap.eachLayer(layer => {
    if (layer instanceof L.Marker) {
      mymap.removeLayer(layer);
    }
  });

  let filteredData;
  if (selectedLocality === "All") {
    filteredData = restaurantData;
  } else {
    filteredData = restaurantData.filter(restaurant => restaurant.locality === selectedLocality);
  }
  addMarkers(filteredData);
});
document.getElementById("toggle-dark-mode").addEventListener("click", function () {
  const currentTheme = document.documentElement.getAttribute("data-theme");

  if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "light");
    this.innerText = "Dark Mode";
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    this.innerText = "Light Mode";
  }
});

const customIcon = L.icon({
  iconUrl: 'custom-marker.png', // Replace with the path to your custom marker icon
  iconSize: [10, 10], // Width and height of the icon (in pixels)
  iconAnchor: [16, 32] // The point of the icon that corresponds to the marker's location
});


document.getElementById("toggle-dark-mode").addEventListener("click", function () {
  const currentTheme = document.documentElement.getAttribute("data-theme");

  if (currentTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "light");
    this.innerText = "Dark Mode";
    tileLayer.setUrl('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=APIKEY');
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    this.innerText = "Light Mode";
    tileLayer.setUrl('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=APIKEY');
  }
});

function addMarkers(data) {
  const restaurantList = document.getElementById("restaurant-list");
  restaurantList.innerHTML = ""; // Clear existing list items

  data.forEach(restaurant => {
    if (restaurant.latitude && restaurant.longitude) {
      // Add marker to map
      createMarker(restaurant).addTo(mymap);

      // Add list item to sidebar
      const listItem = document.createElement("li");
      listItem.textContent = restaurant.name;
      listItem.addEventListener("click", function () {
        // Do something when the list item is clicked, like opening the marker popup
      });
      restaurantList.appendChild(listItem);
    }
  });
}
