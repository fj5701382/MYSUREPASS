document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('forgotPasswordForm');
  const input = document.getElementById('forgotIdentifier');
  const error = document.getElementById('forgotError');
  const button = document.getElementById('sendLinkBtn');

  if (!form || !input) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = input.value.trim();
    const shell = input.closest('.input-shell');

    if (!value) {
      shell.classList.add('has-error');
      error.textContent = 'Please enter your email or phone number.';
      input.focus();
      return;
    }

    shell.classList.remove('has-error');
    error.textContent = '';

    button.disabled = true;
    button.textContent = 'Sending...';

    // TODO: connect real backend fetch() call here.
    setTimeout(() => {
      const formContainer = form;
      formContainer.innerHTML = '<div class="auth-confirm-state">Check your email/phone for the reset link.</div>';
    }, 600);
  });
});
