import React from 'react';
import { educationData } from '../data/timelineData';
import useScrollReveal from '../hooks/useScrollReveal';

const Edus = () => {
  return (
    <div className="section">
      <h2>Education</h2>
      {educationData.map((edu) => (
        <TimelineEntry key={edu.id} entry={edu} />
      ))}
    </div>
  );
};

const TimelineEntry = ({ entry }) => {
  const [ref, visible] = useScrollReveal(0.2);
  return (
    <div ref={ref} className={`timeline-entry ${visible ? 'visible' : ''}`}>
      <h3>{entry.title}</h3>
      <p>{entry.institution}</p>
      <small>{entry.date}</small>
      <p>{entry.description}</p>
    </div>
  );
};

export default Edus;