// API endpoint for Node-RED (replace with your actual endpoint)
const apiUrl = 'http://localhost:1880/data';  // Replace with your Node-RED URL if different

// DOM elements to display data
const temperatureElem = document.getElementById('temperature');
const humidityElem = document.getElementById('humidity');
const alertElem = document.getElementById('alert');
const refreshButton = document.getElementById('refresh');

// Define the threshold values for temperature and humidity
const temperatureThreshold = 30; // Temperature threshold in °C
const humidityThreshold = 70; // Humidity threshold in %

function fetchData() {
    fetch(apiUrl)
        .then(response => response.json()) // Parse JSON response
        .then(data => {
            const { temperature, humidity, alert } = data;

            // Update the temperature and humidity tables
            temperatureElem.innerHTML = `${temperature}°C`;
            humidityElem.innerHTML = `${humidity}%`;

            // Check if temperature exceeds the threshold
            if (temperature > temperatureThreshold) {
                alertElem.innerHTML = `Temperature Alert: ${temperature}°C exceeds the threshold of ${temperatureThreshold}°C!`;
                alertElem.style.backgroundColor = 'rgba(255, 0, 0, 0.7)'; // Red background for temperature alert
                alertElem.style.display = 'block';
            }
            // Check if humidity exceeds the threshold
            else if (humidity > humidityThreshold) {
                alertElem.innerHTML = `Humidity Alert: ${humidity}% exceeds the threshold of ${humidityThreshold}%!`;
                alertElem.style.backgroundColor = 'rgba(255, 165, 0, 0.7)'; // Orange background for humidity alert
                alertElem.style.display = 'block';
            }
            // If neither exceeds threshold, hide the alert
            else {
                alertElem.style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Initial fetch when the page loads
fetchData();

// Event listener for the "Refresh Data" button
refreshButton.addEventListener('click', fetchData);

