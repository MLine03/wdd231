// scripts/home.js

// Display current year and last modified date in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// OpenWeatherMap API info (replace with your own API key)
const apiKey = 'YOUR_API_KEY';  // <-- Replace with your OpenWeatherMap API key
const city = 'Sampletown';      // Replace with your actual city
const units = 'imperial';       // Use 'metric' for Celsius, 'imperial' for Fahrenheit
const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;

// Fetch and display weather data
async function displayWeather() {
  try {
    const response = await fetch(weatherURL);
    if (!response.ok) throw new Error('Weather data not available');

    const data = await response.json();

    // Current weather (first list item)
    const current = data.list[0];
    const temp = Math.round(current.main.temp);
    const desc = current.weather[0].description;
    
    // Build weather HTML
    let weatherHTML = `
      <p><strong>Current Temp:</strong> ${temp}°${units === 'imperial' ? 'F' : 'C'}</p>
      <p><strong>Conditions:</strong> ${desc}</p>
      <h3>3-Day Forecast</h3>
      <ul>
    `;

    // Forecast - next 3 days (assuming 3-hour intervals, so roughly every 8 items)
    for (let i = 8; i <= 24; i += 8) {
      const forecast = data.list[i];
      const date = new Date(forecast.dt_txt).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
      const forecastTemp = Math.round(forecast.main.temp);
      const forecastDesc = forecast.weather[0].description;

      weatherHTML += `
        <li>
          <strong>${date}:</strong> ${forecastTemp}°${units === 'imperial' ? 'F' : 'C'} - ${forecastDesc}
        </li>
      `;
    }
    weatherHTML += '</ul>';

    document.getElementById('weather-container').innerHTML = weatherHTML;

  } catch (error) {
    document.getElementById('weather-container').textContent = 'Unable to load weather data.';
    console.error(error);
  }
}

// Fetch and display spotlight members
async function displaySpotlights() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error('Member data not available');

    const members = await response.json();

    // Filter gold or silver members
    const eligible = members.filter(member => ['Gold', 'Silver'].includes(member.membershipLevel));

    // Shuffle and pick 3 or less randomly
    const shuffled = eligible.sort(() => 0.5 - Math.random());
    const spotlightMembers = shuffled.slice(0, 3);

    let spotlightHTML = '';
    spotlightMembers.forEach(member => {
      spotlightHTML += `
        <article class="spotlight-card">
          <h3>${member.companyName}</h3>
          <img src="images/${member.logo}" alt="Logo of ${member.companyName}">
          <p><strong>Phone:</strong> ${member.phone}</p>
          <p><strong>Address:</strong> ${member.address}</p>
          <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
          <p><strong>Membership Level:</strong> ${member.membershipLevel}</p>
        </article>
      `;
    });

    document.getElementById('spotlight-container').innerHTML = spotlightHTML;

  } catch (error) {
    document.getElementById('spotlight-container').textContent = 'Unable to load member spotlights.';
    console.error(error);
  }
}

// Initialize page scripts
window.addEventListener('DOMContentLoaded', () => {
  displayWeather();
  displaySpotlights();
});
