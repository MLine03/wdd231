const membersSection = document.getElementById('members');
const gridBtn = document.getElementById('gridViewBtn');
const listBtn = document.getElementById('listViewBtn');

// Fetch members.json and display 2-3 random Gold/Silver members as spotlight cards
async function fetchMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error('Failed to load members data');
    const members = await response.json();

    // Filter for gold and silver members
    const spotlightMembers = members.filter(m => m.membership.toLowerCase() === 'gold' || m.membership.toLowerCase() === 'silver');

    // Randomly select 3 members or fewer if less than 3 available
    const selectedMembers = getRandomSubset(spotlightMembers, 3);

    displayMembers(selectedMembers);
  } catch (error) {
    console.error(error);
    membersSection.textContent = 'Sorry, unable to load members at this time.';
  }
}

// Helper function to pick random subset of members
function getRandomSubset(arr, n) {
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

// Display members in cards or list format based on view
function displayMembers(members) {
  membersSection.innerHTML = '';

  members.forEach(member => {
    const card = document.createElement('article');
    card.classList.add('member-card');

    card.innerHTML = `
      <img src="images/${member.logo}" alt="${member.name} logo" loading="lazy" />
      <div class="member-info">
        <h3>${member.name}</h3>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> <a href="tel:${member.phone.replace(/[^0-9]/g, '')}">${member.phone}</a></p>
        <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
        <p><strong>Membership Level:</strong> ${member.membership}</p>
      </div>
    `;

    membersSection.appendChild(card);
  });
}

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

gridBtn.addEventListener('click', () => {
  setGridView();
});

listBtn.addEventListener('click', () => {
  setListView();
});

// Set current year and last modified date in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// Initialize page
fetchMembers();
setGridView();
