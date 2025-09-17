const membersSection = document.getElementById('members');
const gridViewBtn = document.getElementById('gridViewBtn');
const listViewBtn = document.getElementById('listViewBtn');

// Fetch members data
async function fetchMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error('Network response was not ok');
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    membersSection.innerHTML = '<p>Failed to load member data.</p>';
    console.error(error);
  }
}

function displayMembers(members) {
  membersSection.innerHTML = ''; // clear contents

  members.forEach(member => {
    const card = document.createElement('div');
    card.className = 'member-card';

    card.innerHTML = `
      <img src="images/${member.image}" alt="Logo of ${member.name}">
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

// View toggles
gridViewBtn.addEventListener('click', () => {
  membersSection.classList.add('grid-view');
  membersSection.classList.remove('list-view');
  gridViewBtn.setAttribute('aria-pressed', 'true');
  listViewBtn.setAttribute('aria-pressed', 'false');
});

listViewBtn.addEventListener('click', () => {
  membersSection.classList.add('list-view');
  membersSection.classList.remove('grid-view');
  listViewBtn.setAttribute('aria-pressed', 'true');
  gridViewBtn.setAttribute('aria-pressed', 'false');
});

// Footer dynamic date
document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

fetchMembers();
