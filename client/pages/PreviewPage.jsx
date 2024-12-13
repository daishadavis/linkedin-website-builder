import React from 'react'
import Header from '../components/Header'
import TemplateSelector from '../components/TemplateSelector';

const PreviewPage = ({data, onTemplateSelect}) => {
    return (
        <div className=''>

          <header className=''>
          <Header />
          </header>

          <section className=''>
          <TemplateSelector 
            data={data} 
            onTemplateSelect={() => {
              console.log('Template selected, fetching data...');
              onTemplateSelect(); // Trigger fetchExtractedData in App.jsx
            }} 
          />
          </section>

        </div>
      );
}

export default PreviewPage