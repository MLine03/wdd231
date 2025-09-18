// Footer year and last modified
document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// OpenWeatherMap API setup
const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
const cityId = 'YOUR_CITY_ID'; // Replace with your city ID

async function getWeather() {
  const currentWeatherElem = document.getElementById('weather-current');
  const forecastElem = document.getElementById('weather-forecast');

  try {
    // Current weather
    const currentRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=imperial&appid=${apiKey}`
    );
    const currentData = await currentRes.json();

    currentWeatherElem.innerHTML = `
      <p>Temperature: ${Math.round(currentData.main.temp)}°F</p>
      <p>Conditions: ${currentData.weather[0].description}</p>
    `;

    // 3-day forecast
    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&units=imperial&appid=${apiKey}`
    );
    const forecastData = await forecastRes.json();

    // Extract daily temps (every 8th entry for 3-hour increments = 24h)
    let forecastHtml = '<h3>3-Day Forecast</h3><ul>';
    for (let i = 0; i < 3; i++) {
      const day = forecastData.list[i * 8];
      const date = new Date(day.dt * 1000).toLocaleDateString(undefined, { weekday: 'short' });
      forecastHtml += `<li>${date}: ${Math.round(day.main.temp)}°F</li>`;
    }
    forecastHtml += '</ul>';
    forecastElem.innerHTML = forecastHtml;
  } catch (error) {
    currentWeatherElem.textContent = 'Weather data unavailable';
    forecastElem.textContent = '';
    console.error('Weather fetch error:', error);
  }
}

// Load spotlight members from JSON and show 2-3 gold/silver randomly
async function loadSpotlights() {
  const spotlightContainer = document.getElementById('spotlight-cards');

  try {
    const response = await fetch('data/members.json');
    const members = await response.json();

    // Filter silver or gold members (level 2 or 3)
    const premiumMembers = members.filter(m => m.membershipLevel >= 2);

    // Shuffle and pick 2-3 random
    const shuffled = premiumMembers.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    spotlightContainer.innerHTML = '';

    selected.forEach(member => {
      const card = document.createElement('div');
      card.className = 'spotlight-card';

      card.innerHTML = `
        <img src="images/${member.image}" alt="Logo of ${member.name}" />
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>Phone: <a href="tel:${member.phone}">${member.phone}</a></p>
        <p>Website: <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
        <p>Membership Level: ${member.membershipLevel === 3 ? 'Gold' : 'Silver'}</p>
      `;
      spotlightContainer.appendChild(card);
    });
  } catch (error) {
    spotlightContainer.textContent = 'Unable to load member spotlights.';
    console.error('Spotlight fetch error:', error);
  }
}

// Initialize functions
getWeather();
loadSpotlights();
