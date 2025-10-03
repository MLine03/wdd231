async function loadPOIs() {
  try {
    const response = await fetch('../data/points-of-interest.json');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const container = document.getElementById('poi-cards');

    data.forEach((item, index) => {
      const card = document.createElement('div');
      card.classList.add('card', `card${index + 1}`);

      card.innerHTML = `
        <h2>${item.title}</h2>
        <figure>
          <img src="../${item.image}" alt="${item.title} image" loading="lazy" />
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button type="button" aria-label="Learn more about ${item.title}">Learn More</button>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error('Failed to load points of interest:', error);
  }
}

function displayVisitMessage() {
  const container = document.getElementById('visit-message');
  const now = Date.now();
  const lastVisit = localStorage.getItem('lastVisit');

  let message = "";

  if (!lastVisit) {
    message = "Welcome! Let us know if you have any questions.";
  } else {
    const diffInMs = now - parseInt(lastVisit, 10);
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      message = "Back so soon! Awesome!";
    } else {
      message = `You last visited ${diffInDays} day${diffInDays === 1 ? '' : 's'} ago.`;
    }
  }

  container.textContent = message;
  localStorage.setItem('lastVisit', now.toString());
}

displayVisitMessage();
loadPOIs();
