document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const identifierInput = document.getElementById('identifier');
  const passwordInput = document.getElementById('password');
  const rememberMeCheckbox = document.getElementById('rememberMe');
  const googleBtn = document.getElementById('googleBtn');
  const appleBtn = document.getElementById('appleBtn');
  const submitBtn = document.getElementById('submitBtn');

  const identifierError = document.getElementById('identifierError');
  const passwordError = document.getElementById('passwordError');

  function setInputError(input, message) {
    const shell = input.closest('.input-shell');
    const error = input.closest('.auth-field')?.querySelector('.field-error');
    if (shell) shell.classList.toggle('has-error', Boolean(message));
    if (error) error.textContent = message || '';
  }

  if (googleBtn) {
    googleBtn.addEventListener('click', () => {
      // TODO: connect real OAuth.
      console.log('Google OAuth placeholder');
    });
  }

  if (appleBtn) {
    appleBtn.addEventListener('click', () => {
      // TODO: connect real OAuth.
      console.log('Apple OAuth placeholder');
    });
  }

  if (rememberMeCheckbox) {
    rememberMeCheckbox.addEventListener('change', (event) => {
      console.log('Remember me selected:', event.target.checked);
    });
  }

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

      // TODO: connect real backend fetch() call here.
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Log In';
      }, 1000);
    });
  }
});
