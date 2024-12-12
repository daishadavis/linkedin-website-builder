import React from "react";

const Template1 = ({data}) => {
    return (
        <div className="template1-container">
          <h1>{data?.header?.name}</h1>
          <h2>{data?.header?.headline}</h2>
          <p><strong>Location:</strong> {data?.header?.location}</p>
    
          <h3>Summary</h3>
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

export default Template1