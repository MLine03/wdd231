async function loadMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error('Network response was not ok');
    const members = await response.json();

    const membersSection = document.getElementById('members');
    membersSection.innerHTML = '';

    members.forEach(member => {
      const card = document.createElement('article');
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
  } catch (error) {
    console.error('Failed to load members:', error);
  }
}
