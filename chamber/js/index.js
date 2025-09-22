// Show current year and last modified date
document.getElementById("currentYear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// OpenWeatherMap API - replace with your own API key
const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";
const cityId = "5604473"; // Sampletown city ID (e.g., Rexburg ID for testing)

// Fetch and display weather data
async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&units=imperial&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    document.getElementById("weather-container").textContent = "Weather data currently unavailable.";
  }
}

function displayWeather(data) {
  if (!data || !data.list) return;

  const container = document.getElementById("weather-container");
  container.innerHTML = "";

  // Current weather - first entry
  const current = data.list[0];
  const currentTemp = current.main.temp.toFixed(0);
  const currentDesc = current.weather[0].description;

  const currentDiv = document.createElement("div");
  currentDiv.className = "current-weather";
  currentDiv.innerHTML = `
    <p>Temperature: ${currentTemp}°F</p>
    <p>Conditions: ${capitalizeFirstLetter(currentDesc)}</p>
  `;

  container.appendChild(currentDiv);

  // 3-day forecast - next days at approx same time (skip every 8 entries, since data is 3-hrly)
  const forecastDiv = document.createElement("div");
  forecastDiv.className = "forecast";

  forecastDiv.innerHTML = "<h3>3-Day Forecast</h3>";

  // Find next 3 days forecast by getting data every 8 indices (24 hours)
  for (let i = 8; i <= 24; i += 8) {
    const dayData = data.list[i];
    const date = new Date(dayData.dt_txt);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    const temp = dayData.main.temp.toFixed(0);
    const desc = dayData.weather[0].description;

    forecastDiv.innerHTML += `
      <div class="forecast-day">
        <h4>${dayName}</h4>
        <p>${temp}°F</p>
        <p>${capitalizeFirstLetter(desc)}</p>
      </div>
    `;
  }

  container.appendChild(forecastDiv);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

window.onload = getWeather;

// Member Spotlights (gold/silver randomly selected)
async function loadSpotlights() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json();

    // Filter gold(3) or silver(2) members
    const spotlightMembers = members.filter(m => m.membershipLevel === 3 || m.membershipLevel === 2);

    // Randomly shuffle and pick up to 3
    const shuffled = spotlightMembers.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    const spotlightContainer = document.getElementById("spotlights");
    spotlightContainer.innerHTML = "";

    selected.forEach(member => {
      const card = document.createElement("section");
      card.className = "spotlight-card";

      card.innerHTML = `
        <img src="${member.image}" alt="Logo of ${member.name}" loading="lazy" />
        <h3>${member.name}</h3>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
        <p><strong>Membership Level:</strong> ${membershipLevelText(member.membershipLevel)}</p>
      `;

      spotlightContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Failed to load spotlights:", error);
  }
}

function membershipLevelText(level) {
  switch (level) {
    case 3: return "Gold";
    case 2: return "Silver";
    case 1: return "Bronze";
    default: return "Member";
  }
}

window.onload = () => {
  getWeather();
  loadSpotlights();

  document.getElementById("currentYear").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = document.lastModified;
};
