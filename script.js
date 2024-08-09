const apiKey = '6899f1e99c8c165b4fcbb9b3b20f89e0'; // Replace with your OpenWeatherMap API key

let units = 'metric'; // Default unit

async function getWeather() {
    const city = document.getElementById('city').value;
    const loading = document.getElementById('loading');
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

    try {
        loading.style.display = 'block';
        const response = await fetch(url);
        loading.style.display = 'none';
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        console.log('Weather data:', data); // Log the data to the console
        displayWeather(data);
    } catch (error) {
        loading.style.display = 'none';
        alert(error.message);
    }
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    const temperatureUnit = units === 'metric' ? '°C' : '°F';
    const windspeedUnit = units === 'metric' ? 'm/s' : 'Mph';
    
    // Determine weather condition class and background color
    let weatherIcon = '';
    let backgroundColor = '';
    const weatherMain = data.weather[0].main.toLowerCase();
    switch (weatherMain) {
        case 'clear':
            weatherIcon = '<i class="fas fa-sun"></i>';
            backgroundColor = '#f7d02c'; // Warm yellow for sunny
            break;
        case 'clouds':
            weatherIcon = '<i class="fas fa-cloud"></i>';
            backgroundColor = '#b0bec5'; // Cloudy gray
            break;
        case 'rain':
            weatherIcon = '<i class="fas fa-cloud-rain"></i>';
            backgroundColor = '#90caf9'; // Sky blue for rainy
            break;
        case 'snow':
            weatherIcon = '<i class="fas fa-snowflake"></i>';
            backgroundColor = '#e0f7fa'; // Light blue for snowy
            break;
        case 'thunderstorm':
            weatherIcon = '<i class="fas fa-bolt"></i>';
            backgroundColor = '#4a148c'; // Dark purple for thunderstorms
            break;
        default:
            weatherIcon = '<i class="fas fa-sun"></i>';
            backgroundColor = '#f7d02c'; // Default to warm yellow
    }
    
    // Log the background color to ensure it is being set
    console.log('Background color:', backgroundColor);

    // Update background color
    document.body.style.backgroundColor = backgroundColor;

    weatherInfo.innerHTML = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp} ${temperatureUnit}</p>
        <p>Humidity: ${data.main.humidity} %</p>
        <p>Wind Speed: ${data.wind.speed} ${windspeedUnit} </p>
        <div class="weather-icon">${weatherIcon}</div>
        <p>${data.weather[0].description}</p>
    `;
}

function toggleUnits() {
    units = document.getElementById('unitToggle').checked ? 'imperial' : 'metric';
    getWeather();
}
