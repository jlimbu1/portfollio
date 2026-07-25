import React from 'react';
import PropTypes from 'prop-types';
import TimelineNode from './TimelineNode';
import { educationData, experienceData, projectData } from '../../data/timelineData';
import useScrollReveal from '../../hooks/useScrollReveal';
import styles from './Timeline.module.scss';

const TYPE_CONFIG = {
  education: {
    icon: 'fas fa-graduation-cap',
    label: 'Education',
  },
  experience: {
    icon: 'fas fa-briefcase',
    label: 'Experience',
  },
  project: {
    icon: 'fas fa-code',
    label: 'Project',
  },
};

function mergeAndSortEntries() {
  const allEntries = [...educationData, ...experienceData, ...projectData];
  return allEntries.sort((a, b) => {
    const yearA = parseInt(a.date.match(/\d{4}/)?.[0] || '0', 10);
    const yearB = parseInt(b.date.match(/\d{4}/)?.[0] || '0', 10);
    return yearB - yearA;
  });
}

function Timeline() {
  const [sectionRef, sectionVisible] = useScrollReveal();
  const entries = mergeAndSortEntries();

  if (!entries || entries.length === 0) {
    return (
      <section id="timeline" className={styles.timeline} aria-label="Timeline">
        <div className={styles.timelineInner}>
          <h2 className={styles.timelineHeading}>Timeline</h2>
          <p className={styles.timelineEmpty}>No timeline entries available.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="timeline" className={styles.timeline} aria-label="Timeline">
      <div
        ref={sectionRef}
        className={`${styles.timelineInner} ${styles.reveal} ${sectionVisible ? styles.visible : ''}`}
      >
        <h2 className={styles.timelineHeading}>Timeline</h2>
        <div className={styles.timelineTrack} role="list">
          {entries.map((entry, index) => {
            const config = TYPE_CONFIG[entry.type] || TYPE_CONFIG.project;
            const position = index % 2 === 0 ? 'left' : 'right';

            return (
              <TimelineNode
                key={entry.id}
                entry={entry}
                position={position}
                icon={config.icon}
                typeLabel={config.label}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

Timeline.propTypes = {};

export default Timeline;