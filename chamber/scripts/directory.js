// Fetch attraction data and render cards
document.addEventListener('DOMContentLoaded', () => {
  fetch('data/attractions.json')
    .then(response => response.json())
    .then(data => renderAttractions(data))
    .catch(err => console.error('Failed to load attractions:', err));
});

function renderAttractions(attractions) {
  const container = document.getElementById('attractions');

  attractions.forEach(item => {
    const card = document.createElement('article');
    card.classList.add('attraction-card');

    const title = document.createElement('h2');
    title.textContent = item.title;

    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.title + " photo";
    img.width = 300;   // specify real image width
    img.height = 200;  // specify real image height
    img.setAttribute('fetchpriority', 'high'); // prioritize image loading
    figure.appendChild(img);

    const addr = document.createElement('address');
    addr.textContent = item.address;

    const desc = document.createElement('p');
    desc.textContent = item.description;

    const btn = document.createElement('button');
    btn.textContent = "Learn More";
    btn.addEventListener('click', () => alert(`Learn more about ${item.title}`));

    card.appendChild(title);
    card.appendChild(figure);
    card.appendChild(addr);
    card.appendChild(desc);
    card.appendChild(btn);

    container.appendChild(card);
  });
}
