import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faBriefcase, faCode } from '@fortawesome/free-solid-svg-icons';
import { educationData, experienceData, projectData } from '../data/timelineData';
import TimelineEntry from './TimelineEntry';
import useScrollReveal from '../hooks/useScrollReveal';
import st from '../styles/Timeline.module.scss';

const TYPE_CONFIG = {
  education: { icon: faGraduationCap, label: 'Education' },
  experience: { icon: faBriefcase, label: 'Experience' },
  project: { icon: faCode, label: 'Project' },
};

function mergeAndSortEntries() {
  const all = [
    ...educationData.map((e) => ({ ...e, type: 'education' })),
    ...experienceData.map((e) => ({ ...e, type: 'experience' })),
    ...projectData.map((e) => ({ ...e, type: 'project' })),
  ];

  return all.sort((a, b) => {
    const dateA = a.startDate || a.date || '';
    const dateB = b.startDate || b.date || '';
    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;
    return new Date(dateB) - new Date(dateA);
  });
}

function Timeline() {
  const [ref, visible] = useScrollReveal();
  const entries = mergeAndSortEntries();

  if (!entries || entries.length === 0) {
    return (
      <section id="timeline" className={st.timeline}>
        <div className={st.timelineEmpty}>
          <p>No timeline entries available.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="timeline" className={st.timeline}>
      <div ref={ref} className={`${st.timelineInner} ${st.reveal} ${visible ? st.visible : ''}`}>
        <h2 className={st.timelineHeading}>Timeline</h2>
        <div className={st.timelineLine} aria-hidden="true" />
        <div className={st.timelineList}>
          {entries.map((entry, index) => {
            const config = TYPE_CONFIG[entry.type] || TYPE_CONFIG.project;
            const side = index % 2 === 0 ? 'left' : 'right';

            return (
              <TimelineEntry
                key={entry.id || `${entry.type}-${index}`}
                entry={entry}
                icon={config.icon}
                typeLabel={config.label}
                side={side}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Timeline;