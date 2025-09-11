const membersContainer = document.getElementById('membersContainer');
const gridViewBtn = document.getElementById('gridViewBtn');
const listViewBtn = document.getElementById('listViewBtn');

async function fetchMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error('Network response was not ok');
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    membersContainer.textContent = 'Failed to load member data.';
    console.error('Fetch error:', error);
  }
}

function displayMembers(members) {
  membersContainer.innerHTML = ''; // clear previous
  members.forEach(member => {
    const card = document.createElement('div');
    card.className = 'member-card';

    card.innerHTML = `
      <img src="${member.logo}" alt="Logo of ${member.name}" loading="lazy" />
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>Phone: ${member.phone}</p>
      <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
    `;

    membersContainer.appendChild(card);
  });
}

function setGridView() {
  membersContainer.classList.add('grid-view');
  membersContainer.classList.remove('list-view');
  gridViewBtn.setAttribute('aria-pressed', 'true');
  listViewBtn.setAttribute('aria-pressed', 'false');
}

function setListView() {
  membersContainer.classList.add('list-view');
  membersContainer.classList.remove('grid-view');
  listViewBtn.setAttribute('aria-pressed', 'true');
  gridViewBtn.setAttribute('aria-pressed', 'false');
}

gridViewBtn.addEventListener('click', () => {
  setGridView();
});

listViewBtn.addEventListener('click', () => {
  setListView();
});

// Set default view and load data
setGridView();
fetchMembers();

// Footer dynamic date info
document.getElementById('copyrightYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;
