import React from 'react'
import Header from '../components/Header'

const ResultPage = ({data}) => {
    const handleDownload = () => {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'linkedin-website-source.json';
        link.click();
      };
    
      return (
        <div>
          <Header />
          <h2>Your Generated Website</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          <button onClick={handleDownload}>Download Website</button>
        </div>
      );
}

export default ResultPage