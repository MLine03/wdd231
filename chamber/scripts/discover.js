// Update footer with date
document.getElementById("currentYear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Visit message
const visitMessage = document.getElementById("visitMessage");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
  visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const diffTime = now - lastVisit;
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  visitMessage.textContent =
    days < 1
      ? "Back so soon! Awesome!"
      : `You last visited ${days} ${days === 1 ? "day" : "days"} ago.`;
}
localStorage.setItem("lastVisit", now);

// Load attraction cards
fetch("data/attractions.json")
  .then((res) => res.json())
  .then((data) => {
    const grid = document.getElementById("cardGrid");
    data.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "card";
      card.style.gridArea = `card${index + 1}`;
      card.innerHTML = `
        <h2>${item.name}</h2>
        <figure><img src="${item.image}" alt="${item.name}" /></figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button>Learn More</button>
      `;
      grid.appendChild(card);
    });
  });
