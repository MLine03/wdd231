const membersSection = document.getElementById('members');
const gridBtn = document.getElementById('gridViewBtn');
const listBtn = document.getElementById('listViewBtn');

// Load members from JSON
async function loadMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error('Network response was not ok');

    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    membersSection.innerHTML = `<p>Sorry, failed to load members data.</p>`;
    console.error('Fetch error:', error);
  }
}

// Render member cards
function displayMembers(members) {
  membersSection.innerHTML = '';

  members.forEach(member => {
    const card = document.createElement('article');
    card.classList.add('member-card');

    // Border color by membership level
    if (member.membership === 3) {
      card.style.borderColor = 'gold';
    } else if (member.membership === 2) {
      card.style.borderColor = 'silver';
    } else {
      card.style.borderColor = '#ccc';
    }

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" />
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>Phone: ${member.phone}</p>
      <p><a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a></p>
    `;

    membersSection.appendChild(card);
  });
}

// Toggle between grid and list views
function setGridView() {
  membersSection.classList.add('grid-view');
  membersSection.classList.remove('list-view');
  gridBtn.setAttribute('aria-pressed', 'true');
  listBtn.setAttribute('aria-pressed', 'false');
}

function setListView() {
  membersSection.classList.add('list-view');
  membersSection.classList.remove('grid-view');
  gridBtn.setAttribute('aria-pressed', 'false');
  listBtn.setAttribute('aria-pressed', 'true');
}

// Event listeners for toggle buttons
gridBtn.addEventListener('click', setGridView);
listBtn.addEventListener('click', setListView);

// Footer dates
document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// Initialize page
window.addEventListener('DOMContentLoaded', () => {
  loadMembers();
  setGridView(); // default view
});
