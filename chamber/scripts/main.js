const membersSection = document.getElementById('members');
const gridViewBtn = document.getElementById('gridViewBtn');
const listViewBtn = document.getElementById('listViewBtn');

async function getMembers() {
  try {
    const response = await fetch('data/members.json');
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    membersSection.innerHTML = '<p>Error loading members.</p>';
    console.error(error);
  }
}

function displayMembers(members) {
  membersSection.innerHTML = ''; // Clear previous content

  members.forEach(member => {
    const card = document.createElement('article');
    card.className = 'member-card';

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" />
      <h2>${member.name}</h2>
      <p>${member.description}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> <a href="tel:${member.phone.replace(/\D/g, '')}">${member.phone}</a></p>
      <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
      <p><strong>Membership Level:</strong> ${membershipLevel(member.membership)}</p>
    `;

    membersSection.appendChild(card);
  });
}

function membershipLevel(level) {
  switch(level) {
    case 3: return 'Gold';
    case 2: return 'Silver';
    default: return 'Member';
  }
}

// Layout toggle handlers
gridViewBtn.addEventListener('click', () => {
  membersSection.classList.add('grid-view');
  membersSection.classList.remove('list-view');
});

listViewBtn.addEventListener('click', () => {
  membersSection.classList.add('list-view');
  membersSection.classList.remove('grid-view');
});

// Footer date scripts
document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = new Date(document.lastModified).toLocaleDateString();

// Load members on page load
getMembers();
