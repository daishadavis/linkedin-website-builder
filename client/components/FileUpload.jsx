import React from 'react'
import { useState } from 'react'

const FileUpload = ({ onUploadComplete }) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
  
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
      setError(''); // Clear errors
    };
  
    const handleUpload = async (e) => {
      e.preventDefault();
  
      if (!file) {
        setError('Please upload a file.');
        return;
      }
  
      setLoading(true);
  
      const formData = new FormData();
      formData.append('linkedinPDF', file);
  
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          const result = await response.json();
          onUploadComplete(result.data); // Pass extracted data to the parent
        } else {
          setError('Upload failed. Try again.');
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <form onSubmit={handleUpload} encType='multipart/form-data'>
        <h2>Upload Your LinkedIn Profile</h2>
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>{loading ? 'Uploading...' : 'Upload'}</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    );
  };

export default FileUpload