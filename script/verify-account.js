document.addEventListener('DOMContentLoaded', () => {
  const otpInputs = [...document.querySelectorAll('.otp-input')];
  const countdownText = document.getElementById('countdownText');
  const resendBtn = document.getElementById('resendBtn');
  const verifyForm = document.getElementById('verifyForm');
  const verifyMessage = document.getElementById('verifyMessage');
  const submitBtn = verifyForm ? verifyForm.querySelector('button[type="submit"]') : null;

  // TODO: connect the "Verify via SMS instead" button (#smsLinkBtn) to the backend.

  function showMessage(text, type) {
    if (!verifyMessage) return;
    verifyMessage.textContent = text;
    verifyMessage.className = 'verify-message ' + (type ? 'is-' + type : '');
  }

  function clearOtpErrors() {
    otpInputs.forEach((input) => { input.style.borderColor = ''; });
  }

  if (otpInputs.length) {
    const fillCode = (startIndex, rawCode) => {
      const digits = rawCode.replace(/\D/g, '').slice(0, otpInputs.length - startIndex);
      if (!digits) return;

      digits.split('').forEach((digit, offset) => {
        const target = otpInputs[startIndex + offset];
        target.value = digit;
        target.classList.add('filled');
      });

      clearOtpErrors();
      showMessage('', '');
      otpInputs[Math.min(startIndex + digits.length, otpInputs.length - 1)].focus();
    };

    otpInputs.forEach((input, index) => {
      input.addEventListener('input', (event) => {
        const rawValue = event.target.value.replace(/\D/g, '');
        if (rawValue.length > 1) {
          fillCode(index, rawValue);
          return;
        }

        const value = rawValue.slice(0, 1);
        event.target.value = value;
        if (value) event.target.classList.add('filled');
        else event.target.classList.remove('filled');

        event.target.style.borderColor = '';
        showMessage('', '');

        if (value && index < otpInputs.length - 1) {
          otpInputs[index + 1].focus();
        }
      });

      input.addEventListener('keydown', (event) => {
        if (event.key === 'Backspace' && !event.target.value && index > 0) {
          otpInputs[index - 1].focus();
        }
      });

      input.addEventListener('paste', (event) => {
        event.preventDefault();
        const pasted = event.clipboardData?.getData('text') || window.clipboardData?.getData('text') || '';
        fillCode(index, pasted);
      });
    });
  }

  if (countdownText) {
    let seconds = 59;
    const tick = () => {
      countdownText.textContent = `0:${String(seconds).padStart(2, '0')}`;
      if (seconds <= 0) {
        if (resendBtn) {
          resendBtn.disabled = false;
          resendBtn.textContent = 'Resend code';
        }
        return;
      }
      seconds -= 1;
      setTimeout(tick, 1000);
    };

    if (resendBtn) {
      resendBtn.disabled = true;
      resendBtn.textContent = 'Resend code in 0:59';
    }
    tick();
  }

  if (verifyForm) {
    verifyForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const filled = otpInputs.every((input) => input.value.trim());

      if (!filled) {
        otpInputs.forEach((input) => { input.style.borderColor = '#d93a3a'; });
        showMessage('Please enter all 6 digits of your code.', 'error');
        const firstEmpty = otpInputs.find((input) => !input.value.trim());
        if (firstEmpty) firstEmpty.focus();
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Verifying...';
      }

      // TODO: replace this timer with a real backend fetch() call and only
      // redirect when the server confirms the code is correct.
      setTimeout(() => {
        showMessage('Account verified! Taking you to your dashboard...', 'success');
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 1200);
      }, 800);
    });
  }

  if (resendBtn) {
    resendBtn.addEventListener('click', () => {
      // TODO: connect real backend.
      if (resendBtn.disabled) return;
      resendBtn.disabled = true;
      let seconds = 59;
      const timer = () => {
        if (countdownText) countdownText.textContent = `0:${String(seconds).padStart(2, '0')}`;
        resendBtn.textContent = `Resend code in 0:${String(seconds).padStart(2, '0')}`;
        if (seconds <= 0) {
          resendBtn.disabled = false;
          resendBtn.textContent = 'Resend code';
          return;
        }
        seconds -= 1;
        setTimeout(timer, 1000);
      };
      timer();
    });
  }
});