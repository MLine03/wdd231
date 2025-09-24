// Manage last visit message using localStorage
document.addEventListener('DOMContentLoaded', () => {
  const messageEl = document.getElementById('visitor-message');
  const now = Date.now();
  const lastVisit = localStorage.getItem('lastVisit');
  let message = '';

  if (!lastVisit) {
    message = "Welcome! Let us know if you have any questions.";
  } else {
    const daysBetween = Math.floor((now - parseInt(lastVisit, 10)) / (1000 * 60 * 60 * 24));
    if (daysBetween === 0) {
      message = "Back so soon! Awesome!";
    } else if (daysBetween === 1) {
      message = "You last visited 1 day ago.";
    } else {
      message = `You last visited ${daysBetween} days ago.`;
    }
  }

  messageEl.textContent = message;
  localStorage.setItem('lastVisit', now.toString());
});
