// Display current year
document.getElementById("year").textContent = new Date().getFullYear();

// Display last modified
document.getElementById("lastModified").textContent = document.lastModified;

// Toggle between grid and list view
const membersContainer = document.getElementById('members');

document.getElementById('grid-view').addEventListener('click', () => {
  membersContainer.classList.add('grid-view');
  membersContainer.classList.remove('list-view');
});

document.getElementById('list-view').addEventListener('click', () => {
  membersContainer.classList.add('list-view');
  membersContainer.classList.remove('grid-view');
});

// Fetch and display members
async function fetchMembers() {
  try {
    const response = await fetch('data/members.json');
    const data = await response.json();
    displayMembers(data);
  } catch (error) {
    console.error("Error loading members:", error);
  }
}

function displayMembers(members) {
  membersContainer.innerHTML = '';
  members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p>Membership Level: ${['', 'Member', 'Silver', 'Gold'][member.membership]}</p>
    `;
    membersContainer.appendChild(card);
  });
}

fetchMembers();
