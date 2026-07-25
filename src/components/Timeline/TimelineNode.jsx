import React from 'react';
import PropTypes from 'prop-types';
import styles from './Timeline.module.scss';

function TimelineNode({ entry, config, position, index }) {
  if (!entry) {
    return null;
  }

  const {
    id,
    title,
    institution,
    organization,
    date,
    description,
    type,
  } = entry;

  const subtitle = institution || organization || '';
  const nodePosition = position || (index % 2 === 0 ? 'left' : 'right');
  const iconClass = config?.icon || 'fas fa-code';
  const typeLabel = config?.label || 'Entry';

  return (
    <div
      className={`${styles.timelineNode} ${styles[nodePosition]}`}
      role="listitem"
      aria-label={`${typeLabel}: ${title}`}
      tabIndex={0}
    >
      <div className={styles.timelineNodeMarker} aria-hidden="true">
        <i className={iconClass} />
      </div>
      <div className={styles.timelineNodeCard}>
        <div className={styles.timelineNodeHeader}>
          <span className={styles.timelineNodeType}>{typeLabel}</span>
          <span className={styles.timelineNodeDate}>{date}</span>
        </div>
        <h3 className={styles.timelineNodeTitle}>{title}</h3>
        {subtitle && (
          <p className={styles.timelineNodeSubtitle}>{subtitle}</p>
        )}
        {description && (
          <p className={styles.timelineNodeDescription}>{description}</p>
        )}
      </div>
    </div>
  );
}

TimelineNode.propTypes = {
  entry: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    institution: PropTypes.string,
    organization: PropTypes.string,
    date: PropTypes.string.isRequired,
    description: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  config: PropTypes.shape({
    icon: PropTypes.string,
    label: PropTypes.string,
  }),
  position: PropTypes.oneOf(['left', 'right']),
  index: PropTypes.number,
};

TimelineNode.defaultProps = {
  config: {
    icon: 'fas fa-code',
    label: 'Entry',
  },
  position: undefined,
  index: 0,
};

export default React.memo(TimelineNode);