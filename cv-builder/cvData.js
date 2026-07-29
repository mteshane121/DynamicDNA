const storageKey = 'sinegugu-cv-builder-data';

const defaultCVData = {
  firstName: 'Sinegugu',
  surname: 'Mteshane',
  title: 'Junior Software Developer',
  email: 'gumteshane@gmail.com',
  phone: '+27 79 722 3281',
  linkedin: 'linkedin.com/in/sinegugu-mteshane-9a4a8140b',
  github: 'github.com/mteshane121',
  summary: 'Passionate software development learner with experience building clean web applications, Java services and database-backed solutions.',
  profileImage: 'Photos/Copilot_20260716_130307.png',
  template: 'modern',
  color: '#172521',
  font: 'Manrope',
  skills: ['HTML5', 'CSS3', 'JavaScript', 'Java', 'Spring Boot', 'SQL & PostgreSQL', 'Git & GitHub'],
  experience: [
    { role: 'Software Developer Learner', company: 'DynamicDNA', dates: 'Jul 2026 — Present', description: 'Building practical frontend and backend projects, debugging applications and creating database-backed solutions.' },
    { role: 'Contract Developer', company: 'Falcorp Technologies', dates: 'Jul 2025 — May 2026', description: 'Built component designs, collaborated in Git workflows and created technical documentation.' }
  ],
  education: [
    { qualification: 'Diploma in ICT', institution: 'Durban University of Technology', dates: 'Completed Jul 2024', description: 'Web development, Java programming, database design, software testing, Git and project development.' }
  ],
  projects: [
    { name: 'Foundation API', description: 'Spring Boot REST API with PostgreSQL, Flyway migrations and Swagger documentation.' },
    { name: 'HustleHub SA', description: 'Responsive digital hub for South African community enterprise services.' }
  ]
};

function loadCVData() {
  try {
    return { ...defaultCVData, ...JSON.parse(localStorage.getItem(storageKey)) };
  } catch {
    return structuredClone(defaultCVData);
  }
}

function saveCVData(data) {
  localStorage.setItem(storageKey, JSON.stringify(data));
}

window.CVData = { defaultCVData, loadCVData, saveCVData };
