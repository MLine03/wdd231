const directory = document.getElementById('directory');
const gridViewBtn = document.getElementById('gridViewBtn');
const listViewBtn = document.getElementById('listViewBtn');

async function fetchMembers() {
  try {
    const response = await fetch('data/members.json');
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error('Error loading members:', error);
  }
}

function displayMembers(members) {
  directory.innerHTML = '';

  members.forEach(member => {
    const card = document.createElement('div');
    card.className = 'member-card';

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" />
      <h2>${member.name}</h2>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
      <p>${member.description}</p>
      <p><strong>Membership Level:</strong> ${member.membershipLevel}</p>
    `;

    directory.appendChild(card);
  });
}

function setGridView() {
  directory.classList.remove('list');
  directory.classList.add('grid');
  gridViewBtn.setAttribute('aria-pressed', 'true');
  listViewBtn.setAttribute('aria-pressed', 'false');
}

function setListView() {
  directory.classList.remove('grid');
  directory.classList.add('list');
  gridViewBtn.setAttribute('aria-pressed', 'false');
  listViewBtn.setAttribute('aria-pressed', 'true');
}

gridViewBtn.addEventListener('click', () => {
  setGridView();
});

listViewBtn.addEventListener('click', () => {
  setListView();
});

// Display last modified date and current year
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;
document.getElementById('year').textContent = new Date().getFullYear();

fetchMembers();
setGridView(); // default view
