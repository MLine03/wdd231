// Use ES Modules
export async function fetchPlaces() {
  try {
    const response = await fetch('data/places.json');
    if (!response.ok) throw new Error('Failed to fetch places');
    const places = await response.json();
    return places;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function createCard(place) {
  const card = document.createElement('article');
  card.classList.add('card');
  card.setAttribute('id', place.id);

  card.innerHTML = `
    <h2>${place.name}</h2>
    <figure>
      <img src="${place.image}" alt="${place.name}" loading="lazy" />
    </figure>
    <address>${place.address}</address>
    <p>${place.description}</p>
    <button aria-label="Learn more about ${place.name}">Learn More</button>
  `;

  return card;
}

function showVisitMessage() {
  const visitMessage = document.getElementById('visit-message');
  const now = Date.now();
  const lastVisit = localStorage.getItem('lastVisit');

  if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const diffDays = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    if (diffDays < 1) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else if (diffDays === 1) {
      visitMessage.textContent = "You last visited 1 day ago.";
    } else {
      visitMessage.textContent = `You last visited ${diffDays} days ago.`;
    }
  }

  localStorage.setItem('lastVisit', now);
}

// Initialize page
async function init() {
  showVisitMessage();

  const places = await fetchPlaces();
  const container = document.getElementById('cards-container');

  if (places.length === 0) {
    container.textContent = "Failed to load places. Please try again later.";
    return;
  }

  places.forEach(place => {
    const card = createCard(place);
    container.appendChild(card);
  });
}

init();
