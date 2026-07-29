let modal;
let data;

const empty = {
  experience: { role: 'New role', company: 'Company', dates: 'Month Year', description: 'Add your responsibilities.' },
  education: { qualification: 'Qualification', institution: 'Institution', dates: 'Year', description: 'Add your education details.' },
  projects: { name: 'New project', description: 'Describe the project.' },
  skills: 'New skill'
};

function showCV() {
  modal.querySelector('#cv-preview').innerHTML = window.CVEditor.renderCV(data);
}

function saveAndShow() {
  window.CVData.saveCVData(data);
  showCV();
}

function openCVBuilder() {
  data = window.CVData.loadCVData();
  modal = document.createElement('div');
  modal.className = 'cv-modal';
  modal.innerHTML = `<div class="cv-builder" role="dialog" aria-modal="true" aria-label="CV builder">
    <aside class="builder-panel"><button class="close-builder" aria-label="Close">×</button><p class="builder-eyebrow">Your CV</p><h2>Minimal CV</h2><p class="builder-help">Click on any text to edit it. Changes save automatically.</p><button class="pdf-button">Download PDF ↓</button></aside>
    <div class="builder-canvas"><div class="canvas-title">Edit your CV <span>Minimal template</span></div><div id="cv-preview" class="cv-preview"></div></div>
  </div>`;
  document.body.append(modal);
  document.body.classList.add('builder-open');
  showCV();
  addEvents();
}

function addEvents() {
  modal.addEventListener('click', async (event) => {
    if (event.target.closest('.close-builder')) return close();
    const add = event.target.closest('[data-add]');
    const remove = event.target.closest('[data-delete]');
    if (add) { data[add.dataset.add].push(structuredClone(empty[add.dataset.add])); return saveAndShow(); }
    if (remove) { data[remove.dataset.delete].splice(remove.dataset.index, 1); return saveAndShow(); }
    if (event.target.closest('.pdf-button')) await makePDF(event.target.closest('.pdf-button'));
  });
  modal.addEventListener('focusout', (event) => {
    if (!event.target.dataset.path) return;
    window.CVEditor.updateByPath(data, event.target.dataset.path, event.target.textContent);
    window.CVData.saveCVData(data);
  });
}

async function makePDF(button) {
  button.disabled = true;
  button.textContent = 'Creating PDF…';
  try {
    await window.PDFGenerator.downloadPDF(modal.querySelector('.cv-document'), `${data.firstName}_${data.surname}_CV.pdf`);
  } catch (error) {
    alert(`PDF could not be created: ${error.message}`);
  }
  button.disabled = false;
  button.textContent = 'Download PDF ↓';
}

function close() { modal.remove(); document.body.classList.remove('builder-open'); }

window.openCVBuilder = openCVBuilder;
