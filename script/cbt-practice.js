const STORAGE = {
  SESSION: 'msp_cbt_session',
  HISTORY: 'msp_cbt_history',
  SETTINGS: 'msp_cbt_settings',
  USERNAME: 'msp_cbt_username',
  SAVED: 'msp_cbt_saved',
};

const LETTERS = ['A', 'B', 'C', 'D', 'E'];
const MIN_POOL = 5;
const HISTORY_LIMIT = 30;
const REVIEW_LIMIT = 12;

const SAMPLE_BANK = {
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
  Mathematics: [
    { q: 'Simplify 3/4 + 2/3.', o: ['5/7', '17/12', '1/2', '1 1/12'], a: 1, e: '3/4 + 2/3 = 9/12 + 8/12 = 17/12.' },
    { q: 'Solve for x: 2x + 5 = 17.', o: ['4', '6', '11', '12'], a: 1, e: '2x = 17 − 5 = 12, so x = 6.' },
    { q: 'What is 15% of 200?', o: ['15', '20', '30', '45'], a: 2, e: '15/100 × 200 = 30.' },
    { q: 'Find the value of 2³ × 2².', o: ['10', '25', '32', '64'], a: 2, e: 'Add the powers: 2³ × 2² = 2⁵ = 32.' },
    { q: 'The length of a rectangle is 8 cm and its width is 5 cm. What is its perimeter?', o: ['13 cm', '26 cm', '40 cm', '52 cm'], a: 1, e: 'Perimeter = 2(8 + 5) = 26 cm.' },
    { q: 'Find √144.', o: ['10', '11', '12', '14'], a: 2, e: '12 × 12 = 144.' },
    { q: 'A triangle has a base of 10 cm and a height of 6 cm. What is its area?', o: ['16 cm²', '30 cm²', '60 cm²', '120 cm²'], a: 1, e: 'Area = 1/2 × base × height = 30 cm².' },
    { q: 'Express 0.25 as a fraction in its lowest terms.', o: ['1/2', '1/4', '2/5', '25/10'], a: 1, e: '0.25 = 25/100 = 1/4.' },
    { q: 'If y = 3x − 2 and x = 4, find y.', o: ['6', '10', '12', '14'], a: 1, e: 'y = 3(4) − 2 = 10.' },
    { q: 'What is the sum of interior angles of a triangle?', o: ['90°', '180°', '270°', '360°'], a: 1, e: 'The three angles of a triangle add up to 180°.' }
  ],
  Biology: [
    { q: 'Which part of the cell is called the powerhouse of the cell?', o: ['Nucleus', 'Mitochondrion', 'Ribosome', 'Vacuole'], a: 1, e: 'Mitochondria release energy from food during respiration.' },
    { q: 'What is the process by which green plants make their food?', o: ['Respiration', 'Photosynthesis', 'Transpiration', 'Digestion'], a: 1, e: 'Green plants make food by photosynthesis.' },
    { q: 'Which blood group is known as the universal donor?', o: ['A', 'B', 'AB', 'O'], a: 3, e: 'Group O red cells have no A or B antigens.' },
    { q: 'Which organ filters the blood to form urine?', o: ['Liver', 'Kidney', 'Lung', 'Heart'], a: 1, e: 'Kidneys filter blood and form urine.' },
    { q: 'Which gas is released by plants during photosynthesis?', o: ['Carbon dioxide', 'Nitrogen', 'Oxygen', 'Hydrogen'], a: 2, e: 'Plants release oxygen as a by-product of photosynthesis.' },
    { q: 'What is the basic unit of heredity?', o: ['Cell', 'Gene', 'Tissue', 'Enzyme'], a: 1, e: 'Genes carry inherited information.' },
    { q: 'A lack of which vitamin causes scurvy?', o: ['Vitamin A', 'Vitamin B', 'Vitamin C', 'Vitamin D'], a: 2, e: 'Scurvy is caused by vitamin C deficiency.' },
    { q: 'Which part of a flower develops into the fruit?', o: ['Anther', 'Stigma', 'Ovary', 'Petal'], a: 2, e: 'After fertilisation, the ovary develops into the fruit.' },
    { q: 'Which mosquito transmits the malaria parasite?', o: ['Culex', 'Aedes', 'Anopheles', 'Tsetse fly'], a: 2, e: 'The female Anopheles mosquito carries malaria.' },
    { q: 'Which enzyme in saliva begins the digestion of starch?', o: ['Pepsin', 'Lipase', 'Amylase', 'Trypsin'], a: 2, e: 'Salivary amylase begins starch digestion.' }
  ],
  Chemistry: [
    { q: 'What is the chemical symbol for sodium?', o: ['S', 'So', 'Na', 'N'], a: 2, e: 'Na comes from the Latin name natrium.' },
    { q: 'What is the pH of a neutral solution at room temperature?', o: ['0', '7', '10', '14'], a: 1, e: 'A pH of 7 is neutral.' },
    { q: 'Which gas is given off when zinc reacts with dilute hydrochloric acid?', o: ['Oxygen', 'Hydrogen', 'Chlorine', 'Carbon dioxide'], a: 1, e: 'Metals react with acids to form hydrogen gas.' },
    { q: 'What is the atomic number of carbon?', o: ['4', '6', '8', '12'], a: 1, e: 'Carbon has 6 protons.' },
    { q: 'Which of these is a noble gas?', o: ['Nitrogen', 'Oxygen', 'Argon', 'Chlorine'], a: 2, e: 'Argon belongs to Group 18.' },
    { q: 'Which of these is the formula of sulphuric acid?', o: ['HNO3', 'H2SO4', 'HCl', 'H3PO4'], a: 1, e: 'Sulphuric acid is H2SO4.' },
    { q: 'Which method is best for obtaining pure water from salt water?', o: ['Filtration', 'Distillation', 'Decantation', 'Sublimation'], a: 1, e: 'Distillation removes salt and condenses water.' },
    { q: 'What type of bond is found in sodium chloride?', o: ['Covalent', 'Ionic', 'Metallic', 'Hydrogen'], a: 1, e: 'Sodium transfers an electron to chlorine to form an ionic bond.' },
    { q: 'Rusting of iron needs the presence of:', o: ['oxygen only', 'water only', 'oxygen and water', 'nitrogen and water'], a: 2, e: 'Iron rusts when exposed to both oxygen and water.' },
    { q: 'What is the main component of natural gas?', o: ['Ethane', 'Methane', 'Propane', 'Butane'], a: 1, e: 'Natural gas is mostly methane.' }
  ],
  Physics: [
    { q: 'What is the SI unit of force?', o: ['Joule', 'Watt', 'Newton', 'Pascal'], a: 2, e: 'Force is measured in newtons.' },
    { q: 'A car covers 120 km in 2 hours. What is its average speed?', o: ['30 km/h', '60 km/h', '120 km/h', '240 km/h'], a: 1, e: 'Speed = distance ÷ time = 60 km/h.' },
    { q: 'Which of these is a vector quantity?', o: ['Speed', 'Mass', 'Velocity', 'Temperature'], a: 2, e: 'Velocity has both magnitude and direction.' },
    { q: 'What is the unit of electrical resistance?', o: ['Volt', 'Ampere', 'Ohm', 'Watt'], a: 2, e: 'Resistance is measured in ohms.' },
    { q: 'The acceleration due to gravity on Earth is about:', o: ['0.98 m/s²', '9.8 m/s²', '98 m/s²', '980 m/s²'], a: 1, e: 'g is about 9.8 m/s².' },
    { q: 'Which of these is a good conductor of electricity?', o: ['Rubber', 'Copper', 'Glass', 'Wood'], a: 1, e: 'Copper has free electrons that conduct electricity.' },
    { q: 'Energy due to position is called:', o: ['kinetic energy', 'potential energy', 'heat energy', 'sound energy'], a: 1, e: 'Potential energy is stored energy due to position.' },
    { q: 'Light travels fastest in:', o: ['water', 'glass', 'a vacuum', 'diamond'], a: 2, e: 'Light travels fastest in a vacuum.' },
    { q: 'Which formula gives pressure?', o: ['Force × area', 'Force ÷ area', 'Area ÷ force', 'Mass × velocity'], a: 1, e: 'Pressure = force ÷ area.' },
    { q: 'Which instrument measures atmospheric pressure?', o: ['Thermometer', 'Barometer', 'Ammeter', 'Hygrometer'], a: 1, e: 'A barometer measures atmospheric pressure.' }
  ],
  Government: [
    { q: 'The basic law of a country is called the:', o: ['Constitution', 'Bill of rights', 'Judiciary', 'Parliament'], a: 0, e: 'The constitution is the supreme law.' },
    { q: 'Who is the head of the executive arm of government in a presidential system?', o: ['Speaker', 'Prime Minister', 'President', 'Chief Justice'], a: 2, e: 'The president leads the executive.' },
    { q: 'Separation of powers means:', o: ['Judges control the army', 'Power is shared among three arms of government', 'The government controls the media', 'One arm can do the work of all others'], a: 1, e: 'The legislature, executive, and judiciary are separate.' },
    { q: 'Citizenship acquired by birth is called:', o: ['Dual citizenship', 'By descent', 'By birth', 'Naturalisation'], a: 2, e: 'By birth means citizenship by birth.' },
    { q: 'The highest court in Nigeria is the:', o: ['High Court', 'Court of Appeal', 'Supreme Court', 'Customary Court'], a: 2, e: 'The Supreme Court is the highest court.' },
    { q: 'A system in which citizens vote directly for leaders is called:', o: ['Indirect democracy', 'Representative democracy', 'Direct democracy', 'Monarchy'], a: 2, e: 'Direct democracy allows citizens to vote directly.' },
    { q: 'The legislature is responsible for:', o: ['Implementing laws', 'Enforcing court decisions', 'Making laws', 'Appointing judges'], a: 2, e: 'The legislature makes laws.' },
    { q: 'A constitution that can be easily amended is called:', o: ['Rigid', 'Flexible', 'Written', 'Unwritten'], a: 1, e: 'Flexible constitutions are easier to amend.' },
    { q: 'The principle that all persons are equal before the law is called:', o: ['Rule of law', 'Political equality', 'Checks and balances', 'Sovereignty'], a: 0, e: 'The rule of law ensures no one is above the law.' },
    { q: 'A government formed by the party with the largest number of seats is usually called a:', o: ['Coalition government', 'Minority government', 'Majority government', 'Military government'], a: 2, e: 'The majority party usually forms the government.' }
  ]
};

const state = {
  subjectCatalog: [],
  username: '',
  selectedSubjects: ['English Language'],
  questionCount: 10,
  year: 'Any year',
  duration: 'auto',
  mode: 'practice',
  shuffleQuestions: true,
  shuffleOptions: true,
  session: null,
  timerId: null,
  lastRun: null,
  activeScreen: 'setup',
  savedQuestions: [],
};

const els = {
  settingsScreen: document.getElementById('settingsScreen'),
  testScreen: document.getElementById('testScreen'),
  resultsScreen: document.getElementById('resultsScreen'),
  savedScreen: document.getElementById('savedScreen'),
  settingsForm: document.getElementById('settingsForm'),
  usernameInput: document.getElementById('usernameInput'),
  subjectPicker: document.getElementById('subjectPicker'),
  questionCountSelect: document.getElementById('questionCountSelect'),
  examYearSelect: document.getElementById('examYearSelect'),
  durationSelect: document.getElementById('durationSelect'),
  settingsMessage: document.getElementById('settingsMessage'),
  startBtn: document.getElementById('startBtn'),
  resumeCard: document.getElementById('resumeCard'),
  resumeText: document.getElementById('resumeText'),
  resumeBtn: document.getElementById('resumeBtn'),
  discardBtn: document.getElementById('discardBtn'),
  recentResultsList: document.getElementById('recentResultsList'),
  testUsername: document.getElementById('testUsername'),
  testModePill: document.getElementById('testModePill'),
  timerBox: document.getElementById('timerBox'),
  timerDisplay: document.getElementById('timerDisplay'),
  calcBtn: document.getElementById('calcBtn'),
  quitBtn: document.getElementById('quitBtn'),
  submitBtn: document.getElementById('submitBtn'),
  lockNotice: document.getElementById('lockNotice'),
  subjectTabs: document.getElementById('subjectTabs'),
  questionMeta: document.getElementById('questionMeta'),
  questionText: document.getElementById('questionText'),
  answerOptions: document.getElementById('answerOptions'),
  answerFeedback: document.getElementById('answerFeedback'),
  prevBtn: document.getElementById('prevBtn'),
  clearBtn: document.getElementById('clearBtn'),
  saveBtn: document.getElementById('saveBtn'),
  checkBtn: document.getElementById('checkBtn'),
  nextBtn: document.getElementById('nextBtn'),
  navigatorSubject: document.getElementById('navigatorSubject'),
  navigatorStatus: document.getElementById('navigatorStatus'),
  navigatorGrid: document.getElementById('navigatorGrid'),
  resultsHeading: document.getElementById('resultsHeading'),
  resultsNotice: document.getElementById('resultsNotice'),
  scoreValue: document.getElementById('scoreValue'),
  scorePercent: document.getElementById('scorePercent'),
  scoreMessage: document.getElementById('scoreMessage'),
  statCorrect: document.getElementById('statCorrect'),
  statIncorrect: document.getElementById('statIncorrect'),
  statUnanswered: document.getElementById('statUnanswered'),
  statTime: document.getElementById('statTime'),
  subjectSummary: document.getElementById('subjectSummary'),
  reviewFilterSelect: document.getElementById('reviewFilterSelect'),
  reviewSubjectSelect: document.getElementById('reviewSubjectSelect'),
  reviewList: document.getElementById('reviewList'),
  savedQuestionsList: document.getElementById('savedQuestionsList'),
  retryBtn: document.getElementById('retryBtn'),
  newTestBtn: document.getElementById('newTestBtn'),
  savedViewBtn: document.getElementById('savedViewBtn'),
  savedBackBtn: document.getElementById('savedBackBtn'),
  submitDialog: document.getElementById('submitDialog'),
  submitSummary: document.getElementById('submitSummary'),
  submitCancel: document.getElementById('submitCancel'),
  submitConfirm: document.getElementById('submitConfirm'),
  quitDialog: document.getElementById('quitDialog'),
  quitCancel: document.getElementById('quitCancel'),
  quitConfirm: document.getElementById('quitConfirm'),
  calculatorDialog: document.getElementById('calculatorDialog'),
  calculatorClose: document.getElementById('calculatorClose'),
  calcDisplay: document.getElementById('calcDisplay'),
};

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // Ignore storage errors.
  }
}

function removeStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    // Ignore storage errors.
  }
}

function formatTime(totalSeconds) {
  const safe = Math.max(0, Number(totalSeconds) || 0);
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function shuffleArray(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function keepOrderGuard(options) {
  return options.some((text) => /(all of the above|none of the above|both|neither|above|below)/i.test(text));
}

function safeFetchJSON(path) {
  return fetch(path, { cache: 'no-cache' })
    .then((response) => {
      if (!response.ok) return null;
      return response.json();
    })
    .catch(() => null);
}

function getSelectedSubjects() {
  return state.selectedSubjects.filter(Boolean);
}

function calculateAutoDuration(questionTotal) {
  const totalSeconds = (questionTotal || 1) * 40;
  return Math.max(10, Math.ceil(totalSeconds / 60));
}

async function loadJambSubjects() {
  const indexInfo = await safeFetchJSON('data/questions/index.json');
  if (!indexInfo || !Array.isArray(indexInfo.subjects)) return [];

  const valid = [];
  for (const item of indexInfo.subjects) {
    if (!item || !item.ready || !item.key) continue;

    const questions = await safeFetchJSON(`data/questions/${item.key}.json`);
    const keys = await safeFetchJSON(`data/keys/${item.key}.json`);
    if (!questions || !Array.isArray(questions.questions) || !keys) continue;

    const hasValidKey = questions.questions.some((question) => {
      if (!question || !Array.isArray(question.o)) return false;
      const keyValue = keys[question.id];
      return keyValue && LETTERS.includes(keyValue);
    });

    if (hasValidKey) {
      valid.push({
        key: item.key,
        label: item.label || item.key,
      });
    }
  }

  return valid;
}

function sampleEntries(subjectName) {
  return (SAMPLE_BANK[subjectName] || []).map((item) => ({
    q: item.q,
    o: item.o,
    a: item.a,
    e: item.e || '',
    src: 'Sample',
    year: 'Any year',
  }));
}

function reorderAnswerIndex(originalOptions, reorderedOptions, originalIndex) {
  return reorderedOptions.indexOf(originalOptions[originalIndex]);
}

function buildQuestionItem(item, shuffleOptionsFlag) {
  const options = [...item.o];
  const shouldKeepOrder = keepOrderGuard(options);
  const finalOrder = shouldKeepOrder || !shuffleOptionsFlag
    ? options.map((_, index) => index)
    : shuffleArray(options.map((_, index) => index));

  const reordered = finalOrder.map((orderIndex) => options[orderIndex]);
  return {
    question: item.q,
    options: reordered,
    correctIndex: reorderAnswerIndex(options, reordered, item.a),
    explanation: item.e || '',
    source: item.src || 'Sample',
    year: item.year || 'Any year',
  };
}

function getQuestionPool(subjectName, count, year, shuffleQuestions, shuffleOptions) {
  const sample = sampleEntries(subjectName);
  if (sample.length >= MIN_POOL) {
    let pool = [...sample];
    if (shuffleQuestions) pool = shuffleArray(pool);
    if (count < pool.length) pool = pool.slice(0, count);
    return pool.map((item) => buildQuestionItem({ ...item, src: 'Sample', year }, shuffleOptions));
  }

  return [];
}

async function loadQuestionBankForSubject(subjectName, count, year, shuffleQuestions, shuffleOptions) {
  const samplePool = getQuestionPool(subjectName, count, year, shuffleQuestions, shuffleOptions);
  if (samplePool.length) return samplePool;

  const subject = state.subjectCatalog.find((entry) => entry.label === subjectName && entry.type === 'jamb');
  if (!subject) return [];

  const questions = await safeFetchJSON(`data/questions/${subject.key}.json`);
  const keys = await safeFetchJSON(`data/keys/${subject.key}.json`);
  if (!questions || !Array.isArray(questions.questions) || !keys) return [];

  const bank = questions.questions
    .map((question) => {
      const answerKey = keys[question.id];
      const answerIndex = LETTERS.indexOf(answerKey || '');
      if (answerIndex < 0 || !Array.isArray(question.o) || !question.o.length) return null;
      return {
        q: question.q,
        o: question.o,
        a: answerIndex,
        e: '',
        src: `JAMB ${question.y || year}`,
        year: question.y || year,
      };
    })
    .filter(Boolean);

  let pool = [...bank];
  if (shuffleQuestions) pool = shuffleArray(pool);
  if (count < pool.length) pool = pool.slice(0, count);

  return pool.map((item) => buildQuestionItem(item, shuffleOptions));
}

function setScreen(name) {
  state.activeScreen = name;
  const map = {
    setup: els.settingsScreen,
    test: els.testScreen,
    results: els.resultsScreen,
    saved: els.savedScreen,
  };

  Object.entries(map).forEach(([screenName, node]) => {
    node.hidden = screenName !== name;
  });

  document.body.classList.toggle('cbt-active', name === 'test');
}

function persistSettings() {
  writeStorage(STORAGE.SETTINGS, {
    selectedSubjects: getSelectedSubjects(),
    questionCount: state.questionCount,
    year: state.year,
    duration: state.duration,
    mode: state.mode,
    shuffleQuestions: state.shuffleQuestions,
    shuffleOptions: state.shuffleOptions,
  });
  writeStorage(STORAGE.USERNAME, state.username);
}

function hydrateSettings() {
  const saved = readStorage(STORAGE.SETTINGS, null);
  if (saved) {
    state.selectedSubjects = Array.isArray(saved.selectedSubjects) && saved.selectedSubjects.length ? saved.selectedSubjects : ['English Language'];
    state.questionCount = Number(saved.questionCount) || 10;
    state.year = saved.year || 'Any year';
    state.duration = saved.duration || 'auto';
    state.mode = saved.mode === 'exam' ? 'exam' : 'practice';
    state.shuffleQuestions = saved.shuffleQuestions !== false;
    state.shuffleOptions = saved.shuffleOptions !== false;
  }

  state.username = readStorage(STORAGE.USERNAME, '');
  els.usernameInput.value = state.username;
  els.questionCountSelect.value = String(state.questionCount);
  els.examYearSelect.value = state.year;
  els.durationSelect.value = state.duration;
  document.querySelector(`input[name="examMode"][value="${state.mode}"]`).checked = true;
  document.getElementById('shuffleQuestionsToggle').checked = state.shuffleQuestions;
  document.getElementById('shuffleOptionsToggle').checked = state.shuffleOptions;
}

function updateModeUI() {
  const mode = state.mode === 'exam' ? 'exam' : 'practice';
  const zeroOption = document.querySelector('#durationSelect option[value="0"]');
  if (zeroOption) zeroOption.disabled = mode === 'exam';
  if (mode === 'exam' && els.durationSelect.value === '0') {
    els.durationSelect.value = 'auto';
    state.duration = 'auto';
  }
}

function renderSubjectPicker() {
  const english = { key: 'English Language', label: 'English Language', type: 'sample', note: 'Compulsory', locked: true };
  const sampleItems = Object.keys(SAMPLE_BANK)
    .filter((subjectName) => subjectName !== 'English Language')
    .map((subjectName) => ({
      key: subjectName,
      label: subjectName,
      type: 'sample',
      note: 'Sample',
      locked: false,
    }));

  const cat = [english, ...sampleItems];
  state.subjectCatalog = cat;

  els.subjectPicker.innerHTML = '';
  cat.forEach((subject) => {
    const label = document.createElement('label');
    label.className = 'subject-choice';
    if (subject.key === 'English Language') label.classList.add('is-english');
    if (subject.locked) label.classList.add('is-disabled');

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.value = subject.key;
    input.checked = state.selectedSubjects.includes(subject.key) || subject.key === 'English Language';
    input.disabled = subject.key === 'English Language';

    const text = document.createElement('span');
    text.innerHTML = `<strong>${subject.label}</strong><small>${subject.note}</small>`;

    label.appendChild(input);
    label.appendChild(text);
    els.subjectPicker.appendChild(label);
  });

  updateSubjectSelectionUI();
}

async function refreshJambOptions() {
  const jambSubjects = await loadJambSubjects();
  const seen = new Set(state.subjectCatalog.map((item) => item.key));
  jambSubjects.forEach((subject) => {
    if (!seen.has(subject.label)) {
      state.subjectCatalog.push({ key: subject.label, label: subject.label, type: 'jamb', note: 'JAMB', locked: false });
      seen.add(subject.label);
    }
  });

  const existing = [...els.subjectPicker.querySelectorAll('input[type="checkbox"]')].map((input) => input.value);
  const unique = [...new Set([...existing, ...jambSubjects.map((item) => item.label)])];
  const subjectOptions = [...state.subjectCatalog.filter((subject) => subject.key === 'English Language' || subject.type === 'sample' || subject.type === 'jamb')];

  els.subjectPicker.innerHTML = '';
  subjectOptions.forEach((subject) => {
    const label = document.createElement('label');
    label.className = 'subject-choice';
    if (subject.key === 'English Language') label.classList.add('is-english');
    if (subject.type === 'sample' || subject.key === 'English Language') {
      label.classList.add('is-variant');
    }

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.value = subject.key;
    input.checked = state.selectedSubjects.includes(subject.key) || subject.key === 'English Language';
    input.disabled = subject.key === 'English Language';

    const text = document.createElement('span');
    text.innerHTML = `<strong>${subject.label}</strong><small>${subject.note}</small>`;

    label.appendChild(input);
    label.appendChild(text);
    els.subjectPicker.appendChild(label);
  });

  updateSubjectSelectionUI();
}

function updateSubjectSelectionUI() {
  const checkboxes = els.subjectPicker.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((input) => {
    if (input.value === 'English Language') {
      input.checked = true;
      input.disabled = true;
    } else {
      input.checked = state.selectedSubjects.includes(input.value);
    }
  });

  const valid = state.selectedSubjects.includes('English Language') && state.selectedSubjects.length >= 2;
  els.startBtn.disabled = !valid;
  els.settingsMessage.hidden = valid;
  if (!valid) {
    els.settingsMessage.textContent = 'Select English Language and at least one more subject with available questions to begin.';
  }
}

function populateRecentResults() {
  const history = readStorage(STORAGE.HISTORY, []);
  const items = Array.isArray(history) ? history.slice(-5).reverse() : [];

  if (!items.length) {
    els.recentResultsList.innerHTML = '<li><div><strong>No recent results</strong><span>Complete a test to save your score.</span></div></li>';
    return;
  }

  els.recentResultsList.innerHTML = items.map((item) => `
    <li>
      <div>
        <strong>${item.subject || 'Mixed subjects'}</strong>
        <span>${new Date(item.date).toLocaleDateString()}</span>
      </div>
      <div>
        <strong>${item.correct}/${item.total}</strong>
        <span>${item.percent}%</span>
      </div>
    </li>
  `).join('');
}

function isEnglishComplete() {
  if (!state.session) return true;
  const english = state.session.subjects.find((subject) => subject.name === 'English Language');
  if (!english) return true;
  return english.questions.every((question, index) => {
    return english.answers[index] !== null || (english.visited && english.visited.has(index));
  });
}

function getCurrentSubject() {
  if (!state.session || !state.session.subjects.length) return null;
  return state.session.subjects[state.currentSubjectIndex] || state.session.subjects[0];
}

function renderSubjectTabs() {
  if (!state.session) return;
  const englishComplete = isEnglishComplete();
  const container = els.subjectTabs;
  container.innerHTML = '';

  state.session.subjects.forEach((subject, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'subject-tab';
    if (index === state.currentSubjectIndex) button.classList.add('is-active');

    const answered = subject.answers.filter((value) => value !== null).length;
    button.innerHTML = `${subject.name} <span class="subject-tab-badge">${answered}/${subject.questions.length}</span>`;

    const isEnglish = subject.name === 'English Language';
    const locked = !isEnglish && !englishComplete;
    if (locked) button.classList.add('is-locked');
    button.disabled = locked;

    button.addEventListener('click', () => {
      if (locked) {
        els.lockNotice.hidden = false;
        els.lockNotice.textContent = 'Finish English Language to unlock other subjects.';
        return;
      }
      els.lockNotice.hidden = true;
      state.currentSubjectIndex = index;
      state.currentQuestionIndex = 0;
      renderQuestionView();
    });

    container.appendChild(button);
  });

  const hasMore = state.session.subjects.some((subject) => subject.name !== 'English Language');
  els.lockNotice.hidden = englishComplete || !hasMore;
  if (hasMore && !englishComplete) {
    els.lockNotice.textContent = 'Finish English Language to unlock other subjects.';
  }
}

function renderNavigator() {
  const subject = getCurrentSubject();
  if (!subject) return;

  els.navigatorSubject.textContent = subject.name;
  const answered = subject.answers.filter((value) => value !== null).length;
  els.navigatorStatus.textContent = `${answered} of ${subject.questions.length}`;
  els.navigatorGrid.innerHTML = '';

  subject.questions.forEach((_, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'navigator-btn';
    button.textContent = String(index + 1);
    button.setAttribute('aria-label', `Question ${index + 1}`);
    if (index === state.currentQuestionIndex) button.classList.add('is-current');
    if (subject.answers[index] !== null) button.classList.add('is-answered');
    if (subject.flagged && subject.flagged[index]) button.classList.add('is-flagged');
    button.addEventListener('click', () => {
      state.currentQuestionIndex = index;
      renderQuestionView();
    });
    els.navigatorGrid.appendChild(button);
  });
}

function persistSession() {
  if (!state.session) return;
  writeStorage(STORAGE.SESSION, {
    ...state.session,
    currentSubjectIndex: state.currentSubjectIndex,
    currentQuestionIndex: state.currentQuestionIndex,
  });
}

function updateTimerDisplay() {
  const timerBox = els.timerBox;
  const timerDisplay = els.timerDisplay;
  if (!state.session || !state.session.endsAt) {
    timerDisplay.textContent = 'No timer';
    timerBox.classList.remove('is-warning', 'is-low');
    return;
  }

  const remaining = Math.max(0, Math.ceil((state.session.endsAt - Date.now()) / 1000));
  timerDisplay.textContent = formatTime(remaining);
  timerBox.classList.toggle('is-warning', remaining <= 60 && remaining > 30);
  timerBox.classList.toggle('is-low', remaining <= 30);
}

function startTimer() {
  clearInterval(state.timerId);
  if (!state.session || !state.session.endsAt) {
    els.timerDisplay.textContent = 'No timer';
    return;
  }

  updateTimerDisplay();
  state.timerId = setInterval(() => {
    updateTimerDisplay();
    if (!state.session || !state.session.endsAt) return;
    if (Date.now() >= state.session.endsAt) {
      clearInterval(state.timerId);
      finishTest(true);
    }
  }, 500);
}

function renderQuestionView() {
  const subject = getCurrentSubject();
  if (!subject || !subject.questions.length) return;

  const question = subject.questions[state.currentQuestionIndex];
  if (!question) return;

  if (!subject.visited) subject.visited = new Set();
  subject.visited.add(state.currentQuestionIndex);

  els.questionMeta.textContent = `Question ${state.currentQuestionIndex + 1} of ${subject.questions.length} · ${subject.name} · ${question.source}`;
  els.questionText.textContent = question.question;

  els.answerOptions.innerHTML = '';
  question.options.forEach((optionText, optionIndex) => {
    const label = document.createElement('label');
    label.className = 'answer-option';
    if (subject.answers[state.currentQuestionIndex] === optionIndex) label.classList.add('is-selected');

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'answerChoice';
    input.value = String(optionIndex);
    input.checked = subject.answers[state.currentQuestionIndex] === optionIndex;
    input.addEventListener('change', (event) => {
      if (!event.target.checked) return;
      subject.answers[state.currentQuestionIndex] = Number(event.target.value);
      persistSession();
      renderNavigator();
      renderQuestionView();
    });

    const letter = document.createElement('span');
    letter.className = 'answer-letter';
    letter.textContent = LETTERS[optionIndex] || String(optionIndex + 1);

    const text = document.createElement('span');
    text.textContent = optionText;

    label.appendChild(input);
    label.appendChild(letter);
    label.appendChild(text);
    els.answerOptions.appendChild(label);
  });

  const showFeedback = state.session.mode === 'practice' && subject.revealed && subject.revealed[state.currentQuestionIndex];
  if (!showFeedback) {
    els.answerFeedback.hidden = true;
    els.answerFeedback.className = 'answer-feedback';
    els.answerFeedback.textContent = '';
  } else {
    const selected = subject.answers[state.currentQuestionIndex];
    const correctIndex = question.correctIndex;
    const correctText = question.options[correctIndex] || '';
    const isCorrect = selected === correctIndex;
    els.answerFeedback.hidden = false;
    els.answerFeedback.className = `answer-feedback ${isCorrect ? 'is-correct' : 'is-wrong'}`;
    els.answerFeedback.innerHTML = `<strong>${isCorrect ? 'Correct.' : 'Not quite.'}</strong> The correct answer is <strong>${LETTERS[correctIndex]}</strong> — ${correctText}. ${question.explanation || ''}`;
  }

  els.checkBtn.hidden = state.session.mode !== 'practice';
  els.saveBtn.textContent = subject.savedQuestions.includes(state.currentQuestionIndex) ? 'Saved' : 'Save question';
  els.prevBtn.disabled = state.currentQuestionIndex === 0;
  els.nextBtn.textContent = state.currentQuestionIndex === subject.questions.length - 1 ? 'Finish' : 'Next';

  renderSubjectTabs();
  renderNavigator();
}

function revealCurrentAnswer() {
  const subject = getCurrentSubject();
  if (!subject) return;
  if (!subject.revealed) subject.revealed = [];
  subject.revealed[state.currentQuestionIndex] = true;
  renderQuestionView();
  persistSession();
}

function clearCurrentAnswer() {
  const subject = getCurrentSubject();
  if (!subject) return;
  subject.answers[state.currentQuestionIndex] = null;
  renderQuestionView();
  persistSession();
}

function saveCurrentQuestion() {
  const subject = getCurrentSubject();
  if (!subject) return;
  const currentIndex = state.currentQuestionIndex;
  if (!subject.savedQuestions.includes(currentIndex)) {
    subject.savedQuestions.push(currentIndex);
  }

  const saved = readStorage(STORAGE.SAVED, []);
  const list = Array.isArray(saved) ? saved : [];
  const question = subject.questions[currentIndex];
  const exists = list.some((entry) => entry.subject === subject.name && entry.question === question.question);
  if (!exists) {
    list.push({
      subject: subject.name,
      question: question.question,
      source: question.source,
    });
    writeStorage(STORAGE.SAVED, list.slice(-100));
  }

  persistSession();
  renderQuestionView();
  showSavedQuestions();
}

function goToPreviousQuestion() {
  if (state.currentQuestionIndex > 0) {
    state.currentQuestionIndex -= 1;
    renderQuestionView();
  }
}

function goToNextQuestion() {
  const subject = getCurrentSubject();
  if (!subject) return;

  if (state.currentQuestionIndex < subject.questions.length - 1) {
    state.currentQuestionIndex += 1;
    renderQuestionView();
    return;
  }

  const currentIndex = state.currentSubjectIndex;
  const nextSubjectIndex = state.session.subjects.findIndex((_, index) => index > currentIndex);
  if (nextSubjectIndex !== -1) {
    state.currentSubjectIndex = nextSubjectIndex;
    state.currentQuestionIndex = 0;
    renderQuestionView();
    return;
  }

  finishTest(false);
}

function handleKeyboardShortcuts(event) {
  if (state.activeScreen !== 'test') return;
  if (event.target && ['INPUT', 'SELECT', 'TEXTAREA'].includes(event.target.tagName)) return;

  const key = (event.key || '').toLowerCase();
  if (/[a-e]/.test(key)) {
    const letterIndex = LETTERS.findIndex((letter) => letter.toLowerCase() === key);
    if (letterIndex >= 0) {
      const subject = getCurrentSubject();
      if (subject) {
        subject.answers[state.currentQuestionIndex] = letterIndex;
        renderQuestionView();
        persistSession();
      }
    }
    return;
  }

  if (key === 'n') goToNextQuestion();
  if (key === 'p') goToPreviousQuestion();
}

async function buildSessionFromSettings() {
  const selected = getSelectedSubjects();
  const ordered = ['English Language', ...selected.filter((item) => item !== 'English Language')];
  const questionCount = Number(state.questionCount) || 10;
  const mode = state.mode === 'exam' ? 'exam' : 'practice';

  const sessionSubjects = await Promise.all(ordered.map(async (subjectName) => {
    const questions = await loadQuestionBankForSubject(subjectName, questionCount, state.year, state.shuffleQuestions, state.shuffleOptions);
    return {
      name: subjectName,
      questions,
      answers: Array(questions.length).fill(null),
      flagged: Array(questions.length).fill(false),
      revealed: Array(questions.length).fill(false),
      savedQuestions: [],
      visited: new Set(),
    };
  }));

  let durationSeconds = null;
  if (state.duration === '0') {
    durationSeconds = null;
  } else if (state.duration === 'auto') {
    durationSeconds = calculateAutoDuration(questionCount * ordered.length) * 60;
  } else {
    durationSeconds = Number(state.duration) * 60;
  }

  state.session = {
    mode,
    username: state.username || 'Candidate',
    subjects: sessionSubjects,
    startsAt: Date.now(),
    endsAt: durationSeconds ? Date.now() + durationSeconds * 1000 : null,
    currentSubjectIndex: 0,
    currentQuestionIndex: 0,
  };

  state.currentQuestionIndex = 0;
  state.currentSubjectIndex = 0;
  persistSession();
  return state.session;
}

function showTestScreen() {
  if (!state.session) return;
  els.testUsername.textContent = state.session.username || 'Candidate';
  els.testModePill.textContent = state.session.mode === 'exam' ? 'Exam' : 'Practice';
  setScreen('test');
  renderQuestionView();
  startTimer();
  persistSession();
}

function showSavedQuestions() {
  const saved = readStorage(STORAGE.SAVED, []);
  if (!Array.isArray(saved) || !saved.length) {
    els.savedQuestionsList.innerHTML = '<div class="saved-item"><h3>No saved questions</h3><p>Your saved review questions will appear here.</p></div>';
    return;
  }

  els.savedQuestionsList.innerHTML = saved.map((entry) => `
    <article class="saved-item">
      <h3><strong>${entry.subject}</strong></h3>
      <p>${entry.question}</p>
    </article>
  `).join('');
}

function renderReviewList() {
  const reviewEntries = state.lastRun && Array.isArray(state.lastRun.reviewEntries) ? state.lastRun.reviewEntries : [];
  const filter = els.reviewFilterSelect.value;
  const subjectFilter = els.reviewSubjectSelect.value;

  let filtered = reviewEntries.filter((item) => {
    if (subjectFilter !== 'all' && item.subject !== subjectFilter) return false;
    if (filter === 'incorrect' && item.status !== 'incorrect') return false;
    if (filter === 'unanswered' && item.status !== 'unanswered') return false;
    if (filter === 'saved' && !item.saved) return false;
    return true;
  });

  if (filter === 'all' && subjectFilter === 'all') {
    filtered = reviewEntries;
  }

  if (!filtered.length) {
    els.reviewList.innerHTML = '<div class="review-item"><h3>No matching corrections</h3><p>Try another filter or subject.</p></div>';
    return;
  }

  els.reviewList.innerHTML = filtered.map((item) => {
    const statusLabel = item.status === 'correct' ? 'Correct' : item.status === 'incorrect' ? 'Incorrect' : 'Not answered';
    const badgeClass = item.status === 'correct' ? 'correct' : item.status === 'incorrect' ? 'incorrect' : 'unanswered';
    const selected = item.userAnswer === null ? 'No answer selected.' : `${LETTERS[item.userAnswer]} — ${item.userAnswerText || ''}`;
    const correctAnswer = `${LETTERS[item.correctAnswer]} — ${item.correctText || ''}`;
    return `
      <article class="review-item">
        <div class="review-item-head">
          <span>${item.subject}</span>
          <span class="review-badge ${badgeClass}">${statusLabel}</span>
        </div>
        <h3>${item.question}</h3>
        <div class="response-row">
          <p><strong>Your answer:</strong> ${selected}</p>
          <p><strong>Correct answer:</strong> ${correctAnswer}</p>
        </div>
        <div class="review-explanation">${item.explanation || 'No explanation available.'}</div>
      </article>
    `;
  }).join('');
}

function renderResultsScreen({ correct, incorrect, unanswered, total, percent, elapsedSeconds, reviewEntries, autoSubmit }) {
  els.resultsHeading.textContent = `${state.username || 'Candidate'}'s results`;
  els.scoreValue.textContent = `${correct} / ${total}`;
  els.scorePercent.textContent = `${percent}%`;
  els.statCorrect.textContent = String(correct);
  els.statIncorrect.textContent = String(incorrect);
  els.statUnanswered.textContent = String(unanswered);
  els.statTime.textContent = formatTime(elapsedSeconds);

  let message = 'Keep practising and review the explanations before trying again.';
  if (percent >= 70) message = 'Excellent work. Your score is strong and ready for a bigger challenge.';
  else if (percent >= 50) message = 'Solid effort. Review the explanations and keep improving.';
  els.scoreMessage.textContent = message;

  els.resultsNotice.hidden = !autoSubmit;

  const grouped = {};
  reviewEntries.forEach((entry) => {
    if (!grouped[entry.subject]) grouped[entry.subject] = [];
    grouped[entry.subject].push(entry);
  });

  const summary = Object.entries(grouped).map(([subject, entries]) => {
    const totalQuestions = entries.length;
    const correctCount = entries.filter((entry) => entry.status === 'correct').length;
    const subjectPercent = Math.round((correctCount / totalQuestions) * 100);
    return `
      <div class="subject-score">
        <strong>${subject}</strong>
        <span>${correctCount}/${totalQuestions} · ${subjectPercent}%</span>
      </div>
    `;
  }).join('');
  els.subjectSummary.innerHTML = summary;

  const subjects = ['all', ...Object.keys(grouped)];
  els.reviewSubjectSelect.innerHTML = subjects.map((subject) => `<option value="${subject}">${subject === 'all' ? 'All subjects' : subject}</option>`).join('');

  state.lastRun = { reviewEntries };
  renderReviewList();
}

function finishTest(autoSubmit) {
  if (!state.session) return;
  clearInterval(state.timerId);
  const session = state.session;

  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;
  const reviewEntries = [];

  session.subjects.forEach((subject) => {
    subject.questions.forEach((question, index) => {
      const answer = subject.answers[index];
      const isSaved = subject.savedQuestions.includes(index);
      if (answer === null) {
        unanswered += 1;
        reviewEntries.push({
          subject: subject.name,
          question: question.question,
          status: 'unanswered',
          userAnswer: null,
          userAnswerText: '',
          correctAnswer: question.correctIndex,
          correctText: question.options[question.correctIndex] || '',
          explanation: question.explanation || '',
          saved: isSaved,
        });
        return;
      }

      if (answer === question.correctIndex) {
        correct += 1;
        reviewEntries.push({
          subject: subject.name,
          question: question.question,
          status: 'correct',
          userAnswer: answer,
          userAnswerText: question.options[answer] || '',
          correctAnswer: question.correctIndex,
          correctText: question.options[question.correctIndex] || '',
          explanation: question.explanation || '',
          saved: isSaved,
        });
      } else {
        incorrect += 1;
        reviewEntries.push({
          subject: subject.name,
          question: question.question,
          status: 'incorrect',
          userAnswer: answer,
          userAnswerText: question.options[answer] || '',
          correctAnswer: question.correctIndex,
          correctText: question.options[question.correctIndex] || '',
          explanation: question.explanation || '',
          saved: isSaved,
        });
      }
    });
  });

  const total = correct + incorrect + unanswered;
  const percent = total ? Math.round((correct / total) * 100) : 0;
  const elapsedSeconds = Math.max(0, Math.round((Date.now() - session.startsAt) / 1000));

  const history = readStorage(STORAGE.HISTORY, []);
  const entry = {
    date: new Date().toISOString(),
    subject: session.subjects.map((subject) => subject.name).join(', '),
    correct,
    total,
    percent,
  };
  history.push(entry);
  writeStorage(STORAGE.HISTORY, history.slice(-HISTORY_LIMIT));

  state.lastRun = { reviewEntries: reviewEntries.slice(-REVIEW_LIMIT) };
  renderResultsScreen({
    correct,
    incorrect,
    unanswered,
    total,
    percent,
    elapsedSeconds,
    reviewEntries,
    autoSubmit,
  });

  removeStorage(STORAGE.SESSION);
  state.session = null;
  setScreen('results');
}

function resumeSavedTestIfExists() {
  const saved = readStorage(STORAGE.SESSION, null);
  if (!saved || !saved.subjects || !saved.subjects.length) {
    els.resumeCard.hidden = true;
    return;
  }

  const answered = saved.subjects.reduce((total, subject) => total + subject.answers.filter((value) => value !== null).length, 0);
  const totalQuestions = saved.subjects.reduce((total, subject) => total + subject.answers.length, 0);
  els.resumeText.textContent = `You have an unfinished test (${answered} of ${totalQuestions} answered). Want to resume it?`;
  els.resumeCard.hidden = false;
}

function initializeCalculator() {
  const display = els.calcDisplay;
  let calcValue = '0';
  let formula = '';
  let lastKey = '';

  const writeDisplay = () => {
    display.textContent = calcValue;
  };

  const applyValue = (value) => {
    if (value === 'C') {
      calcValue = '0';
      formula = '';
      lastKey = '';
      writeDisplay();
      return;
    }

    if (value === 'CE') {
      calcValue = '0';
      writeDisplay();
      return;
    }

    if (value === '=') {
      try {
        const expression = (formula || calcValue).replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
        const result = Number(Function(`"use strict"; return (${expression});`)());
        calcValue = Number.isFinite(result) ? String(result) : 'Error';
        formula = calcValue;
        lastKey = '=';
        writeDisplay();
      } catch (error) {
        calcValue = 'Error';
        formula = '';
        writeDisplay();
      }
      return;
    }

    if (/[0-9.]/.test(value)) {
      if (calcValue === '0' && value !== '.') {
        calcValue = value;
      } else if (lastKey === '=' && /[0-9]/.test(value)) {
        calcValue = value;
      } else {
        calcValue += value;
      }
      formula += value;
      lastKey = value;
      writeDisplay();
      return;
    }

    if (['+', '-', '*', '/'].includes(value)) {
      if (formula && !/[+\-*/]$/.test(formula)) {
        formula += value;
      } else if (!formula) {
        formula = '0' + value;
      }
      calcValue = value === '*' ? '×' : value === '/' ? '÷' : value === '-' ? '−' : '+';
      lastKey = value;
      writeDisplay();
    }
  };

  document.querySelectorAll('.calc-btn').forEach((button) => {
    button.addEventListener('click', () => applyValue(button.dataset.value));
  });
}

function ensureSettingsValid() {
  const valid = state.selectedSubjects.includes('English Language') && state.selectedSubjects.length >= 2;
  if (!valid) {
    els.settingsMessage.hidden = false;
    els.settingsMessage.textContent = 'Select English Language and at least one more subject to begin.';
    return false;
  }
  els.settingsMessage.hidden = true;
  return true;
}

function bindEvents() {
  els.settingsForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    state.username = els.usernameInput.value.trim();
    state.questionCount = Number(els.questionCountSelect.value) || 10;
    state.year = els.examYearSelect.value || 'Any year';
    state.duration = els.durationSelect.value;
    state.mode = document.querySelector('input[name="examMode"]:checked').value;
    state.shuffleQuestions = document.getElementById('shuffleQuestionsToggle').checked;
    state.shuffleOptions = document.getElementById('shuffleOptionsToggle').checked;

    if (!ensureSettingsValid()) return;
    persistSettings();
    await buildSessionFromSettings();
    showTestScreen();
  });

  els.subjectPicker.addEventListener('change', (event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement)) return;
    if (input.value === 'English Language') {
      input.checked = true;
      return;
    }

    const selected = [...els.subjectPicker.querySelectorAll('input[type="checkbox"]:checked')].map((item) => item.value);
    if (selected.length > 4) {
      input.checked = false;
      return;
    }

    state.selectedSubjects = selected.length ? selected : ['English Language'];
    if (!state.selectedSubjects.includes('English Language')) {
      const englishBox = els.subjectPicker.querySelector('input[value="English Language"]');
      if (englishBox) englishBox.checked = true;
      state.selectedSubjects = ['English Language', ...state.selectedSubjects.filter((subject) => subject !== 'English Language')];
    }

    updateSubjectSelectionUI();
    persistSettings();
  });

  els.resumeBtn.addEventListener('click', () => {
    const savedSession = readStorage(STORAGE.SESSION, null);
    if (!savedSession || !savedSession.subjects) return;
    state.session = savedSession;
    state.currentSubjectIndex = Number(savedSession.currentSubjectIndex || 0);
    state.currentQuestionIndex = Number(savedSession.currentQuestionIndex || 0);
    showTestScreen();
  });

  document.getElementById('discardBtn').addEventListener('click', () => {
    removeStorage(STORAGE.SESSION);
    els.resumeCard.hidden = true;
  });

  els.nextBtn.addEventListener('click', goToNextQuestion);
  els.prevBtn.addEventListener('click', goToPreviousQuestion);
  els.clearBtn.addEventListener('click', clearCurrentAnswer);
  els.saveBtn.addEventListener('click', saveCurrentQuestion);
  els.checkBtn.addEventListener('click', revealCurrentAnswer);
  els.quitBtn.addEventListener('click', () => els.quitDialog.showModal());
  els.submitBtn.addEventListener('click', () => {
    const unanswered = state.session ? state.session.subjects.reduce((total, subject) => total + subject.answers.filter((value) => value === null).length, 0) : 0;
    els.submitSummary.textContent = unanswered > 0
      ? `You still have ${unanswered} unanswered question${unanswered === 1 ? '' : 's'}. Submit now?`
      : 'You answered everything. Submit now?';
    els.submitDialog.showModal();
  });

  els.quitCancel.addEventListener('click', () => els.quitDialog.close());
  els.quitConfirm.addEventListener('click', () => {
    els.quitDialog.close();
    clearInterval(state.timerId);
    state.session = null;
    removeStorage(STORAGE.SESSION);
    setScreen('setup');
  });

  els.submitCancel.addEventListener('click', () => els.submitDialog.close());
  els.submitConfirm.addEventListener('click', () => {
    els.submitDialog.close();
    finishTest(false);
  });

  els.calcBtn.addEventListener('click', () => els.calculatorDialog.showModal());
  els.calculatorClose.addEventListener('click', () => els.calculatorDialog.close());
  els.savedViewBtn.addEventListener('click', () => {
    showSavedQuestions();
    setScreen('saved');
  });
  els.savedBackBtn.addEventListener('click', () => setScreen('setup'));
  els.newTestBtn.addEventListener('click', () => setScreen('setup'));
  els.retryBtn.addEventListener('click', async () => {
    await buildSessionFromSettings();
    showTestScreen();
  });

  els.reviewFilterSelect.addEventListener('change', renderReviewList);
  els.reviewSubjectSelect.addEventListener('change', renderReviewList);
  document.addEventListener('keydown', handleKeyboardShortcuts);

  document.querySelectorAll('input[name="examMode"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      state.mode = radio.value;
      updateModeUI();
    });
  });
}

function showSavedQuestionsList() {
  const saved = readStorage(STORAGE.SAVED, []);
  if (Array.isArray(saved) && saved.length) {
    els.savedQuestionsList.innerHTML = saved.map((entry) => `
      <article class="saved-item">
        <h3><strong>${entry.subject}</strong></h3>
        <p>${entry.question}</p>
      </article>
    `).join('');
  } else {
    els.savedQuestionsList.innerHTML = '<div class="saved-item"><h3>No saved questions</h3><p>Your saved review items will appear here.</p></div>';
  }
}

async function init() {
  renderSubjectPicker();
  await refreshJambOptions();
  hydrateSettings();
  populateRecentResults();
  resumeSavedTestIfExists();
  bindEvents();
  initializeCalculator();
  setScreen('setup');
  showSavedQuestionsList();
  updateSubjectSelectionUI();
  updateModeUI();
}

init();
