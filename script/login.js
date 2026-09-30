document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const identifierInput = document.getElementById('identifier');
  const passwordInput = document.getElementById('password');
  const submitBtn = document.getElementById('submitBtn');

  function setInputError(input, message) {
    const shell = input.closest('.input-shell');
    const error = input.closest('.auth-field')?.querySelector('.field-error');
    if (shell) shell.classList.toggle('has-error', Boolean(message));
    if (error) error.textContent = message || '';
  }

  // TODO: connect real Google OAuth to #googleBtn.
  // TODO: connect real Apple OAuth to #appleBtn.
  // TODO: persist "remember me" (#rememberMe) once a real session exists.

  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const identifierValue = identifierInput.value.trim();
      const passwordValue = passwordInput.value.trim();

      let hasError = false;

      if (!identifierValue) {
        setInputError(identifierInput, 'Please enter your email, username, or phone number.');
        hasError = true;
      } else {
        setInputError(identifierInput, '');
      }

      if (!passwordValue) {
        setInputError(passwordInput, 'Please enter your password.');
        hasError = true;
      } else {
        setInputError(passwordInput, '');
      }

      if (hasError) {
        if (!identifierValue) identifierInput.focus();
        else if (!passwordValue) passwordInput.focus();
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Logging in...';

      // TODO: replace this timer with a real backend fetch() call and only
      // redirect when the server confirms the login succeeded.
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1000);
    });
  }
});