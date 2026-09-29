// Contact Us page — FAQ accordion + form validation
document.addEventListener('DOMContentLoaded', () => {

  // ── FAQ Accordion ──────────────────────────────────────────
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const answer  = item.querySelector('.faq-answer');
    if (!trigger || !answer) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Close all
      faqItems.forEach(i => {
        i.classList.remove('is-open');
        i.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
        const ans = i.querySelector('.faq-answer');
        if (ans) ans.hidden = true;
      });

      // Toggle clicked
      if (!isOpen) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
        answer.hidden = false;
      }
    });
  });

  // ── Contact Form Validation ────────────────────────────────
  const form        = document.getElementById('contactForm');
  const successBanner = document.getElementById('formSuccess');
  const submitBtn   = document.getElementById('submitBtn');
  if (!form) return;

  function setError(inputId, errorId, msg) {
    const input = document.getElementById(inputId);
    const err   = document.getElementById(errorId);
    if (!input || !err) return;
    input.classList.toggle('is-invalid', !!msg);
    err.textContent = msg || '';
  }

  function clearErrors() {
    ['fullName', 'emailAddr', 'msgBody'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('is-invalid');
    });
    ['fullNameError', 'emailAddrError', 'inquirySubjectError', 'msgBodyError'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = '';
    });
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    clearErrors();
    if (successBanner) successBanner.hidden = true;

    const name    = document.getElementById('fullName')?.value.trim();
    const email   = document.getElementById('emailAddr')?.value.trim();
    const subject = document.getElementById('inquirySubject')?.value;
    const msg     = document.getElementById('msgBody')?.value.trim();

    let valid = true;

    if (!name) {
      setError('fullName', 'fullNameError', 'Please enter your full name.');
      valid = false;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('emailAddr', 'emailAddrError', 'Please enter a valid email address.');
      valid = false;
    }

    if (!subject) {
      const errEl = document.getElementById('inquirySubjectError');
      if (errEl) errEl.textContent = 'Please select an inquiry reason.';
      const sel = document.getElementById('inquirySubject');
      if (sel) sel.classList.add('is-invalid');
      valid = false;
    }

    if (!msg || msg.length < 10) {
      setError('msgBody', 'msgBodyError', 'Please type a message (minimum 10 characters).');
      valid = false;
    }

    if (!valid) return;

    // Simulate sending
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.querySelector('span').textContent = 'Sending…';
    }

    setTimeout(() => {
      form.reset();
      if (successBanner) successBanner.hidden = false;
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.querySelector('span').textContent = 'Send Message';
      }
      successBanner?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 1400);
  });

  // Live clear error on input
  ['fullName', 'emailAddr', 'msgBody'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', () => {
      el.classList.remove('is-invalid');
      const errEl = document.getElementById(id + 'Error');
      if (errEl) errEl.textContent = '';
    });
  });

  const subjectSel = document.getElementById('inquirySubject');
  if (subjectSel) {
    subjectSel.addEventListener('change', () => {
      subjectSel.classList.remove('is-invalid');
      const errEl = document.getElementById('inquirySubjectError');
      if (errEl) errEl.textContent = '';
    });
  }

});
