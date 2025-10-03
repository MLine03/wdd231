async function loadPOIs() {
  const response = await fetch('../data/points-of-interest.json');
  const data = await response.json();
  const container = document.getElementById('poi-cards');

  data.forEach((item, index) => {
    const card = document.createElement('div');
    card.classList.add('card', `card${index + 1}`);

    card.innerHTML = `
      <h2>${item.title}</h2>
      <figure>
        <img src="../${item.image}" alt="${item.title}">
      </figure>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <button>Learn More</button>
    `;

    container.appendChild(card);
  });
}

function displayVisitMessage() {
  const container = document.getElementById('visit-message');
  const now = Date.now();
  const lastVisit = localStorage.getItem('lastVisit');

  let message = "";

  if (!lastVisit) {
    message = "Welcome! Let us know if you have any questions.";
  } else {
    const diffInMs = now - parseInt(lastVisit);
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      message = "Back so soon! Awesome!";
    } else {
      message = `You last visited ${diffInDays} day${diffInDays === 1 ? '' : 's'} ago.`;
    }
  }

  container.textContent = message;
  localStorage.setItem('lastVisit', now);
}

displayVisitMessage();
loadPOIs();
