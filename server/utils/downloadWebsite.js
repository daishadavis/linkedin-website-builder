import JSZip from 'jszip';
import { saveAs } from 'file-saver';

/**
 * Packages the provided HTML and CSS content into a ZIP file and triggers a download.
 * @param {string} htmlContent - The final HTML content (index.html).
 * @param {string} cssContent - The raw CSS content (styles.css).
 */
export const downloadWebsite = (htmlContent, cssContent) => {
  const zip = new JSZip();
  zip.file('index.html', htmlContent);
  zip.file('styles.css', cssContent);

  zip.generateAsync({ type: 'blob' })
    .then((blob) => {
      saveAs(blob, 'my-website.zip');
    })
    .catch((err) => {
      console.error('Error generating ZIP:', err);
    });
};

