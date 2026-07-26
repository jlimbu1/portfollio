import React from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import { educationData, experienceData, projectData } from '../../data/timelineData';
import styles from './Timeline.module.scss';

const Timeline = () => {
  const [ref, isVisible] = useScrollReveal();

  const entries = [...educationData, ...experienceData, ...projectData];

  return (
    <section className={styles.timeline}>
      <h2>Timeline</h2>
      <ul ref={ref}>
        {entries.map((entry) => (
          <li key={entry.id} data-visible={isVisible} role="listitem">
            <h3>{entry.title}</h3>
            <p>{entry.institution || entry.organization}</p>
            <p>{entry.date}</p>
            <p>{entry.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Timeline;