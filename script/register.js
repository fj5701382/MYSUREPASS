document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');
  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const dob = document.getElementById('dob');
  const state = document.getElementById('state');
  const city = document.getElementById('city');
  const phone = document.getElementById('phone');

  function validateDob(value) {
    const segments = value.split('/').map((part) => part.trim());
    if (segments.length !== 3) return false;

    const [day, month, year] = segments.map(Number);
    if ([day, month, year].some((part) => Number.isNaN(part))) return false;
    if (year < 1900 || year > new Date().getFullYear()) return false;

    const parsed = new Date(year, month - 1, day);
    return parsed.getFullYear() === year && parsed.getMonth() === month - 1 && parsed.getDate() === day;
  }

  function showError(input, message) {
    const shell = input.closest('.input-shell');
    const error = input.closest('.auth-field')?.querySelector('.field-error');
    if (shell) shell.classList.toggle('has-error', Boolean(message));
    if (error) error.textContent = message || '';
  }

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const fields = [
        { input: firstName, label: 'First Name' },
        { input: lastName, label: 'Last Name' },
        { input: dob, label: 'Date of Birth' },
        { input: state, label: 'State' },
        { input: city, label: 'City' },
        { input: phone, label: 'Phone Number' }
      ];

      let valid = true;

      fields.forEach(({ input, label }) => {
        const value = input.value.trim();
        let message = '';

        if (!value) {
          message = `${label} is required.`;
          valid = false;
        } else if (input === dob && !validateDob(value)) {
          message = 'Please enter a valid date in DD / MM / YYYY format.';
          valid = false;
        }

        showError(input, message);
      });

      if (!valid) return;

      // TODO: build Steps 2 and 3 of the registration flow here.
      // TODO: connect real backend fetch() call here.
      window.location.href = 'verify-account.html';
    });
  }
});
