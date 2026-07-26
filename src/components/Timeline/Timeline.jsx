import React, { useMemo } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { educationData, experienceData, projectData } from '../../data/timelineData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGraduationCap,
  faBriefcase,
  faLaptopCode
} from '@fortawesome/free-solid-svg-icons';
import styles from './Timeline.module.scss';

const typeConfig = {
  education: {
    icon: faGraduationCap,
    label: 'Education',
    color: '#4caf50'
  },
  experience: {
    icon: faBriefcase,
    label: 'Experience',
    color: '#2196f3'
  },
  project: {
    icon: faLaptopCode,
    label: 'Project',
    color: '#ff9800'
  }
};

const parseStartYear = (dateStr) => {
  const clean = dateStr.trim();
  const matches = clean.match(/^(\d{4})/);
  return matches ? parseInt(matches[1], 10) : 0;
};

const Timeline = () => {
  const allEntries = useMemo(() => {
    const entries = [
      ...educationData.map(e => ({ ...e })),
      ...experienceData.map(e => ({ ...e })),
      ...projectData.map(e => ({ ...e }))
    ];
    return entries.sort((a, b) => parseStartYear(a.date) - parseStartYear(b.date));
  }, []);

  return (
    <div className={styles.timeline} role="list" aria-label="Career Timeline">
      {allEntries.map((entry, index) => (
        <TimelineItem
          key={entry.id}
          entry={entry}
          isEven={index % 2 === 0}
          config={typeConfig[entry.type]}
        />
      ))}
    </div>
  );
};

const TimelineItem = ({ entry, isEven, config }) => {
  const [ref, visible] = useScrollReveal(0.2);
  const itemClasses = `${styles.item} ${visible ? styles.visible : styles.hidden} ${isEven ? styles.left : styles.right}`;

  return (
    <div
      ref={ref}
      className={itemClasses}
      role="listitem"
      aria-label={`${config.label}: ${entry.title}`}
    >
      <div className={styles.dateBadge}>
        <span className={styles.dateText}>{entry.date}</span>
      </div>
      <div className={styles.card}>
        <div className={styles.iconWrapper} style={{ color: config.color }}>
          <FontAwesomeIcon icon={config.icon} size="lg" />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{entry.title}</h3>
          <p className={styles.org}>{entry.institution || entry.organization}</p>
          <p className={styles.description}>{entry.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Timeline;