import React from 'react'

const TemplatePreview = ({ data }) => {
    return (
        <div className="template-preview-container">
          <h1 className="template-preview-title" >{data?.header?.name}</h1>
          <h2 className="template-preview-headline" >{data?.header?.headline}</h2>
          <p className="template-preview-summary" >{data?.summary?.join(' ')}</p>
          <h3 className="template-preview-experience-title" >Classic</h3>
          <ul className="template-preview-experience-list" >
            {data?.experience?.map((job, index) => (
              <li key={index} className="template-preview-experience-item">
                <strong className="experience-company">{job.company}</strong> - {job.position}
                <p className="experience-duration">{job.duration}</p>
              </li>
            ))}
          </ul>
        </div>
      );
}

export default TemplatePreview