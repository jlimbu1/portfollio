import React from 'react';
import { projectData } from '../data/timelineData';
import useScrollReveal from '../hooks/useScrollReveal';

const Projects = () => {
  return (
    <div className="section">
      <h2>Projects</h2>
      {projectData.map((proj) => (
        <TimelineEntry key={proj.id} entry={proj} />
      ))}
    </div>
  );
};

const TimelineEntry = ({ entry }) => {
  const [ref, visible] = useScrollReveal(0.2);
  return (
    <div ref={ref} className={`timeline-entry ${visible ? 'visible' : ''}`}>
      <h3>{entry.title}</h3>
      <small>{entry.date}</small>
      <p>{entry.description}</p>
    </div>
  );
};

export default Projects;