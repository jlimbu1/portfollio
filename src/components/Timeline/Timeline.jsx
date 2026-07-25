import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faBriefcase, faCode } from '@fortawesome/free-solid-svg-icons';
import useScrollReveal from '../../hooks/useScrollReveal';
import TimelineNode from './TimelineNode';
import { educationData, experienceData, projectData } from '../../data/timelineData';
import st from '../../styles/Timeline.module.scss';

const TYPE_CONFIG = {
  education: { icon: faGraduationCap, label: 'Education' },
  experience: { icon: faBriefcase, label: 'Experience' },
  project: { icon: faCode, label: 'Project' },
};

function mergeAndSort() {
  const all = [
    ...educationData.map((e) => ({ ...e, type: 'education' })),
    ...experienceData.map((e) => ({ ...e, type: 'experience' })),
    ...projectData.map((e) => ({ ...e, type: 'project' })),
  ];
  return all.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function Timeline() {
  const [sectionRef, sectionVisible] = useScrollReveal();
  const entries = mergeAndSort();

  if (!entries || entries.length === 0) {
    return (
      <section
        id="timeline"
        className={st.timeline}
        aria-label="Career timeline"
        role="region"
      >
        <div className={st.timelineEmpty} role="status">
          No timeline entries available.
        </div>
      </section>
    );
  }

  return (
    <section
      id="timeline"
      className={st.timeline}
      aria-label="Career timeline"
      role="region"
    >
      <h2 className={st.timelineHeading}>Timeline</h2>
      <div
        ref={sectionRef}
        className={`${st.timelineTrack} ${sectionVisible ? st.timelineTrackVisible : ''}`}
        role="list"
        aria-label="Timeline entries"
      >
        {entries.map((entry, index) => {
          const config = TYPE_CONFIG[entry.type] || TYPE_CONFIG.project;
          const isLeft = index % 2 === 0;

          return (
            <TimelineNode
              key={`${entry.type}-${entry.title}-${entry.date}`}
              entry={entry}
              icon={config.icon}
              typeLabel={config.label}
              isLeft={isLeft}
              index={index}
            />
          );
        })}
      </div>
    </section>
  );
}

Timeline.propTypes = {};

export default Timeline;