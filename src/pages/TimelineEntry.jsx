import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faBriefcase, faCode } from '@fortawesome/free-solid-svg-icons';
import st from '../styles/Timeline.module.scss';

const TYPE_CONFIG = {
  education: { icon: faGraduationCap, label: 'Education' },
  experience: { icon: faBriefcase, label: 'Experience' },
  project: { icon: faCode, label: 'Project' },
};

function TimelineEntry({ entry, side, index }) {
  if (!entry) {
    return null;
  }

  const config = TYPE_CONFIG[entry.type] || TYPE_CONFIG.project;
  const dateText = entry.startDate || entry.date || '';
  const title = entry.title || entry.name || entry.degree || '';
  const subtitle = entry.subtitle || entry.company || entry.school || entry.organization || '';
  const description = entry.description || entry.summary || '';

  return (
    <div
      className={`${st.timelineEntry} ${st[`timelineEntry${side.charAt(0).toUpperCase() + side.slice(1)}`]}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className={st.timelineEntryBadge}>
        <FontAwesomeIcon icon={config.icon} className={st.timelineEntryIcon} aria-hidden="true" />
        <span className={st.timelineEntryType}>{config.label}</span>
      </div>

      <div className={st.timelineEntryCard}>
        {dateText && (
          <time className={st.timelineEntryDate} dateTime={dateText}>
            {dateText}
          </time>
        )}
        {title && <h3 className={st.timelineEntryTitle}>{title}</h3>}
        {subtitle && <p className={st.timelineEntrySubtitle}>{subtitle}</p>}
        {description && <p className={st.timelineEntryDescription}>{description}</p>}
      </div>

      <div className={st.timelineEntryDot} aria-hidden="true" />
    </div>
  );
}

export default TimelineEntry;