const apiKey = 'e75ccbde1a63c4fbd38cb80ae63d8043'; // Replace with your OpenWeatherMap API key

// Function to fetch weather data
async function getWeather() {
  const location = document.getElementById('location').value;
  if (location === '') {
    alert('Please enter a location');
    return;
  }

  const weatherInfoDiv = document.getElementById('weather-info');
  weatherInfoDiv.innerHTML = 'Loading...';

  try {
    // Fetch weather data from the API
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
    const data = await response.json();

    if (data.cod !== 200) {
      throw new Error(data.message);
    }

    // Display weather information
    weatherInfoDiv.innerHTML = `
      <div class="weather-detail"><strong>Location:</strong> ${data.name}, ${data.sys.country}</div>
      <div class="weather-detail"><strong>Temperature:</strong> ${data.main.temp}°C</div>
      <div class="weather-detail"><strong>Weather:</strong> ${data.weather[0].description}</div>
      <div class="weather-detail"><strong>Humidity:</strong> ${data.main.humidity}%</div>
      <div class="weather-detail"><strong>Wind Speed:</strong> ${data.wind.speed} m/s</div>
    `;
  } catch (error) {
    weatherInfoDiv.innerHTML = `<span style="color: red;">Error: ${error.message}</span>`;
  }
}
