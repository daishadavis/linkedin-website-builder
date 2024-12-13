import React from 'react'
import TemplatePreview from './TemplatePreview';

const TemplateSelector = ({data, onTemplateSelect}) => {
    return (
        <div className="p-6 bg-gray-100 rounded-md shadow-md" >
          <h2 className="text-2xl font-bold text-gray-800 mb-4" >Select Template</h2>
          <div className="cursor-pointer p-4 border border-gray-300 rounded-md hover:bg-gray-200 transition duration-300 ease-in-out" onClick={() => onTemplateSelect('template1')}>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Template 1</h3>
            <TemplatePreview data={data} />
          </div>
        </div>
      );
}

export default TemplateSelector