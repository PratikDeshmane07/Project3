// Function to fetch data from your Flask API
function fetchData() {
    return fetch("http://127.0.0.1:5000/api/v1.0/kayak_restaurants_data")
      .then(response => response.json());
  }
  
  // Function to create Radar Chart
  async function createRadarChart() {
    const data = await fetchData();
  
    // Extract unique localities and dining styles
    const uniqueLocalities = [...new Set(data.map(item => item.locality))];
    const uniqueDiningStyles = [...new Set(data.map(item => item.dining_style))];
  
    // Initialize an array to store sums for each pairing
    const sums = [];
  
    // Calculate sums for each pairing of dining style and locality
    uniqueDiningStyles.forEach(diningStyle => {
      const sumObj = { diningStyle };
      uniqueLocalities.forEach(locality => {
        const sum = data.filter(item => item.locality === locality && item.dining_style === diningStyle).length;
        sumObj[locality] = sum;
      });
      sums.push(sumObj);
    });
  
    // Prepare data for the Radar Chart
    const radarData = {
      labels: uniqueLocalities,
      datasets: uniqueDiningStyles.map(diningStyle => ({
        label: diningStyle,
        data: uniqueLocalities.map(locality => {
          const sumObj = sums.find(item => item.diningStyle === diningStyle);
          return sumObj[locality] || 0;
        }),
        borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Random border color
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
      })),
    };
  
    // Radar Chart configuration
    const config = {
      type: 'radar',
      data: radarData,
      options: {aspectRatio:2.5},
    };
  
    // Create the Radar Chart
    const ctx = document.getElementById('radarChart').getContext('2d');
    new Chart(ctx, config);
  }
  
  // Call the function to create the Radar Chart
  createRadarChart();
  