function safeText(text) {
  return String(text || '').replace(/[&<>'"]/g, (letter) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[letter]);
}

function editable(text, path, tag = 'span') {
  return `<${tag} contenteditable="true" data-path="${path}">${safeText(text)}</${tag}>`;
}

function entries(items, type, content) {
  return items.map((item, index) => `<article class="cv-entry">
    <button class="entry-delete" data-delete="${type}" data-index="${index}">×</button>${content(item, index)}</article>`).join('');
}

function renderCV(data) {
  const experience = entries(data.experience, 'experience', (item, index) => `<p class="cv-date">${editable(item.dates, `experience.${index}.dates`)}</p><h3>${editable(item.role, `experience.${index}.role`)} · ${editable(item.company, `experience.${index}.company`)}</h3><p>${editable(item.description, `experience.${index}.description`)}</p>`);
  const education = entries(data.education, 'education', (item, index) => `<p class="cv-date">${editable(item.dates, `education.${index}.dates`)}</p><h3>${editable(item.qualification, `education.${index}.qualification`)}</h3><p>${editable(item.institution, `education.${index}.institution`)}</p><p>${editable(item.description, `education.${index}.description`)}</p>`);
  const projects = entries(data.projects, 'projects', (item, index) => `<h3>${editable(item.name, `projects.${index}.name`)}</h3><p>${editable(item.description, `projects.${index}.description`)}</p>`);
  const skills = data.skills.map((skill, index) => `<li>${editable(skill, `skills.${index}`)}<button class="entry-delete skill-delete" data-delete="skills" data-index="${index}">×</button></li>`).join('');

  return `<article class="cv-document cv-minimal" style="--cv-primary:#172521;--cv-font:Manrope,sans-serif">
    <header class="cv-header"><img class="cv-photo" src="${safeText(data.profileImage)}" alt="Profile photo"><div><h1>${editable(data.firstName, 'firstName')} ${editable(data.surname, 'surname')}</h1><p>${editable(data.title, 'title')}</p></div><address>${editable(data.email, 'email')}<br>${editable(data.phone, 'phone')}<br>${editable(data.linkedin, 'linkedin')}<br>${editable(data.github, 'github')}</address></header>
    <section><h2>Profile</h2><p class="cv-summary">${editable(data.summary, 'summary')}</p></section>
    <section><h2>Experience</h2>${experience}<button class="add-entry" data-add="experience">+ Add experience</button></section>
    <section><h2>Education</h2>${education}<button class="add-entry" data-add="education">+ Add education</button></section>
    <section><h2>Projects</h2><div class="cv-projects">${projects}</div><button class="add-entry" data-add="projects">+ Add project</button></section>
    <section><h2>Skills</h2><ul class="cv-skills">${skills}</ul><button class="add-entry" data-add="skills">+ Add skill</button></section>
  </article>`;
}

function updateByPath(data, path, value) {
  const keys = path.split('.');
  let item = data;
  keys.slice(0, -1).forEach((key) => { item = item[key]; });
  item[keys[keys.length - 1]] = value.trim();
}

window.CVEditor = { renderCV, updateByPath };
