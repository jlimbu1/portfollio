import React from 'react';
import st from '../styles/App.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGraduationCap,
  faBriefcase,
  faCode,
  faCalendarAlt,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';

const typeConfig = {
  education: {
    icon: faGraduationCap,
    label: 'Education',
  },
  experience: {
    icon: faBriefcase,
    label: 'Experience',
  },
  project: {
    icon: faCode,
    label: 'Project',
  },
};

function TimelineEntry({ entry, index, totalEntries }) {
  const config = typeConfig[entry.type] || typeConfig.project;
  const isLeft = index % 2 === 0;
  const sideClass = isLeft ? st.timelineEntryLeft : st.timelineEntryRight;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (entry.link) {
        window.open(entry.link, '_blank', 'noopener,noreferrer');
      }
    }
  };

  const entryId = `timeline-entry-${index}`;

  return (
    <div
      className={`${st.timelineEntry} ${sideClass}`}
      role="article"
      aria-labelledby={`${entryId}-title`}
      aria-describedby={`${entryId}-desc`}
    >
      <div className={st.timelineEntryDot} aria-hidden="true">
        <FontAwesomeIcon icon={config.icon} />
      </div>

      <div
        className={st.timelineEntryCard}
        tabIndex={0}
        role={entry.link ? 'link' : 'region'}
        aria-label={`${config.label}: ${entry.title} at ${entry.organization || entry.subtitle || ''}`}
        onKeyDown={handleKeyDown}
      >
        <div className={st.timelineEntryHeader}>
          <span className={st.timelineEntryType} aria-hidden="true">
            <FontAwesomeIcon icon={config.icon} /> {config.label}
          </span>
          <span className={st.timelineEntryDate} aria-label={`Date: ${entry.date}`}>
            <FontAwesomeIcon icon={faCalendarAlt} aria-hidden="true" /> {entry.date}
          </span>
        </div>

        <h3 id={`${entryId}-title`} className={st.timelineEntryTitle}>
          {entry.title}
        </h3>

        {entry.organization && (
          <p className={st.timelineEntryOrg}>
            <FontAwesomeIcon icon={faMapMarkerAlt} aria-hidden="true" /> {entry.organization}
          </p>
        )}

        {entry.subtitle && !entry.organization && (
          <p className={st.timelineEntryOrg}>{entry.subtitle}</p>
        )}

        <p id={`${entryId}-desc`} className={st.timelineEntryDesc}>
          {entry.description}
        </p>

        {entry.tags && entry.tags.length > 0 && (
          <div className={st.timelineEntryTags} aria-label="Technologies used">
            {entry.tags.map((tag) => (
              <span key={tag} className={st.timelineEntryTag}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {entry.link && (
          <a
            href={entry.link}
            target="_blank"
            rel="noopener noreferrer"
            className={st.timelineEntryLink}
            aria-label={`View ${entry.title} (opens in new tab)`}
            tabIndex={-1}
          >
            View Project
          </a>
        )}
      </div>

      <div className={st.timelineEntryLine} aria-hidden="true" />
    </div>
  );
}

export default TimelineEntry;