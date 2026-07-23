import React from 'react';
import PropTypes from 'prop-types';
import useExpandCollapse from '../../hooks/useExpandCollapse';
import TimelineItem from './TimelineItem';
import styles from './Timeline.module.scss';

function Timeline({ items = [], allowMultiple = false }) {
  const [openIds, toggleItem] = useExpandCollapse({ allowMultiple });

  if (!items || items.length === 0) {
    return (
      <div className={styles.timeline}>
        <p className={styles.emptyMessage}>No timeline items to display.</p>
      </div>
    );
  }

  return (
    <div className={styles.timeline}>
      <div className={styles.line} />
      <ul className={styles.list}>
        {items.map((item) => {
          const isOpen = openIds.has(item.id);
          return (
            <li key={item.id} className={styles.item}>
              <TimelineItem
                item={item}
                isOpen={isOpen}
                onToggle={() => toggleItem(item.id)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

Timeline.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string,
      date: PropTypes.string,
      content: PropTypes.node,
    })
  ),
  allowMultiple: PropTypes.bool,
};

export default Timeline;