// Fetch members data and display
async function fetchMembers() {
    try {
      const response = await fetch('data/members.json');
      if (!response.ok) throw new Error('Network response not ok');
      const members = await response.json();
      displayMembers(members);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }
  
  function displayMembers(members) {
    const container = document.getElementById('members');
    container.innerHTML = ''; // clear
  
    members.forEach(member => {
      const card = document.createElement('section');
      card.className = 'member-card';
  
      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" />
        <h2>${member.name}</h2>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> <a href="tel:${member.phone}">${member.phone}</a></p>
        <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
        <p><strong>Membership Level:</strong> ${membershipLevel(member.membershipLevel)}</p>
      `;
  
      container.appendChild(card);
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
  
  // Toggle between grid and list views
  const gridBtn = document.getElementById('grid-view-btn');
  const listBtn = document.getElementById('list-view-btn');
  const membersContainer = document.getElementById('members');
  
  gridBtn.addEventListener('click', () => {
    membersContainer.classList.add('grid-view');
    membersContainer.classList.remove('list-view');
    gridBtn.setAttribute('aria-pressed', 'true');
    listBtn.setAttribute('aria-pressed', 'false');
  });
  
  listBtn.addEventListener('click', () => {
    membersContainer.classList.add('list-view');
    membersContainer.classList.remove('grid-view');
    gridBtn.setAttribute('aria-pressed', 'false');
    listBtn.setAttribute('aria-pressed', 'true');
  });
  
  // Display copyright year and last modified date
  document.getElementById('copyright-year').textContent =
    new Date().getFullYear();
  
  document.getElementById('last-modified').textContent =
    new Date(document.lastModified).toLocaleDateString();
  
  // Initialize
  fetchMembers();
  