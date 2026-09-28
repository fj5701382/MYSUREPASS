document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('resetPasswordForm');
  const newPasswordInput = document.getElementById('newPassword');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const strengthText = document.getElementById('strengthText');
  const strengthMeter = document.getElementById('strengthMeter');

  if (newPasswordInput) {
    newPasswordInput.addEventListener('input', () => {
      const password = newPasswordInput.value;
      const strength = getPasswordStrength(password);
      const bars = strengthMeter.querySelectorAll('span');
      bars.forEach((bar, index) => {
        bar.classList.toggle('active', index < strength.level);
      });

      if (strengthText) {
        strengthText.textContent = strength.label;
        strengthText.className = 'auth-meter-word ' + strength.colorClass;
      }
    });
  }

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      let valid = true;
      const passwordValue = newPasswordInput.value;
      const confirmValue = confirmPasswordInput.value;

      setFieldError(newPasswordInput, '');
      setFieldError(confirmPasswordInput, '');

      if (!passwordValue) {
        setFieldError(newPasswordInput, 'Please enter a new password.');
        valid = false;
      }

      if (!confirmValue) {
        setFieldError(confirmPasswordInput, 'Please confirm your new password.');
        valid = false;
      }

      if (passwordValue && confirmValue && passwordValue !== confirmValue) {
        setFieldError(confirmPasswordInput, 'Passwords do not match.');
        valid = false;
      }

      if (!valid) return;

      // TODO: connect real backend fetch() call here.
      window.location.href = 'login.html';
    });
  }
});
