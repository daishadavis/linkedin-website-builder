import React from "react";

const Template1 = ({data}) => {
    if (!data) {
        return <p>Loading...</p>; // Handle loading state
      }
    
      // Helper function to split and group experience into meaningful sections
      const formatExperience = (experienceArray) => {
        const groupedExperience = [];
        let currentExperience = [];
        
        experienceArray.forEach((line) => {
          if (line.match(/^[A-Z]/)) {
            // Start of a new experience section
            if (currentExperience.length > 0) {
              groupedExperience.push([...currentExperience]);
            }
            currentExperience = [line];
          } else {
            // Add to the current experience section
            currentExperience.push(line);
          }
        });
    
        // Push the last grouped experience
        if (currentExperience.length > 0) {
          groupedExperience.push([...currentExperience]);
        }
    
        return groupedExperience;
      };
    
      const experienceData = formatExperience(data.experience);
    
      return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto mt-10">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">{data.header.name}</h1>
          <h2 className="text-xl text-gray-700 mb-1">{data.header.headline}</h2>
          <p className="text-gray-500 mb-4"><strong>Location:</strong> {data.header.location}</p>

          <section className="mb-6">
          <h3 className="text-2xl font-semibold text-blue-500 mb-2">Summary</h3>
          <p className="text-gray-600">{data.summary.join(' ')}</p>
          </section>

          <section className="mb-6">
          <h3 className="text-2xl font-semibold text-blue-500 mb-2">Experience</h3>
          <ul className="space-y-4">
            {experienceData.map((job, index) => (
              <li key={index} className="border-l-4 border-blue-300 pl-4">
                <h4 className="text-lg font-bold text-gray-800">{job[0]}</h4>
                <p className="text-gray-600">{job.slice(1).join(' ')}</p>
              </li>
            ))}
          </ul>
          </section>
          
          <section className="mb-6">
          <h3 className="text-2xl font-semibold text-blue-500 mb-2">Education</h3>
          <ul className="list-disc pl-6 text-gray-600">
            {data.education.map((edu, index) => (
              <li key={index}>{edu}</li>
            ))}
          </ul>
          </section>
          
          <section className="mb-6">
          <h3 className="text-2xl font-semibold text-blue-500 mb-2">Skills</h3>
          <ul className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <li key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{skill}</li>
            ))}
          </ul>
          </section>

        </div>
      );
    };


export default Template1