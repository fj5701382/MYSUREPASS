document.addEventListener('DOMContentLoaded', () => {
  const toggleButtons = document.querySelectorAll('[data-password-toggle]');

  toggleButtons.forEach((button) => {
    const target = document.getElementById(button.dataset.passwordToggle);
    if (!target) return;

    button.addEventListener('click', () => {
      const nextType = target.type === 'password' ? 'text' : 'password';
      target.type = nextType;
      button.setAttribute('aria-label', nextType === 'password' ? 'Show password' : 'Hide password');
      button.setAttribute('aria-pressed', String(nextType === 'text'));
      button.innerHTML = nextType === 'password'
        ? '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>'
        : '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"></path></svg>';
    });
  });
});

function setFieldError(input, message) {
  const shell = input.closest('.input-shell');
  const error = input.closest('.auth-field')?.querySelector('.field-error');

  if (shell) shell.classList.toggle('has-error', Boolean(message));
  if (error) error.textContent = message || '';
}

function clearFieldError(input) {
  setFieldError(input, '');
}

function getPasswordStrength(password) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 1) return { label: 'Weak', level: 1, colorClass: 'weak' };
  if (score <= 2) return { label: 'Fair', level: 2, colorClass: 'fair' };
  return { label: 'Strong', level: 3, colorClass: 'strong' };
}

function updateMeter(meterNode, wordNode, password) {
  const strength = getPasswordStrength(password);
  const bars = meterNode.querySelectorAll('span');

  bars.forEach((bar, index) => {
    bar.classList.toggle('active', index < strength.level);
  });

  if (wordNode) {
    wordNode.textContent = strength.label;
    wordNode.className = 'auth-meter-word ' + strength.colorClass;
  }
}

function startCountdown(seconds, labelNode, actionNode, onExpire) {
  let remaining = seconds;
  const update = () => {
    const display = remaining > 0 ? `0:${String(remaining).padStart(2, '0')}` : '0:00';
    labelNode.textContent = display;

    if (remaining <= 0) {
      actionNode.textContent = 'Resend code';
      actionNode.disabled = false;
      actionNode.setAttribute('aria-disabled', 'false');
      actionNode.classList.add('is-ready');
      return;
    }

    remaining -= 1;
    setTimeout(update, 1000);
  };

  actionNode.disabled = true;
  actionNode.setAttribute('aria-disabled', 'true');
  actionNode.classList.remove('is-ready');
  update();

  if (typeof onExpire === 'function') {
    setTimeout(onExpire, (seconds + 1) * 1000);
  }
}
