// About Us page — animate stat numbers on scroll
document.addEventListener('DOMContentLoaded', () => {

  // Animate counters when they come into view
  const statNums = document.querySelectorAll('.stat-num');
  if (!statNums.length) return;

  const parseStatValue = (text) => {
    const clean = text.replace(/[^0-9.kK+]/g, '');
    const hasK = /k/i.test(text);
    const numPart = parseFloat(clean.replace(/[kK+]/g, ''));
    return { value: hasK ? numPart * 1000 : numPart, hasK, hasPlus: text.includes('+'), raw: text };
  };

  const formatStat = (current, hasK, hasPlus, target) => {
    if (hasK) {
      const kVal = current / 1000;
      return (kVal % 1 === 0 ? kVal.toFixed(0) : kVal.toFixed(0)) + 'k' + (hasPlus ? '+' : '');
    }
    return Math.round(current) + (hasPlus ? '+' : '');
  };

  const animateStat = (el) => {
    const original = el.textContent.trim();
    const { value: target, hasK, hasPlus } = parseStatValue(original);
    if (isNaN(target) || target === 0) return;

    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = formatStat(eased * target, hasK, hasPlus, target);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  // Respect reduced motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) return; // keep static numbers

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStat(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => observer.observe(el));

});
