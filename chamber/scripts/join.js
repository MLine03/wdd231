// Set timestamp value when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const timestampInput = document.getElementById('timestamp');
  if (timestampInput) {
    timestampInput.value = new Date().toISOString();
  }

  // Modal open/close logic
  document.querySelectorAll('[data-modal]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const modalId = e.target.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = 'flex';
        modal.focus();
      }
    });
  });

  document.querySelectorAll('[data-close]').forEach(span => {
    span.addEventListener('click', () => {
      const modalId = span.getAttribute('data-close');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = 'none';
      }
    });
  });

  // Close modal when clicking outside modal content
  window.addEventListener('click', event => {
    document.querySelectorAll('.modal').forEach(modal => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  });

  // Close modals on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal').forEach(modal => {
        if (modal.style.display === 'flex') {
          modal.style.display = 'none';
        }
      });
    }
  });
});
