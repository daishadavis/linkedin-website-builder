import React, { useState } from 'react';
import UploadPage from './pages/UploadPage';
import PreviewPage from './pages/PreviewPage';
import Template1 from './website-templates/Template1';

const App = () => {
  const [currentPage, setCurrentPage] = useState('upload');
  const [data, setData] = useState(null);

  // Handles page transitions
  const handleNext = (page, newData = null) => {
    if (newData) setData(newData);
    setCurrentPage(page);
  };

  // Handle upload completion and make GET request to fetch data
  const handleUploadComplete = async (fileData) => {
    setData(fileData);
    handleNext('preview'); // Move to template preview page
  };

  // Make GET request to fetch the data from backend
  const fetchExtractedData = async () => {
    try {
      const response = await fetch('/api/data');  // GET request to fetch data
      if (response.ok) {
        const result = await response.json();
        setData(result.data);  // Set the extracted data
        handleNext('template');  // Move to template display page
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      {currentPage === 'upload' && <UploadPage onUploadComplete={handleUploadComplete} />}
      {currentPage === 'preview' && <PreviewPage data={data} onTemplateSelect={() => handleNext('template', data)} />}
      {currentPage === 'template' && <Template1 data={data} />}  {/* Render Template1 */}
    </div>
  );
};

export default App;
