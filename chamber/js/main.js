const membersContainer = document.getElementById('members-container');
const gridBtn = document.getElementById('grid');
const listBtn = document.getElementById('list');

async function getMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error('Network response was not ok');
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    membersContainer.innerHTML = `<p>Failed to load members: ${error.message}</p>`;
  }
}

function displayMembers(members) {
  membersContainer.innerHTML = ''; // clear existing

  members.forEach(member => {
    const card = document.createElement('article');
    card.className = 'member-card';

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" />
      <h2>${member.name}</h2>
      <p>${member.address}</p>
      <p>Phone: <a href="tel:${member.phone}">${member.phone}</a></p>
      <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
      <p>Membership Level: ${membershipLevel(member.membershipLevel)}</p>
    `;

    membersContainer.appendChild(card);
  });
}

function membershipLevel(level) {
  switch(level) {
    case 1: return 'Member';
    case 2: return 'Silver';
    case 3: return 'Gold';
    default: return 'Member';
  }
}

// Toggle grid/list view
gridBtn.addEventListener('click', () => {
  membersContainer.classList.add('grid');
  membersContainer.classList.remove('list');
});

listBtn.addEventListener('click', () => {
  membersContainer.classList.add('list');
  membersContainer.classList.remove('grid');
});

// Footer dynamic year and last modified date
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// Initial load
getMembers();
