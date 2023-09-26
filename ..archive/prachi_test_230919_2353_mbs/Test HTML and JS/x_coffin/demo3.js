// Function to fetch data from your Flask API
function fetchData() {
  return fetch("http://127.0.0.1:5000/api/v1.0/kayak_restaurants_data")
    .then(response => response.json());
}

// Function to count cuisine occurrences
function countCuisineOccurrences(data) {
  const cuisineCounts = {};
  data.forEach(restaurant => {
    const cuisine = restaurant.cuisine;
    cuisineCounts[cuisine] = (cuisineCounts[cuisine] || 0) + 1;
  });
  return cuisineCounts;
}

// Function to create a Doughnut chart
function createDoughnutChart(cuisineCounts) {
  const ctx = document.getElementById("cuisineChart").getContext("2d");

  const labels = Object.keys(cuisineCounts);
  const dataValues = Object.values(cuisineCounts);

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
          ],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Restaurant Cuisine Distribution",
        },
      },
    },
  };

  const cuisineChart = new Chart(ctx, chartConfig);
}

// Fetch data, count cuisine occurrences, and create the Doughnut chart
fetchData()
  .then(data => {
    const cuisineCounts = countCuisineOccurrences(data);
    createDoughnutChart(cuisineCounts);
  })
  .catch(error => console.error("Error fetching data: ", error));
