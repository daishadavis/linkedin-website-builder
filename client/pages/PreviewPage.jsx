// PreviewPage.jsx
import React from 'react';
import Header from '../components/Header';
import TemplateSelector from '../components/TemplateSelector';

const PreviewPage = ({ data, onTemplateSelect }) => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <section>
        <TemplateSelector 
          data={data} 
          onTemplateSelect={(templateName) => {
            console.log('Template selected, fetching data...', templateName);
            onTemplateSelect(templateName);
          }} 
        />
      </section>
    </div>
  );
};

export default PreviewPage;
