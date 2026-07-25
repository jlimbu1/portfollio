import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useScrollReveal from '../../hooks/useScrollReveal';
import st from '../../styles/Timeline.module.scss';

function TimelineNode({
  entry,
  config,
  isLeft,
  index,
  sectionVisible,
}) {
  const [nodeRef, nodeVisible] = useScrollReveal();
  const isVisible = sectionVisible && nodeVisible;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const link = e.currentTarget.querySelector('a');
      if (link) {
        link.click();
      }
    }
  };

  const hasLink = entry.link && entry.link.trim().length > 0;

  return (
    <div
      ref={nodeRef}
      className={`${st.timelineNode} ${isLeft ? st.timelineNodeLeft : st.timelineNodeRight} ${isVisible ? st.timelineNodeVisible : ''}`}
      role="listitem"
      aria-label={`${config.label}: ${entry.title}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div
        className={st.timelineCard}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-label={`${config.label} entry: ${entry.title}. ${entry.description || ''}`}
      >
        <div className={st.timelineCardHeader}>
          <span className={st.timelineTypeBadge} aria-hidden="true">
            <FontAwesomeIcon icon={config.icon} aria-hidden="true" />
            <span className={st.timelineTypeLabel}>{config.label}</span>
          </span>
          <time
            className={st.timelineDate}
            dateTime={entry.date}
            aria-label={`Date: ${entry.date}`}
          >
            {entry.date}
          </time>
        </div>

        <h3 className={st.timelineCardTitle}>{entry.title}</h3>

        {entry.subtitle && (
          <p className={st.timelineCardSubtitle}>{entry.subtitle}</p>
        )}

        {entry.description && (
          <p className={st.timelineCardDescription}>{entry.description}</p>
        )}

        {entry.technologies && entry.technologies.length > 0 && (
          <div className={st.timelineTechList} aria-label="Technologies used">
            {entry.technologies.map((tech) => (
              <span key={tech} className={st.timelineTechTag}>
                {tech}
              </span>
            ))}
          </div>
        )}

        {hasLink && (
          <a
            href={entry.link}
            className={st.timelineCardLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${entry.title} (opens in new tab)`}
          >
            View Project
            <svg
              className={st.timelineExternalIcon}
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        )}
      </div>

      <div className={st.timelineDot} aria-hidden="true">
        <FontAwesomeIcon icon={config.icon} />
      </div>
    </div>
  );
}

TimelineNode.propTypes = {
  entry: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string,
    subtitle: PropTypes.string,
    link: PropTypes.string,
    technologies: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  config: PropTypes.shape({
    icon: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  isLeft: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  sectionVisible: PropTypes.bool.isRequired,
};

export default React.memo(TimelineNode);