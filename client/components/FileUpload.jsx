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
      <form onSubmit={handleUpload} encType='multipart/form-data' className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Upload Your LinkedIn Profile</h2>
        <input type="file" accept="application/pdf" onChange={handleFileChange} className="w-full px-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <button
        type="submit"
        disabled={loading}
        className={`w-full px-4 py-2 text-white font-bold rounded-lg ${
          loading
            ? 'bg-blue-300 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {loading ? 'Uploading...' : 'Upload'}
      </button>
        {error && <p className='mt-2 text-center text-red-500'>{error}</p>}
      </form>
    );
  };

export default FileUpload