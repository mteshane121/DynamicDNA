async function waitForImages(element) {
  await Promise.all([...element.querySelectorAll('img')].map((image) => {
    if (image.complete) return Promise.resolve();
    return new Promise((resolve) => {
      image.addEventListener('load', resolve, { once: true });
      image.addEventListener('error', resolve, { once: true });
      window.setTimeout(resolve, 5000);
    });
  }));
}

async function downloadPDF(element, filename) {
  if (!element) throw new Error('The selected template is not ready yet.');
  if (!window.html2pdf) throw new Error('The local PDF library did not load.');

  const exportArea = document.createElement('div');
  const copy = element.cloneNode(true);
  copy.querySelectorAll('.entry-delete, .add-entry').forEach((button) => button.remove());
  copy.querySelectorAll('[contenteditable]').forEach((field) => field.removeAttribute('contenteditable'));
  // A local or uploaded image can taint the PDF canvas. Use initials in the PDF instead.
  copy.querySelectorAll('.cv-photo').forEach((image) => {
    const initials = document.createElement('div');
    initials.className = 'cv-pdf-initials';
    initials.textContent = 'SM';
    image.replaceWith(initials);
  });
  exportArea.className = 'pdf-export-area';
  exportArea.append(copy);
  document.body.append(exportArea);

  try {
    if (document.fonts?.ready) await document.fonts.ready;
    await waitForImages(copy);
    await window.html2pdf().set({
      margin: 0,
      filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 1.5, useCORS: true, backgroundColor: '#ffffff' },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'legacy'] }
    }).from(copy).save();
  } finally {
    exportArea.remove();
  }
}

window.PDFGenerator = { downloadPDF };
