import pdfjs from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = 'js/pdf.worker.bundle.js';

const form = document.getElementById('form');
const fileReader = new FileReader();

form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const fd = new FormData(form);
    const file = fd.get('upload');
    fileReader.readAsArrayBuffer(file);
});

fileReader.addEventListener('load', async (ev) => {
    const buf = ev.target.result;
    const pdf = await pdfjs.getDocument(new Uint8Array(buf));
    console.log(pdf);
    const page = await pdf.getPage(1);
    console.log(page);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const viewport = page.getViewport(0.3);
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    const result = await page.render({
        canvasContext: ctx,
        viewport: viewport
    });
    const url = canvas.toDataURL('image/png');
    const img = document.createElement('img');
    img.src = url;
    document.body.appendChild(img);
});