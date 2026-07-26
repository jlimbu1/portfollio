import React from 'react';
import TimelineComponent from '../components/Timeline/Timeline';
import styles from './Timeline.module.scss';

const TimelinePage = () => {
  return (
    <section id="timeline" className={styles.timeline}>
      <h2 className={styles.title}>Timeline</h2>
      <TimelineComponent />
    </section>
  );
};

export default TimelinePage;