import React, { useState } from 'react';
import UploadPage from './pages/UploadPage';
import PreviewPage from './pages/PreviewPage';
import Template1 from './website-templates/Template1';
import './stylesheets/App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('upload');
  const [data, setData] = useState(null);

  const handleNext = (page, newData = null) => {
    if (newData) {
      console.log('Updating data:', newData); // Debug log
      setData(newData); // Update state
    }
    setCurrentPage(page);
  };

  const fetchExtractedData = async () => {
    console.log('Fetching data from /api/data...');
    try {
      const response = await fetch('/api/data');
      if (response.ok) {
        const result = await response.json();
        console.log('Fetched data:', result.data);
        setData(result.data); // Save fetched data
        handleNext('template'); // Navigate to template page
      } else {
        console.error('Failed to fetch data, status:', response.status);
      }
    } catch (error) {
      console.error('Error during GET request:', error);
    }
  };

  return (
    <div >
      <div>
      {currentPage === 'upload' && (
        <UploadPage
          onUploadComplete={(fileData) => {
            console.log('Upload complete:', fileData); // Debug log
            setData(fileData); // Set uploaded data
            handleNext('preview'); // Navigate to preview
          }}
        />
      )}
      {currentPage === 'preview' && (
        <PreviewPage
          data={data}
          onTemplateSelect={fetchExtractedData} // Fetch data when selecting template
        />
      )}
      {currentPage === 'template' && <Template1 data={data} />}
      </div>
    </div>
  );
};

export default App;
