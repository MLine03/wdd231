const membersUrl = "data/members.json";

const membersSection = document.getElementById("members");
const gridViewBtn = document.getElementById("gridViewBtn");
const listViewBtn = document.getElementById("listViewBtn");

// Fetch and display members
async function getMembers() {
  try {
    const response = await fetch(membersUrl);
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error("Failed to fetch members data:", error);
  }
}

function displayMembers(members) {
  membersSection.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("section");
    card.classList.add("member-card");

    card.innerHTML = `
      <img src="${member.image}" alt="Logo of ${member.name}" loading="lazy" />
      <h3>${member.name}</h3>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
      <p><strong>Membership Level:</strong> ${membershipLevelText(member.membershipLevel)}</p>
      <p>${member.description}</p>
    `;

    membersSection.appendChild(card);
  });
}

function membershipLevelText(level) {
  switch (level) {
    case 3:
      return "Gold";
    case 2:
      return "Silver";
    case 1:
      return "Bronze";
    default:
      return "Member";
  }
}

// View toggles
gridViewBtn.addEventListener("click", () => {
  membersSection.classList.add("grid-view");
  membersSection.classList.remove("list-view");
  gridViewBtn.setAttribute("aria-pressed", "true");
  listViewBtn.setAttribute("aria-pressed", "false");
});

listViewBtn.addEventListener("click", () => {
  membersSection.classList.add("list-view");
  membersSection.classList.remove("grid-view");
  gridViewBtn.setAttribute("aria-pressed", "false");
  listViewBtn.setAttribute("aria-pressed", "true");
});

window.onload = () => {
  getMembers();
  // Default view is grid view
  membersSection.classList.add("grid-view");
};
