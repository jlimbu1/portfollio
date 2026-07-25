import React from 'react';
import st from '../styles/App.module.scss';
import useScrollReveal from '../hooks/useScrollReveal';
import TimelineEntry from './TimelineEntry';
import timelineData from '../data/timelineData';

function Timeline() {
  const [ref, visible] = useScrollReveal();

  return (
    <div id="timeline" className={st.container}>
      <div ref={ref} className={`${st.reveal} ${visible ? st.visible : ''}`}>
        <h2>Timeline</h2>
        {timelineData.map((entry, index) => (
          <TimelineEntry key={index} entry={entry} />
        ))}
      </div>
    </div>
  );
}

export default Timeline;