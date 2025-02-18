const apiKey = 'YOUR_API_KEY'; // Replace this with your OpenWeatherMap API key

// Proxy URL to bypass CORS issues
const proxyURL = 'https://api.allorigins.win/raw?url=';

async function getWeather() {
    const location = document.getElementById('location').value;
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = 'Loading...'; // Show a loading message

    if (!location) {
        alert('Please enter a city name');
        return;
    }

    try {
        const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
        const response = await fetch(proxyURL + encodeURIComponent(apiURL));
        const data = await response.json();

        if (data.cod === '404') {
            weatherInfo.innerHTML = 'City not found. Please try again.';
        } else {
            const { main, weather, wind } = data;
            const weatherHTML = `
                <h2>${location}</h2>
                <p><strong>Temperature:</strong> ${main.temp}°C</p>
                <p><strong>Weather:</strong> ${weather[0].description}</p>
                <p><strong>Humidity:</strong> ${main.humidity}%</p>
                <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
                <img src="https://openweathermap.org/img/wn/${weather[0].icon}.png" alt="weather-icon">
            `;
            weatherInfo.innerHTML = weatherHTML;
        }
    } catch (error) {
        weatherInfo.innerHTML = 'Error fetching data. Please try again later.';
        console.error(error);
    }
}
