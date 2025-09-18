const membersSection = document.getElementById('members');

// Fetch members data and display
async function getMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const members = await response.json();

    displayMembers(members);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

function displayMembers(members) {
  membersSection.innerHTML = ''; // Clear existing content

  members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('member-card');

    card.innerHTML = `
      <h3>${member.name}</h3>
      <p>Phone: ${member.phone}</p>
      <p>Address: ${member.address}</p>
      <p>
        Website: <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Site</a>
      </p>
      <p>Membership Level: ${membershipLevelToString(member.membershipLevel)}</p>
    `;

    membersSection.appendChild(card);
  });
}

function membershipLevelToString(level) {
  switch (level) {
    case 3:
      return 'Gold';
    case 2:
      return 'Silver';
    case 1:
      return 'Member';
    default:
      return 'Member';
  }
}

// Initialize current year and last modified date
document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// Call the function to fetch and display members
getMembers();
