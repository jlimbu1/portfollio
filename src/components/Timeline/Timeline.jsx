import React, { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faBriefcase, faCode } from '@fortawesome/free-solid-svg-icons';
import useScrollReveal from '../../hooks/useScrollReveal';
import { educationData, experienceData, projectData } from '../../data/timelineData';
import styles from './Timeline.module.scss';

const typeConfig = {
  education: { icon: faGraduationCap, label: 'Education' },
  experience: { icon: faBriefcase, label: 'Work' },
  project: { icon: faCode, label: 'Project' }
};

const getStartYear = (dateStr) => {
  const match = dateStr.match(/^(\d{4})/);
  return match ? parseInt(match[1], 10) : 0;
};

const Timeline = () => {
  const entries = useMemo(() => {
    const all = [
      ...educationData.map(e => ({ ...e, type: 'education' })),
      ...experienceData.map(e => ({ ...e, type: 'experience' })),
      ...projectData.map(e => ({ ...e, type: 'project' }))
    ];
    return all.sort((a, b) => getStartYear(a.date) - getStartYear(b.date));
  }, []);

  return (
    <section id="timeline" className={styles.timelineSection}>
      <h2 className={styles.heading}>Timeline</h2>
      <ul className={styles.timeline} role="list">
        {entries.map((entry, index) => {
          const [ref, isVisible] = useScrollReveal({ threshold: 0.2 });
          const isLeft = index % 2 === 0;
          return (
            <li
              key={entry.id}
              ref={ref}
              className={`${styles.entry} ${isLeft ? styles.left : styles.right} ${isVisible ? styles.visible : ''}`}
              role="listitem"
              data-visible={isVisible ? 'true' : 'false'}
              aria-label={`${entry.type} entry: ${entry.title}`}
            >
              <div className={styles.dateBadge} aria-hidden="true">
                <span className={styles.dateText}>{entry.date}</span>
              </div>
              <div className={styles.icon}>
                <FontAwesomeIcon icon={typeConfig[entry.type].icon} aria-hidden="true" />
                <span className={styles.iconLabel}>{typeConfig[entry.type].label}</span>
              </div>
              <div className={styles.content}>
                <h3 className={styles.title}>{entry.title}</h3>
                <h4 className={styles.subtitle}>
                  {entry.institution || entry.organization || 'Project'}
                </h4>
                <p className={styles.description}>{entry.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Timeline;