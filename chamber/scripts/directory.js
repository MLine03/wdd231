// Update footer dates
document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// Toggle view buttons
const gridBtn = document.getElementById('gridViewBtn');
const listBtn = document.getElementById('listViewBtn');
const membersSection = document.getElementById('members');

gridBtn.addEventListener('click', () => {
  membersSection.classList.add('grid-view');
  membersSection.classList.remove('list-view');
  gridBtn.setAttribute('aria-pressed', 'true');
  listBtn.setAttribute('aria-pressed', 'false');
});

listBtn.addEventListener('click', () => {
  membersSection.classList.add('list-view');
  membersSection.classList.remove('grid-view');
  listBtn.setAttribute('aria-pressed', 'true');
  gridBtn.setAttribute('aria-pressed', 'false');
});

// Fetch and display members
async function loadMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error('Failed to fetch members.json:', error);
  }
}

function displayMembers(members) {
  membersSection.innerHTML = '';  // clear
  members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('member-card');

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo"
           onerror="this.onerror=null; this.src='images/placeholder.png';" />
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
    `;
    membersSection.appendChild(card);
  });
}

loadMembers();
