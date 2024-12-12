import React from 'react'
import TemplatePreview from './TemplatePreview';

const TemplateSelector = ({data, onTemplateSelect}) => {
    return (
        <div>
          <h2>Select Template</h2>
          <div onClick={() => onTemplateSelect('template1')}>
            <h3>Template 1</h3>
            <TemplatePreview data={data} />
          </div>
        </div>
      );
}

export default TemplateSelector