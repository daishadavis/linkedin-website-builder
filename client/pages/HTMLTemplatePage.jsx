import React, { useEffect, useState } from 'react';
import { downloadWebsite } from '../../server/utils/downloadWebsite';

const HTMLTemplatePage = ({ templateName, data }) => {
  const [htmlContent, setHtmlContent] = useState('');
  const [cssContent, setCssContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!templateName || !data) {
      setError('Template name or data is missing.');
      return;
    }

    // Fetch the HTML template
    fetch(`/api/template/${templateName}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Template HTTP error! Status: ${res.status}`);
        return res.text();
      })
      .then((template) => {
        let updatedHtml = template;
        // Replace placeholders with actual data
        updatedHtml = updatedHtml.replace(/{headerName}/g, data.header?.name || '');
        updatedHtml = updatedHtml.replace(/{headerHeadline}/g, data.header?.headline || '');
        updatedHtml = updatedHtml.replace(/{headerLocation}/g, data.header?.location || '');

        const summaryText = Array.isArray(data.summary)
          ? data.summary.join('<br/>')
          : data.summary || '';
        updatedHtml = updatedHtml.replace(/{summary}/g, summaryText);

        const experienceText = Array.isArray(data.experience)
          ? data.experience.join('<br/>')
          : data.experience || '';
        updatedHtml = updatedHtml.replace(/{experience}/g, experienceText);

        const educationText = Array.isArray(data.education)
          ? data.education.join('<br/>')
          : data.education || '';
        updatedHtml = updatedHtml.replace(/{education}/g, educationText);

        const skillsText = Array.isArray(data.skills)
          ? data.skills.join(', ')
          : data.skills || '';
        updatedHtml = updatedHtml.replace(/{skills}/g, skillsText);

        // Fetch CSS as text
        fetch(`/api/template/${templateName}.css`)
          .then((resCss) => {
            if (!resCss.ok) throw new Error(`CSS HTTP error! Status: ${resCss.status}`);
            return resCss.text();
          })
          .then((cssText) => {
            // Save the CSS for download purposes.
            setCssContent(cssText);

            // Inline the CSS into a <style> tag in the head for preview.
            if (updatedHtml.match(/<head>/i)) {
              updatedHtml = updatedHtml.replace(
                /<head>/i,
                `<head><style>${cssText}</style>`
              );
            } else {
              updatedHtml = `<head><style>${cssText}</style></head>` + updatedHtml;
            }
            console.log("Final HTML content:", updatedHtml);
            setHtmlContent(updatedHtml);
          })
          .catch((cssErr) => {
            console.error('Error fetching CSS:', cssErr);
            setError(`Error fetching CSS: ${cssErr.message}`);
          });
      })
      .catch((err) => {
        console.error('Error fetching template:', err);
        setError(`Error fetching template: ${err.message}`);
      });
  }, [templateName, data]);

  const handleDownload = () => {
    if (!htmlContent || !cssContent) {
      console.error('Missing generated HTML or CSS content');
      return;
    }
    downloadWebsite(htmlContent, cssContent);
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!error && !htmlContent && <p>Loading template...</p>}
      {htmlContent && (
        <div
          style={{ padding: '1rem', marginTop: '1rem' }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      )}
      {htmlContent && (
        <button
          onClick={handleDownload}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#2b6cb0',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Download Website
        </button>
      )}
    </div>
  );
};

export default HTMLTemplatePage;
