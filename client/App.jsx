import React, { useState } from 'react';
import UploadPage from './pages/UploadPage';
import HTMLTemplatePage from './pages/HTMLTemplatePage';
import './stylesheets/App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('upload');
  const [data, setData] = useState(null);
  // Set a default template (you can later allow the user to choose a template)
  const [selectedTemplate, setSelectedTemplate] = useState('template1');

  // Fetch extracted data from the /api/data endpoint
  const fetchExtractedData = async () => {
    console.log('Fetching data from /api/data...');
    try {
      const response = await fetch('/api/data');
      if (response.ok) {
        const result = await response.json();
        console.log('Fetched data:', result.data);
        setData(result.data);
      } else {
        console.error('Failed to fetch data, status:', response.status);
      }
    } catch (error) {
      console.error('Error during GET request:', error);
    }
  };

  // Navigation helper: After upload, fetch data and navigate directly to template.
  const handleNext = (page, template = null) => {
    if (page === 'template') {
      // Fetch the extracted data before switching to the template page.
      fetchExtractedData();
    }
    if (template) {
      console.log('Selected template:', template);
      setSelectedTemplate(template);
    }
    console.log(`Navigating to: ${page}`);
    setCurrentPage(page);
  };

  return (
    <div>
      {currentPage === 'upload' && (
        <UploadPage 
          onUploadComplete={() => handleNext('template', 'template1')}
        />
      )}
      {currentPage === 'template' &&
        data && selectedTemplate ? (
          <HTMLTemplatePage 
            templateName={selectedTemplate} 
            data={data} 
          />
        ) : currentPage === 'template' ? (
          <p>Loading your website...</p>
        ) : null}
    </div>
  );
};

export default App;
