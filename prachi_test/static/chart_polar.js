// Fetch 'Price Per Person' data from your Flask API
fetch("http://127.0.0.1:5000/api/v1.0/kayak_restaurants_data")
  .then(response => response.json())
  .then(data => {
    // Extract 'Price Per Person' values from the data
    const pricePerPersonData = data.map(restaurant => restaurant.price_per_person);

    // Calculate the distribution of 'Price Per Person' values
    const priceDistribution = calculatePriceDistribution(pricePerPersonData);

    // Create the polar area chart
    const ctx = document.getElementById('pieChart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels: ['$', '$$', '$$$'],
        datasets: [{
          data: priceDistribution,
          backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(255, 159, 64, 0.5)', 'rgba(75, 192, 192, 0.5)'],
        }],
      },
      options: {
        
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Polar Area Chart'
          }

        }
      },
    });
  })
  .catch(error => console.log("Error fetching data: ", error));

// Function to calculate the distribution of 'Price Per Person' values
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
