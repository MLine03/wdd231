// Footer Info
document.getElementById("currentYear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Toggle View Buttons
const gridBtn = document.getElementById("gridViewBtn");
const listBtn = document.getElementById("listViewBtn");
const memberSection = document.getElementById("members");

gridBtn.addEventListener("click", () => {
  memberSection.classList.add("grid-view");
  memberSection.classList.remove("list-view");
  gridBtn.setAttribute("aria-pressed", "true");
  listBtn.setAttribute("aria-pressed", "false");
});

listBtn.addEventListener("click", () => {
  memberSection.classList.add("list-view");
  memberSection.classList.remove("grid-view");
  listBtn.setAttribute("aria-pressed", "true");
  gridBtn.setAttribute("aria-pressed", "false");
});

// Fetch and Display Members
async function getMembers() {
  try {
    const response = await fetch("../data/members.json");
    if (!response.ok) throw new Error("Network response was not ok");
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error("Error loading members:", error);
  }
}

function displayMembers(members) {
  members.forEach(member => {
    const card = document.createElement("section");
    card.classList.add("member-card");

    card.innerHTML = `
      <img src="../images/${member.image}" alt="${member.name} logo">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
    `;

    memberSection.appendChild(card);
  });
}

getMembers();
