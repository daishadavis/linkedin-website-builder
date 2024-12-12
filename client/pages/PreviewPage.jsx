import React from 'react'
import Header from '../components/Header'
import TemplateSelector from '../components/TemplateSelector';

const PreviewPage = ({data, onTemplateSelect}) => {
  return (
    <div>
      <Header />
      <TemplateSelector data={data} onTemplateSelect={onTemplateSelect} />
    </div>
  );
}

export default PreviewPage