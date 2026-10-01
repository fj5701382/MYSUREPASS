document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const identifierInput = document.getElementById('identifier');
  const passwordInput = document.getElementById('password');
  const submitBtn = document.getElementById('submitBtn');
  const roleInputs = [...document.querySelectorAll('input[name="role"]')];

  function setInputError(input, message) {
    const shell = input.closest('.input-shell');
    const error = input.closest('.auth-field')?.querySelector('.field-error');
    if (shell) shell.classList.toggle('has-error', Boolean(message));
    if (error) error.textContent = message || '';
  }

  // Pre-select the role used last time on this browser.
  try {
    const lastRole = localStorage.getItem('msp_role');
    roleInputs.forEach((input) => {
      input.checked = input.value === (lastRole === 'teacher' ? 'teacher' : 'student');
    });
  } catch (error) {
    /* storage unavailable: keep the default (student) */
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

      const selected = roleInputs.find((input) => input.checked);
      const role = selected && selected.value === 'teacher' ? 'teacher' : 'student';

      // TODO: the real role will come from the server after login.
      try {
        localStorage.setItem('msp_role', role);
      } catch (error) {
        /* storage unavailable: redirect still works */
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Logging in...';

      // TODO: replace this timer with a real backend fetch() call.
      setTimeout(() => {
        window.location.href = role === 'teacher' ? 'teacher-dashboard.html' : 'dashboard.html';
      }, 1000);
    });
  }
});