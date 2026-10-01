document.addEventListener('DOMContentLoaded', () => {
  const SESSION_KEY = 'msp_cbt_session';
  const HISTORY_KEY = 'msp_cbt_history';
  const LEVEL_KEY = 'msp_cbt_level';
  const LETTERS = ['A', 'B', 'C', 'D'];

  // Sample practice questions. TODO: replace with the real question bank / API.
  const BANK = {
    'Mathematics': [
      { q: 'Simplify 3/4 + 2/3.', o: ['5/7', '17/12', '1/2', '1 1/12'], a: 1, e: '3/4 + 2/3 = 9/12 + 8/12 = 17/12, which is 1 5/12.' },
      { q: 'Solve for x: 2x + 5 = 17.', o: ['4', '6', '11', '12'], a: 1, e: '2x = 17 − 5 = 12, so x = 6.' },
      { q: 'What is 15% of 200?', o: ['15', '20', '30', '45'], a: 2, e: '15/100 × 200 = 30.' },
      { q: 'Find the value of 2³ × 2².', o: ['10', '25', '32', '64'], a: 2, e: 'Add the powers: 2³ × 2² = 2⁵ = 32.' },
      { q: 'The length of a rectangle is 8 cm and its width is 5 cm. What is its perimeter?', o: ['13 cm', '26 cm', '40 cm', '52 cm'], a: 1, e: 'Perimeter = 2(8 + 5) = 26 cm.' },
      { q: 'Find √144.', o: ['10', '11', '12', '14'], a: 2, e: '12 × 12 = 144.' },
      { q: 'A triangle has a base of 10 cm and a height of 6 cm. What is its area?', o: ['16 cm²', '30 cm²', '60 cm²', '120 cm²'], a: 1, e: 'Area = ½ × base × height = ½ × 10 × 6 = 30 cm².' },
      { q: 'Express 0.25 as a fraction in its lowest terms.', o: ['1/2', '1/4', '2/5', '25/10'], a: 1, e: '0.25 = 25/100 = 1/4.' },
      { q: 'If y = 3x − 2 and x = 4, find y.', o: ['6', '10', '12', '14'], a: 1, e: 'y = 3(4) − 2 = 12 − 2 = 10.' },
      { q: 'What is the sum of the interior angles of a triangle?', o: ['90°', '180°', '270°', '360°'], a: 1, e: 'The three angles of any triangle add up to 180°.' }
    ],
    'English Language': [
      { q: 'Choose the option that best completes the sentence: "Neither of the boys ___ present."', o: ['were', 'are', 'was', 'have been'], a: 2, e: '"Neither" is singular, so it takes a singular verb: "Neither of the boys was present."' },
      { q: 'Choose the word that is opposite in meaning to "generous".', o: ['kind', 'stingy', 'rich', 'careful'], a: 1, e: 'A generous person gives freely; a stingy person does not.' },
      { q: 'Ngozi is the ___ of the two sisters.', o: ['tall', 'taller', 'tallest', 'more tall'], a: 1, e: 'Use the comparative form (taller) when comparing two people.' },
      { q: 'Which word is an adverb in this sentence: "He answered the question quickly."?', o: ['answered', 'question', 'quickly', 'He'], a: 2, e: '"Quickly" describes how he answered, so it is an adverb.' },
      { q: 'What is the plural of "criterion"?', o: ['criterions', 'criteria', 'criterias', 'criterion'], a: 1, e: '"Criteria" is the plural of "criterion".' },
      { q: 'Choose the correctly spelt word.', o: ['Accomodation', 'Accommodation', 'Acommodation', 'Acomodation'], a: 1, e: 'The correct spelling has a double c and a double m.' },
      { q: 'He has lived in Lagos ___ 2015.', o: ['for', 'since', 'from', 'at'], a: 1, e: '"Since" goes with a point in time; "for" goes with a length of time.' },
      { q: 'What does the word "ephemeral" mean?', o: ['eternal', 'lasting a very short time', 'extremely large', 'very beautiful'], a: 1, e: 'Something ephemeral lasts only for a short time.' },
      { q: 'What is the past tense of "choose"?', o: ['choosed', 'chose', 'chosen', 'choosen'], a: 1, e: '"Chose" is the simple past; "chosen" is the past participle.' },
      { q: 'Identify the figure of speech: "The wind whispered through the trees."', o: ['Simile', 'Metaphor', 'Personification', 'Hyperbole'], a: 2, e: 'The wind is given a human action (whispering), which is personification.' }
    ],
    'Biology': [
      { q: 'Which part of the cell is called the powerhouse of the cell?', o: ['Nucleus', 'Mitochondrion', 'Ribosome', 'Vacuole'], a: 1, e: 'Mitochondria release energy from food during respiration.' },
      { q: 'What is the process by which green plants make their food?', o: ['Respiration', 'Photosynthesis', 'Transpiration', 'Digestion'], a: 1, e: 'Plants use light, water and carbon dioxide to make food in photosynthesis.' },
      { q: 'Which blood group is known as the universal donor?', o: ['A', 'B', 'AB', 'O'], a: 3, e: 'Group O red cells have no A or B antigens, so they can be given to most people.' },
      { q: 'Which organ filters the blood to form urine?', o: ['Liver', 'Kidney', 'Lung', 'Heart'], a: 1, e: 'The kidneys filter waste from the blood and produce urine.' },
      { q: 'Which gas is released by plants during photosynthesis?', o: ['Carbon dioxide', 'Nitrogen', 'Oxygen', 'Hydrogen'], a: 2, e: 'Oxygen is a by-product of photosynthesis.' },
      { q: 'What is the basic unit of heredity?', o: ['Cell', 'Gene', 'Tissue', 'Enzyme'], a: 1, e: 'Genes carry the instructions that are passed from parents to offspring.' },
      { q: 'A lack of which vitamin causes scurvy?', o: ['Vitamin A', 'Vitamin B', 'Vitamin C', 'Vitamin D'], a: 2, e: 'Scurvy is caused by a deficiency of vitamin C.' },
      { q: 'Which part of a flower develops into the fruit?', o: ['Anther', 'Stigma', 'Ovary', 'Petal'], a: 2, e: 'After fertilisation, the ovary develops into the fruit.' },
      { q: 'Which mosquito transmits the malaria parasite?', o: ['Culex', 'Aedes', 'Anopheles', 'Tsetse fly'], a: 2, e: 'The female Anopheles mosquito carries the malaria parasite.' },
      { q: 'Which enzyme in saliva begins the digestion of starch?', o: ['Pepsin', 'Lipase', 'Amylase', 'Trypsin'], a: 2, e: 'Salivary amylase starts breaking starch down into sugars in the mouth.' }
    ],
    'Chemistry': [
      { q: 'What is the chemical symbol for sodium?', o: ['S', 'So', 'Na', 'N'], a: 2, e: 'Na comes from the Latin name "natrium".' },
      { q: 'What is the pH of a neutral solution at room temperature?', o: ['0', '7', '10', '14'], a: 1, e: 'A pH of 7 is neutral; below 7 is acidic and above 7 is alkaline.' },
      { q: 'Which gas is given off when zinc reacts with dilute hydrochloric acid?', o: ['Oxygen', 'Hydrogen', 'Chlorine', 'Carbon dioxide'], a: 1, e: 'Metals react with acids to give a salt and hydrogen gas.' },
      { q: 'What is the atomic number of carbon?', o: ['4', '6', '8', '12'], a: 1, e: 'Carbon has 6 protons, so its atomic number is 6.' },
      { q: 'Which of these is a noble gas?', o: ['Nitrogen', 'Oxygen', 'Argon', 'Chlorine'], a: 2, e: 'Argon belongs to Group 18, the noble gases.' },
      { q: 'Which of these is the formula of sulphuric acid?', o: ['HNO₃', 'H₂SO₄', 'HCl', 'H₃PO₄'], a: 1, e: 'Sulphuric acid is H₂SO₄.' },
      { q: 'Which method is best for obtaining pure water from salt water?', o: ['Filtration', 'Distillation', 'Decantation', 'Sublimation'], a: 1, e: 'Distillation boils off the water and condenses it, leaving the salt behind.' },
      { q: 'What type of bond is found in sodium chloride?', o: ['Covalent', 'Ionic', 'Metallic', 'Hydrogen'], a: 1, e: 'Sodium gives an electron to chlorine, forming an ionic bond.' },
      { q: 'Rusting of iron needs the presence of:', o: ['oxygen only', 'water only', 'oxygen and water', 'nitrogen and water'], a: 2, e: 'Iron rusts when it is in contact with both oxygen and water.' },
      { q: 'What is the main component of natural gas?', o: ['Ethane', 'Methane', 'Propane', 'Butane'], a: 1, e: 'Natural gas is mostly methane (CH₄).' }
    ],
    'Physics': [
      { q: 'What is the SI unit of force?', o: ['Joule', 'Watt', 'Newton', 'Pascal'], a: 2, e: 'Force is measured in newtons (N).' },
      { q: 'A car covers 120 km in 2 hours. What is its average speed?', o: ['30 km/h', '60 km/h', '120 km/h', '240 km/h'], a: 1, e: 'Speed = distance ÷ time = 120 ÷ 2 = 60 km/h.' },
      { q: 'Which of these is a vector quantity?', o: ['Speed', 'Mass', 'Velocity', 'Temperature'], a: 2, e: 'Velocity has both magnitude and direction.' },
      { q: 'What is the unit of electrical resistance?', o: ['Volt', 'Ampere', 'Ohm', 'Watt'], a: 2, e: 'Resistance is measured in ohms (Ω).' },
      { q: 'The acceleration due to gravity on Earth is about:', o: ['0.98 m/s²', '9.8 m/s²', '98 m/s²', '980 m/s²'], a: 1, e: 'Near the Earth\'s surface, g is approximately 9.8 m/s².' },
      { q: 'Which of these is a good conductor of electricity?', o: ['Rubber', 'Copper', 'Glass', 'Wood'], a: 1, e: 'Metals such as copper have free electrons that carry current.' },
      { q: 'The energy a body has because of its position is called:', o: ['kinetic energy', 'potential energy', 'heat energy', 'sound energy'], a: 1, e: 'Energy stored because of position or condition is potential energy.' },
      { q: 'Light travels fastest in:', o: ['water', 'glass', 'a vacuum', 'diamond'], a: 2, e: 'Light travels fastest in a vacuum, at about 300,000 km per second.' },
      { q: 'Which formula gives pressure?', o: ['Force × area', 'Force ÷ area', 'Area ÷ force', 'Mass × velocity'], a: 1, e: 'Pressure = force ÷ area.' },
      { q: 'Which instrument is used to measure atmospheric pressure?', o: ['Thermometer', 'Barometer', 'Ammeter', 'Hygrometer'], a: 1, e: 'A barometer measures atmospheric pressure.' }
    ]
  };

  // ── Elements ──
  const $ = (id) => document.getElementById(id);
  const screens = { setup: $('cbtSetup'), test: $('cbtTest'), result: $('cbtResult') };
  const form = $('cbtForm');
  const subjectSelect = $('cbtSubject');
  const countSelect = $('cbtCount');
  const timeSelect = $('cbtTime');
  const levelSelect = $('cbtLevel');
  const resumeCard = $('resumeCard');
  const resumeText = $('resumeText');
  const testSubject = $('testSubject');
  const timerEl = $('timer');
  const timerText = $('timerText');
  const timerAnnounce = $('timerAnnounce');
  const progressFill = $('progressFill');
  const qNumber = $('qNumber');
  const qText = $('qText');
  const qOptions = $('qOptions');
  const prevBtn = $('prevBtn');
  const nextBtn = $('nextBtn');
  const flagBtn = $('flagBtn');
  const clearBtn = $('clearBtn');
  const palette = $('palette');
  const submitDialog = $('submitDialog');
  const quitDialog = $('quitDialog');

  let session = null;
  let timerId = null;
  let announced = {};

  // ── Storage helpers (all wrapped: storage can be unavailable) ──
  function readJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      /* storage full or unavailable: the test still works, just not resumable */
    }
  }

  function removeKey(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      /* ignore */
    }
  }

  function persist() {
    if (session) writeJSON(SESSION_KEY, session);
  }

  // ── Small utilities ──
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function shuffle(list) {
    const copy = list.slice();
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  }

  function showScreen(name) {
    Object.entries(screens).forEach(([key, node]) => { node.hidden = key !== name; });
    document.body.classList.toggle('cbt-active', name === 'test');
    window.scrollTo({ top: 0 });
  }

  function openDialog(dialog) {
    if (typeof dialog.showModal === 'function') dialog.showModal();
  }

  // ── Starting a test ──
  function startTest(subject, count, minutes, level) {
    const picked = shuffle(BANK[subject]).slice(0, count).map((entry) => {
      const order = shuffle(entry.o.map((_, index) => index));
      return {
        q: entry.q,
        options: order.map((index) => entry.o[index]),
        correct: order.indexOf(entry.a),
        why: entry.e
      };
    });

    const now = Date.now();
    session = {
      subject,
      level,
      minutes,
      items: picked,
      answers: picked.map(() => null),
      flags: picked.map(() => false),
      current: 0,
      startedAt: now,
      endsAt: minutes ? now + minutes * 60000 : null
    };

    persist();
    beginTest();
  }

  function beginTest() {
    announced = {};
    timerAnnounce.textContent = '';
    testSubject.textContent = `${session.subject} practice`;
    showScreen('test');
    renderQuestion(false);
    renderPalette();
    updateProgress();
    startTimer();
  }

  // ── Timer ──
  function startTimer() {
    clearInterval(timerId);
    if (!session.endsAt) {
      timerEl.hidden = true;
      return;
    }
    timerEl.hidden = false;
    updateTimer();
    timerId = setInterval(updateTimer, 500);
  }

  function updateTimer() {
    if (!session || !session.endsAt) return;
    const remaining = Math.max(0, Math.ceil((session.endsAt - Date.now()) / 1000));
    timerText.textContent = formatTime(remaining);
    timerEl.classList.toggle('is-warning', remaining <= 60 && remaining > 30);
    timerEl.classList.toggle('is-low', remaining <= 30);

    if (remaining <= 60 && !announced.minute) {
      announced.minute = true;
      timerAnnounce.textContent = 'One minute remaining.';
    }
    if (remaining <= 30 && !announced.half) {
      announced.half = true;
      timerAnnounce.textContent = 'Thirty seconds remaining.';
    }
    if (remaining === 0) finishTest(true);
  }

  // ── Question display ──
  function renderQuestion(moveFocus) {
    const index = session.current;
    const item = session.items[index];

    qNumber.textContent = `Question ${index + 1} of ${session.items.length}`;
    qText.textContent = item.q;
    qOptions.replaceChildren();

    item.options.forEach((text, i) => {
      const label = el('label', 'cbt-option');
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'answer';
      input.value = String(i);
      input.checked = session.answers[index] === i;
      label.append(input, el('b', '', LETTERS[i]), el('span', '', text));
      qOptions.append(label);
    });

    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === session.items.length - 1;
    const flagged = session.flags[index];
    flagBtn.setAttribute('aria-pressed', String(flagged));
    flagBtn.textContent = flagged ? 'Marked for review' : 'Mark for review';

    if (moveFocus) qText.focus({ preventScroll: true });
  }

  function renderPalette() {
    palette.replaceChildren();
    session.items.forEach((_, i) => {
      const answered = session.answers[i] !== null;
      const flagged = session.flags[i];
      const button = el('button', 'cbt-pal', String(i + 1));
      button.type = 'button';
      if (answered) button.classList.add('is-answered');
      if (flagged) button.classList.add('is-flagged');
      if (i === session.current) {
        button.classList.add('is-current');
        button.setAttribute('aria-current', 'true');
      }
      const status = [answered ? 'answered' : 'not answered'];
      if (flagged) status.push('marked for review');
      button.setAttribute('aria-label', `Question ${i + 1}, ${status.join(', ')}`);
      button.addEventListener('click', () => goTo(i));
      palette.append(button);
    });
  }

  function updateProgress() {
    const answered = session.answers.filter((a) => a !== null).length;
    progressFill.style.width = `${(answered / session.items.length) * 100}%`;
  }

  function goTo(index) {
    session.current = Math.min(Math.max(index, 0), session.items.length - 1);
    persist();
    renderQuestion(true);
    renderPalette();
  }

  qOptions.addEventListener('change', (event) => {
    if (event.target.name !== 'answer') return;
    session.answers[session.current] = Number(event.target.value);
    persist();
    renderPalette();
    updateProgress();
  });

  prevBtn.addEventListener('click', () => goTo(session.current - 1));
  nextBtn.addEventListener('click', () => goTo(session.current + 1));

  flagBtn.addEventListener('click', () => {
    session.flags[session.current] = !session.flags[session.current];
    persist();
    renderQuestion(false);
    renderPalette();
  });

  clearBtn.addEventListener('click', () => {
    session.answers[session.current] = null;
    persist();
    renderQuestion(false);
    renderPalette();
    updateProgress();
  });

  // ── Submit and quit ──
  $('submitBtn').addEventListener('click', () => {
    const unanswered = session.answers.filter((a) => a === null).length;
    const flagged = session.flags.filter(Boolean).length;
    const parts = [];
    if (unanswered) parts.push(`${unanswered} unanswered question${unanswered === 1 ? '' : 's'}`);
    if (flagged) parts.push(`${flagged} marked for review`);
    $('submitSummary').textContent = parts.length
      ? `You still have ${parts.join(' and ')}. Once you submit, you can't change your answers.`
      : "You've answered every question. Once you submit, you can't change your answers.";
    openDialog(submitDialog);
  });

  $('submitCancel').addEventListener('click', () => submitDialog.close());
  $('submitConfirm').addEventListener('click', () => {
    submitDialog.close();
    finishTest(false);
  });

  $('quitBtn').addEventListener('click', () => openDialog(quitDialog));
  $('quitCancel').addEventListener('click', () => quitDialog.close());
  $('quitConfirm').addEventListener('click', () => {
    quitDialog.close();
    clearInterval(timerId);
    session = null;
    removeKey(SESSION_KEY);
    showSetup();
  });

  // ── Finishing and results ──
  function finishTest(auto) {
    if (!session) return;
    clearInterval(timerId);

    const items = session.items;
    const total = items.length;
    let correct = 0;
    let skipped = 0;
    items.forEach((item, i) => {
      const chosen = session.answers[i];
      if (chosen === null) skipped += 1;
      else if (chosen === item.correct) correct += 1;
    });
    const wrong = total - correct - skipped;
    const percent = Math.round((correct / total) * 100);

    let elapsed = Math.round((Date.now() - session.startedAt) / 1000);
    if (session.minutes) elapsed = Math.min(elapsed, session.minutes * 60);

    // Keep the last 20 results on this device. TODO: send to the backend later.
    const history = readJSON(HISTORY_KEY, []);
    history.push({
      date: new Date().toISOString(),
      subject: session.subject,
      level: session.level || '',
      correct,
      total,
      percent
    });
    writeJSON(HISTORY_KEY, history.slice(-20));

    renderResult({ session, correct, wrong, skipped, total, percent, elapsed, auto });

    session = null;
    removeKey(SESSION_KEY);
    showScreen('result');
    $('resultHeading').focus({ preventScroll: true });
  }

  function renderResult(data) {
    const { session: s, correct, wrong, skipped, total, percent, elapsed, auto } = data;

    $('resultTitle').textContent = `${s.subject} practice`;
    $('scoreValue').textContent = `${correct} / ${total}`;
    $('scorePercent').textContent = `${percent}%`;
    $('statCorrect').textContent = String(correct);
    $('statWrong').textContent = String(wrong);
    $('statSkipped').textContent = String(skipped);
    $('statTime').textContent = formatTime(elapsed);

    let message;
    if (percent >= 70) message = 'Great work! You know this material well. Keep the momentum going.';
    else if (percent >= 50) message = 'Good effort. A little more practice and review will lift this score.';
    else message = "Keep practising. Read the explanations below, then try again. You'll improve.";
    $('scoreMessage').textContent = message;

    $('resultNotice').hidden = !auto || elapsed < (s.minutes || 0) * 60 - 1;
    s.lastSubject = s.subject;
    lastRun = { subject: s.subject, count: total, minutes: s.minutes, level: s.level };

    const list = $('reviewList');
    list.replaceChildren();
    s.items.forEach((item, i) => {
      const chosen = s.answers[i];
      const status = chosen === null ? 'skipped' : chosen === item.correct ? 'right' : 'wrong';
      const card = el('article', 'cbt-card cbt-review-item');

      const top = el('div', 'cbt-review-top');
      top.append(el('span', '', `Question ${i + 1}`));
      top.append(el('span', `cbt-badge is-${status}`, status === 'right' ? 'Correct' : status === 'wrong' ? 'Incorrect' : 'Not answered'));
      card.append(top, el('h3', '', item.q));

      if (status !== 'right') {
        card.append(el('p', '', `Your answer: ${chosen === null ? 'None' : `${LETTERS[chosen]}. ${item.options[chosen]}`}`));
      }
      card.append(el('p', '', `Correct answer: ${LETTERS[item.correct]}. ${item.options[item.correct]}`));
      card.append(el('p', 'cbt-why', item.why));
      list.append(card);
    });
  }

  let lastRun = null;

  $('retryBtn').addEventListener('click', () => {
    if (!lastRun) return showSetup();
    startTest(lastRun.subject, lastRun.count, lastRun.minutes, lastRun.level);
  });

  $('newBtn').addEventListener('click', showSetup);

  // ── Setup screen ──
  function showSetup() {
    showScreen('setup');
    checkForSavedSession();
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const subject = subjectSelect.value;
    const level = levelSelect.value;
    if (!BANK[subject]) return;

    try {
      localStorage.setItem(LEVEL_KEY, level);
    } catch (error) {
      /* ignore */
    }

    const count = Math.min(Number(countSelect.value), BANK[subject].length);
    const minutes = Number(timeSelect.value);
    startTest(subject, count, minutes, level);
  });

  function checkForSavedSession() {
    resumeCard.hidden = true;
    const saved = readJSON(SESSION_KEY, null);
    if (!saved || !Array.isArray(saved.items) || !saved.items.length) return false;

    session = saved;

    // Time ran out while the person was away: finish and show the result.
    if (session.endsAt && Date.now() >= session.endsAt) {
      finishTest(true);
      return true;
    }

    const answered = session.answers.filter((a) => a !== null).length;
    resumeText.textContent = `You have an unfinished ${session.subject} test (${answered} of ${session.items.length} answered). Pick up where you left off?`;
    resumeCard.hidden = false;
    session = null;
    return false;
  }

  $('resumeBtn').addEventListener('click', () => {
    const saved = readJSON(SESSION_KEY, null);
    if (!saved) return;
    session = saved;
    resumeCard.hidden = true;
    beginTest();
  });

  $('discardBtn').addEventListener('click', () => {
    removeKey(SESSION_KEY);
    resumeCard.hidden = true;
  });

  // Remembered class level
  try {
    const savedLevel = localStorage.getItem(LEVEL_KEY);
    if (savedLevel !== null) levelSelect.value = savedLevel;
  } catch (error) {
    /* ignore */
  }

  showScreen('setup');
  checkForSavedSession();
});