// pages/HTMLTemplatePage.jsx
// pages/HTMLTemplatePage.jsx
import React, { useEffect, useState } from 'react';

const HTMLTemplatePage = ({ templateName, data }) => {
  const [htmlContent, setHtmlContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('HTMLTemplatePage useEffect called');
    console.log('templateName:', templateName);
    console.log('data:', data);

    if (!templateName || !data) {
      setError('Template name or data is missing.');
      return;
    }

    fetch(`/api/template/${templateName}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.text();
      })
      .then((template) => {
        console.log('Fetched template:', template);

        let updatedHtml = template;
        // Replace header placeholders (data.header is an object)
        updatedHtml = updatedHtml.replace(/{headerName}/g, data.header?.name || '');
        updatedHtml = updatedHtml.replace(/{headerHeadline}/g, data.header?.headline || '');
        updatedHtml = updatedHtml.replace(/{headerLocation}/g, data.header?.location || '');

        // Replace summary (join the summary array with <br>)
        const summaryText = Array.isArray(data.summary)
          ? data.summary.join('<br/>')
          : data.summary || '';
        updatedHtml = updatedHtml.replace(/{summary}/g, summaryText);

        // Replace experience (join the experience array with <br>)
        // You might want to customize this if you want a more complex layout.
        const experienceText = Array.isArray(data.experience)
          ? data.experience.join('<br/>')
          : data.experience || '';
        updatedHtml = updatedHtml.replace(/{experience}/g, experienceText);

        // Replace education (join the education array with <br>)
        const educationText = Array.isArray(data.education)
          ? data.education.join('<br/>')
          : data.education || '';
        updatedHtml = updatedHtml.replace(/{education}/g, educationText);

        // Replace skills (join the skills array with commas)
        const skillsText = Array.isArray(data.skills)
          ? data.skills.join(', ')
          : data.skills || '';
        updatedHtml = updatedHtml.replace(/{skills}/g, skillsText);

        console.log('Updated HTML:', updatedHtml);
        setHtmlContent(updatedHtml);
      })
      .catch((err) => {
        console.error('Error fetching template:', err);
        setError(`Error fetching template: ${err.message}`);
      });
  }, [templateName, data]);

  return (
    <div className="html-template-container">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!error && !htmlContent && <p>Loading template...</p>}
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};

export default HTMLTemplatePage;
