import React from 'react'

const TemplatePreview = ({ data}) => {
    return (
        <div>
          <h1>{data?.header?.name}</h1>
          <h2>{data?.header?.headline}</h2>
          <p>{data?.summary?.join(' ')}</p>
          <h3>Experience</h3>
          <ul>
            {data?.experience?.map((job, index) => (
              <li key={index}>
                <strong>{job.company}</strong> - {job.position}
                <p>{job.duration}</p>
              </li>
            ))}
          </ul>
        </div>
      );
}

export default TemplatePreview