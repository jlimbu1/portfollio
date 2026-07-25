import React from 'react';
import { experienceData } from '../data/timelineData';
import useScrollReveal from '../hooks/useScrollReveal';

const Exps = () => {
  return (
    <div className="section">
      <h2>Experience</h2>
      {experienceData.map((exp) => (
        <TimelineEntry key={exp.id} entry={exp} />
      ))}
    </div>
  );
};

const TimelineEntry = ({ entry }) => {
  const [ref, visible] = useScrollReveal(0.2);
  return (
    <div ref={ref} className={`timeline-entry ${visible ? 'visible' : ''}`}>
      <h3>{entry.title}</h3>
      <p>{entry.organization}</p>
      <small>{entry.date}</small>
      <p>{entry.description}</p>
    </div>
  );
};

export default Exps;