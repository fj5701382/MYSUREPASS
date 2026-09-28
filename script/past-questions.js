const questionDataset = [
  { exam: 'WAEC', year: 2024, subject: 'Mathematics', topic: 'Algebra', description: 'Algebra, Geometry, Statistics & Probability' },
  { exam: 'WAEC', year: 2024, subject: 'English Language', topic: 'Comprehension', description: 'Comprehension, Lexis & Structure, Essay' },
  { exam: 'WAEC', year: 2024, subject: 'Physics', topic: 'Mechanics', description: 'Mechanics, Waves, Electricity & Magnetism' },
  { exam: 'WAEC', year: 2024, subject: 'Chemistry', topic: 'Organic Chemistry', description: 'Organic, Inorganic & Physical Chemistry' },
  { exam: 'JAMB', year: 2024, subject: 'Mathematics', topic: 'Number & Numeration', description: 'Number & Numeration, Algebra, Calculus' },
  { exam: 'JAMB', year: 2024, subject: 'English Language', topic: 'Oral English', description: 'Oral English, Comprehension, Lexis' },
  { exam: 'JAMB', year: 2024, subject: 'Physics', topic: 'Heat', description: 'Heat, Optics, Modern Physics, Mechanics' },
  { exam: 'JAMB', year: 2024, subject: 'Biology', topic: 'Ecology', description: 'Ecology, Genetics, Cell Biology, Evolution' },
  { exam: 'NECO', year: 2023, subject: 'Mathematics', topic: 'Trigonometry', description: 'Trigonometry, Mensuration, Statistics' },
  { exam: 'NECO', year: 2023, subject: 'English Language', topic: 'Summary', description: 'Summary, Comprehension, Grammar' },
  { exam: 'NECO', year: 2023, subject: 'Chemistry', topic: 'Electrochemistry', description: 'Electrochemistry, Chemical Kinetics' },
  { exam: 'NECO', year: 2023, subject: 'Biology', topic: 'Plant Physiology', description: 'Plant & Animal Physiology, Genetics' },
  { exam: 'NABTEB', year: 2023, subject: 'Mathematics', topic: 'Applied Mathematics', description: 'Applied Mathematics, Technical Drawing Basics' },
  { exam: 'NABTEB', year: 2023, subject: 'English Language', topic: 'Business English', description: 'Business English, Comprehension' },
  { exam: 'WAEC', year: 2024, subject: 'Further Mathematics', topic: 'Complex Numbers', description: 'Complex Numbers, Matrices, Vectors' },
  { exam: 'JAMB', year: 2024, subject: 'Chemistry', topic: 'Atomic Structure', description: 'Atomic Structure, Chemical Bonding, Acids' },
  { exam: 'WAEC', year: 2022, subject: 'Biology', topic: 'Genetics', description: 'Genetics, Evolution, Genetic Engineering' },
  { exam: 'JAMB', year: 2021, subject: 'Government', topic: 'Political Structure', description: 'Constitution, Governance, National Development' },
  { exam: 'NECO', year: 2023, subject: 'Economics', topic: 'Market Structure', description: 'Demand, Supply, Elasticity & Economics Theory' },
  { exam: 'WAEC', year: 2020, subject: 'Literature', topic: 'Drama', description: 'Drama, Prose, Poetry & Literary Appreciation' },
  { exam: 'JAMB', year: 2023, subject: 'Computer Studies', topic: 'Software', description: 'Hardware, Software, Internet & Networking' },
  { exam: 'WAEC', year: 2024, subject: 'Physics', topic: 'Electricity', description: 'Current Electricity, Magnetism & Circuits' },
  { exam: 'NECO', year: 2022, subject: 'Mathematics', topic: 'Statistics', description: 'Probability, Measures of Location & Dispersion' },
  { exam: 'NABTEB', year: 2022, subject: 'Chemistry', topic: 'Acids', description: 'Acids, Bases, Salts, Stoichiometry' },
  { exam: 'WAEC', year: 2021, subject: 'English Language', topic: 'Essay', description: 'Essay Writing, Letter, Speech & Summary' }
];

const paginatedDataset = [];
for (let index = 0; index < 24; index += 1) {
  questionDataset.forEach((item, itemIndex) => {
    paginatedDataset.push({ ...item, id: `${index}-${itemIndex}` });
  });
}

const pageSize = 16;
const totalPages = Math.ceil(paginatedDataset.length / pageSize);

const searchForm = document.getElementById('questionSearchForm');
const searchInput = document.getElementById('searchInput');
const examFilter = document.getElementById('examFilter');
const subjectFilter = document.getElementById('subjectFilter');
const yearFilter = document.getElementById('yearFilter');
const topicFilter = document.getElementById('topicFilter');
const questionGrid = document.getElementById('questionGrid');
const resultsStatus = document.getElementById('resultsStatus');
const emptyState = document.getElementById('emptyState');
const clearFiltersButton = document.getElementById('clearFilters');
const paginationNumbers = document.getElementById('paginationNumbers');
const prevPageButton = document.getElementById('prevPage');
const nextPageButton = document.getElementById('nextPage');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

let currentPage = 1;

function getBadgeClass(exam) {
  if (exam === 'WAEC') return 'badge-waec';
  if (exam === 'JAMB') return 'badge-jamb';
  if (exam === 'NECO') return 'badge-neco';
  if (exam === 'NABTEB') return 'badge-nabteb';
  return 'badge-jamb';
}

function filterQuestions() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const examValue = examFilter.value;
  const subjectValue = subjectFilter.value;
  const yearValue = yearFilter.value;
  const topicValue = topicFilter.value;

  return paginatedDataset.filter((item) => {
    const haystack = `${item.exam} ${item.subject} ${item.topic} ${item.description}`.toLowerCase();
    const matchesSearch = !searchTerm || haystack.includes(searchTerm);
    const matchesExam = examValue === 'All Examinations' || item.exam === examValue;
    const matchesSubject = subjectValue === 'All Subjects' || item.subject === subjectValue;
    const matchesYear = yearValue === 'All Years' || String(item.year) === yearValue;
    const matchesTopic = topicValue === 'All Topics' || item.topic === topicValue || item.description.includes(topicValue);

    return matchesSearch && matchesExam && matchesSubject && matchesYear && matchesTopic;
  });
}

function renderCards(items) {
  if (!items.length) {
    questionGrid.innerHTML = '';
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;
  questionGrid.innerHTML = items
    .map(
      (item) => `
        <article class="question-card" aria-label="${item.subject} ${item.exam} ${item.year}">
          <div class="card-meta">
            <span class="badge-pill ${getBadgeClass(item.exam)}">${item.exam}</span>
            <span class="year-badge">${item.year}</span>
          </div>
          <h2 class="card-title">${item.subject}</h2>
          <p class="card-topic">${item.description}</p>
          <div class="card-actions">
            <button type="button" class="card-btn">View Questions</button>
            <button type="button" class="card-btn primary">Practice Now</button>
          </div>
        </article>
      `
    )
    .join('');
}

function renderPagination(totalResults) {
  const totalPagesCount = Math.max(1, Math.ceil(totalResults / pageSize));

  const pageButtons = [];

  if (totalPagesCount <= 7) {
    for (let index = 1; index <= totalPagesCount; index += 1) {
      pageButtons.push(index);
    }
  } else {
    if (currentPage <= 3) {
      pageButtons.push(1, 2, 3, 4, '...', totalPagesCount);
    } else if (currentPage >= totalPagesCount - 2) {
      pageButtons.push(1, '...', totalPagesCount - 3, totalPagesCount - 2, totalPagesCount - 1, totalPagesCount);
    } else {
      pageButtons.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPagesCount);
    }
  }

  paginationNumbers.innerHTML = pageButtons
    .map((pageNumber) => {
      if (pageNumber === '...') {
        return '<button type="button" class="page-number ellipsis" aria-hidden="true">...</button>';
      }

      const isActive = Number(pageNumber) === currentPage;
      return `<button type="button" class="page-number ${isActive ? 'is-active' : ''}" data-page="${pageNumber}" aria-label="Go to page ${pageNumber}" aria-current="${isActive ? 'page' : 'false'}">${pageNumber}</button>`;
    })
    .join('');

  prevPageButton.disabled = currentPage === 1;
  nextPageButton.disabled = currentPage >= totalPagesCount;

  paginationNumbers.querySelectorAll('.page-number').forEach((button) => {
    button.addEventListener('click', () => {
      const targetPage = Number(button.dataset.page);
      if (!Number.isNaN(targetPage)) {
        currentPage = targetPage;
        updateView();
      }
    });
  });
}

function updateResultsStatus(totalResults, filteredResults) {
  if (!filteredResults.length) {
    resultsStatus.textContent = '0 matching questions';
    return;
  }

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, filteredResults.length);
  resultsStatus.textContent = `Showing ${start}-${end} of ${filteredResults.length} matching questions`;
}

function updateView() {
  const filteredQuestions = filterQuestions();
  const totalResults = filteredQuestions.length;
  const totalPagesCount = Math.max(1, Math.ceil(totalResults / pageSize));

  if (currentPage > totalPagesCount) {
    currentPage = totalPagesCount;
  }

  const pageItems = filteredQuestions.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  renderCards(pageItems);
  updateResultsStatus(totalResults, filteredQuestions);
  renderPagination(totalResults);
}

function resetFilters() {
  searchInput.value = '';
  examFilter.value = 'All Examinations';
  subjectFilter.value = 'All Subjects';
  yearFilter.value = 'All Years';
  topicFilter.value = 'All Topics';
  currentPage = 1;
  updateView();
}

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  currentPage = 1;
  updateView();
});

clearFiltersButton.addEventListener('click', resetFilters);

prevPageButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage -= 1;
    updateView();
  }
});

nextPageButton.addEventListener('click', () => {
  const filteredQuestions = filterQuestions();
  const totalPagesCount = Math.max(1, Math.ceil(filteredQuestions.length / pageSize));
  if (currentPage < totalPagesCount) {
    currentPage += 1;
    updateView();
  }
});

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('is-open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('menu-open', isOpen);
  });
}

updateView();
