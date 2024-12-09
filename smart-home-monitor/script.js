let temperatureChart, humidityChart;

// Function to initialize or update the temperature chart
function updateTemperatureChart(dataPoints) {
    const ctx = document.getElementById('temperatureChart').getContext('2d');
    if (!temperatureChart) {
        temperatureChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array.from({ length: dataPoints.length }, (_, i) => `Point ${i + 1}`),
                datasets: [{
                    label: 'Temperature (°C)',
                    data: dataPoints,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: true,
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: { title: { display: true, text: 'Data Points' } },
                    y: { title: { display: true, text: 'Temperature (°C)' } }
                }
            }
        });
    } else {
        temperatureChart.data.labels = Array.from({ length: dataPoints.length }, (_, i) => `Point ${i + 1}`);
        temperatureChart.data.datasets[0].data = dataPoints;
        temperatureChart.update();
    }
}

// Function to initialize or update the humidity chart
function updateHumidityChart(dataPoints) {
    const ctx = document.getElementById('humidityChart').getContext('2d');
    if (!humidityChart) {
        humidityChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array.from({ length: dataPoints.length }, (_, i) => `Point ${i + 1}`),
                datasets: [{
                    label: 'Humidity (%)',
                    data: dataPoints,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    fill: true,
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: { title: { display: true, text: 'Data Points' } },
                    y: { title: { display: true, text: 'Humidity (%)' } }
                }
            }
        });
    } else {
        humidityChart.data.labels = Array.from({ length: dataPoints.length }, (_, i) => `Point ${i + 1}`);
        humidityChart.data.datasets[0].data = dataPoints;
        humidityChart.update();
    }
}

// Function to fetch data and update status
function fetchDataFromThingSpeak() {
    const alertDiv = document.getElementById('alert');
    const url = 'https://api.thingspeak.com/channels/2779148/feeds.json?api_key=AHW40GI9NYR1ZPKJ&results=10';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const temperatureData = data.feeds.map(feed => parseFloat(feed.field1));
            const humidityData = data.feeds.map(feed => parseFloat(feed.field2));

            // Display the latest values
            document.getElementById('temperature').textContent = temperatureData[temperatureData.length - 1] || '--';
            document.getElementById('humidity').textContent = humidityData[humidityData.length - 1] || '--';

            // Update the status dynamically
            if (temperatureData[temperatureData.length - 1] > 30 || humidityData[humidityData.length - 1] > 70) {
                alertDiv.textContent = 'Status: Alert - Check Temperature or Humidity!';
                alertDiv.style.backgroundColor = 'red';
            } else {
                alertDiv.textContent = 'Status: Normal';
                alertDiv.style.backgroundColor = 'green';
            }

            // Update the charts
            updateTemperatureChart(temperatureData);
            updateHumidityChart(humidityData);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alertDiv.textContent = 'Status: Error Fetching Data';
            alertDiv.style.backgroundColor = 'gray';
        });
}

// Refresh button event
document.getElementById('refresh').addEventListener('click', fetchDataFromThingSpeak);

// Initial fetch
fetchDataFromThingSpeak();
