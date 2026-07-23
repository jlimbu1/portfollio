import React from 'react';
import PropTypes from 'prop-types';
import styles from './Timeline.module.scss';

function TimelineItem({ item, isOpen, onToggle }) {
  const { title, subtitle, date, content } = item;
  const contentId = `timeline-content-${item.id}`;
  const headerId = `timeline-header-${item.id}`;

  const hasContent = content != null;

  return (
    <div className={styles.node}>
      <div className={styles.dot} />
      <div className={styles.card}>
        <button
          id={headerId}
          className={styles.header}
          onClick={hasContent ? onToggle : undefined}
          aria-expanded={hasContent ? isOpen : undefined}
          aria-controls={hasContent ? contentId : undefined}
          tabIndex={hasContent ? 0 : -1}
          disabled={!hasContent}
        >
          <div className={styles.headerInfo}>
            <h3 className={styles.title}>{title}</h3>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            {date && <span className={styles.date}>{date}</span>}
          </div>
          {hasContent && (
            <span
              className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}
              aria-hidden="true"
            />
          )}
        </button>
        <div
          id={contentId}
          className={`${styles.content} ${isOpen ? styles.contentOpen : ''}`}
          role="region"
          aria-labelledby={headerId}
          hidden={!isOpen}
        >
          <div className={styles.contentInner}>
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}

TimelineItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    date: PropTypes.string,
    content: PropTypes.node,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default TimelineItem;