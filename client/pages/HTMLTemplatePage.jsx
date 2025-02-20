import React, { useEffect, useState } from 'react';

const HTMLTemplatePage = ({ templateName, data }) => {
  const [htmlContent, setHtmlContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!templateName || !data) {
      setError('Template name or data is missing.');
      return;
    }

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
          .then((cssContent) => {
            // Inline the CSS into a <style> tag in the head.
            if (updatedHtml.match(/<head>/i)) {
              updatedHtml = updatedHtml.replace(
                /<head>/i,
                `<head><style>${cssContent}</style>`
              );
            } else {
              updatedHtml = `<head><style>${cssContent}</style></head>` + updatedHtml;
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

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!error && !htmlContent && <p>Loading template...</p>}
      {htmlContent && (
        <div
          style={{padding: '1rem', marginTop: '1rem' }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      )}
    </div>
  );
};

export default HTMLTemplatePage;
