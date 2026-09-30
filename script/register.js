document.addEventListener('DOMContentLoaded', () => {
  const selection = document.getElementById('accountTypeSelection');
  const registrationPanel = document.getElementById('registrationPanel');
  const roleButtons = document.querySelectorAll('[data-account-type]');
  const roleForms = document.querySelectorAll('[data-role-form]');
  const changeAccountType = document.getElementById('changeAccountType');

  function selectRole(role) {
    selection.hidden = true;
    registrationPanel.hidden = false;

    roleButtons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.accountType === role));
    });

    roleForms.forEach((form) => {
      form.hidden = form.dataset.roleForm !== role;
    });

    document.querySelector(`[data-role-form="${role}"] h2`)?.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  roleButtons.forEach((button) => {
    button.addEventListener('click', () => selectRole(button.dataset.accountType));
  });

  changeAccountType.addEventListener('click', () => {
    registrationPanel.hidden = true;
    selection.hidden = false;
    selection.querySelector('h2').focus();
  });

  document.querySelectorAll('[data-password-strength]').forEach((strengthNode) => {
    const password = document.getElementById(strengthNode.dataset.passwordStrength);
    const word = strengthNode.querySelector('.auth-meter-word');
    const meter = strengthNode.querySelector('.password-strength-bars');

    password.addEventListener('input', () => {
      if (password.value) {
        updateMeter(meter, word, password.value);
        strengthNode.classList.add('is-visible');
      } else {
        meter.querySelectorAll('span').forEach((bar) => bar.classList.remove('active'));
        word.textContent = 'Use at least 8 characters';
        word.className = 'auth-meter-word';
        strengthNode.classList.remove('is-visible');
      }
    });
  });

  function validateForm(form) {
    const inputs = [...form.querySelectorAll('input[required]')];
    let firstInvalid = null;
    const password = form.querySelector('[name="password"]');
    const confirmPassword = form.querySelector('[name="confirmPassword"]');

    inputs.forEach((input) => {
      const value = input.value.trim();
      let message = '';

      if (!value) {
        message = `${input.labels[0].textContent.replace('*', '').trim()} is required.`;
      } else if (input.type === 'email' && !input.validity.valid) {
        message = 'Enter a valid email address.';
      } else if (input.type === 'tel' && value.replace(/\D/g, '').length < 7) {
        message = 'Enter a valid phone number.';
      } else if (input === password && value.length < 8) {
        message = 'Password must be at least 8 characters.';
      } else if (input === confirmPassword && value !== password.value) {
        message = 'Passwords do not match.';
      } else if (input.id === 'studentIdentifier' && !isEmail(value) && !isPhone(value)) {
        message = 'Enter a valid email address or phone number.';
      }

      setFieldError(input, message);
      input.setAttribute('aria-invalid', String(Boolean(message)));
      if (message && !firstInvalid) firstInvalid = input;
    });

    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
  }

  function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function isPhone(value) {
    return value.replace(/\D/g, '').length >= 7 && /^[+\d\s().-]+$/.test(value);
  }

  roleForms.forEach((form) => {
    form.querySelectorAll('input').forEach((input) => {
      input.addEventListener('input', () => {
        setFieldError(input, '');
        input.removeAttribute('aria-invalid');
      });
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!validateForm(form)) return;

      window.location.href = 'verify-account.html';
    });
  });
});
