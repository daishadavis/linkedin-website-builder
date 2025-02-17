import React, { useState } from 'react';
import UploadPage from './pages/UploadPage';
import PreviewPage from './pages/PreviewPage';
import HTMLTemplatePage from './pages/HTMLTemplatePage';
import './stylesheets/App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('upload');
  const [data, setData] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

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

  // Navigation helper that also handles data fetching after upload.
  const handleNext = (page, template = null) => {
    if (page === 'preview') {
      // After upload, fetch extracted data from /api/data
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
        <UploadPage onUploadComplete={() => handleNext('preview')} />
      )}
      {currentPage === 'preview' && (
        <PreviewPage
          data={data}
          onTemplateSelect={(templateName) => {
            console.log('Template selected in PreviewPage:', templateName);
            handleNext('template', templateName);
          }}
        />
      )}
      {currentPage === 'template' ? (
        data && selectedTemplate ? (
          <HTMLTemplatePage templateName={selectedTemplate} data={data} />
        ) : (
          <p>Data or template missing</p>
        )
      ) : null}
    </div>
  );
};

export default App;
