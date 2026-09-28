document.addEventListener('DOMContentLoaded', () => {
  const otpInputs = [...document.querySelectorAll('.otp-input')];
  const countdownText = document.getElementById('countdownText');
  const resendBtn = document.getElementById('resendBtn');
  const smsButton = document.getElementById('smsLinkBtn');
  const verifyForm = document.getElementById('verifyForm');

  if (otpInputs.length) {
    const fillCode = (startIndex, rawCode) => {
      const digits = rawCode.replace(/\D/g, '').slice(0, otpInputs.length - startIndex);
      if (!digits) return;

      digits.split('').forEach((digit, offset) => {
        const target = otpInputs[startIndex + offset];
        target.value = digit;
        target.classList.add('filled');
      });

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
      const display = `0:${String(seconds).padStart(2, '0')}`;
      countdownText.textContent = display;
      if (seconds <= 0) {
        countdownText.textContent = '0:00';
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

  if (smsButton) {
    smsButton.addEventListener('click', () => {
      // TODO: connect real backend here.
      console.log('Verify via SMS instead clicked');
    });
  }

  if (verifyForm) {
    verifyForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const values = otpInputs.map((input) => input.value.trim());
      const filled = values.every(Boolean);

      if (!filled) {
        otpInputs.forEach((input) => {
          input.style.borderColor = '#d93a3a';
        });
        return;
      }

      // TODO: connect real backend fetch() call here.
      alert('Demo verification accepted.');
    });
  }

  if (resendBtn) {
    resendBtn.addEventListener('click', () => {
      // TODO: connect real backend.
      if (resendBtn.disabled) return;
      if (countdownText) countdownText.textContent = '0:59';
      resendBtn.disabled = true;
      resendBtn.textContent = 'Resend code in 0:59';
      let seconds = 59;
      const timer = () => {
        const display = `0:${String(seconds).padStart(2, '0')}`;
        countdownText.textContent = display;
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
