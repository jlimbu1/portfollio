import React, { useState } from 'react';
import st from '../styles/App.module.scss';
import useScrollReveal from '../hooks/useScrollReveal';

/**
 * Timeline entries data.
 * Replace with dynamic import or prop when integrating.
 */
const timelineData = [
  {
    id: 'edu-1',
    type: 'education',
    date: '2016 - 2021',
    title: 'B.Eng. in Computer Science',
    subtitle: 'The Hong Kong Polytechnic University',
    description:
      'Focused on software engineering, data structures, and algorithms. Completed a capstone project on IoT systems.',
  },
  {
    id: 'exp-1',
    type: 'experience',
    date: '2021 - Present',
    title: 'Software Engineer',
    subtitle: 'DIY ROCKS (Hong Kong)',
    description:
      'Leading frontend development for 3D jewellery configurators and a white-label multi-tenant platform. Built interactive 3D viewers using Three.js and Vue 3. Migrated legacy codebase to TypeScript.',
  },
  {
    id: 'exp-2',
    type: 'experience',
    date: '2019 - 2021',
    title: 'Junior Developer',
    subtitle: 'StartupXYZ',
    description:
      'Developed B2B dashboards with React and Node.js. Implemented real-time data sync using WebSockets.',
  },
  {
    id: 'proj-1',
    type: 'project',
    date: '2023',
    title: 'WealthSkey',
    subtitle: 'Full-stack financial dashboard',
    description:
      'Next.js app with server-side rendering, PostgreSQL, and Chart.js visualizations. Implemented role-based access control.',
  },
  {
    id: 'proj-2',
    type: 'project',
    date: '2022',
    title: 'ARM MOOC Platform',
    subtitle: 'Online learning platform',
    description:
      'Built with Vue 3, Flask, and MongoDB. Features course enrollment, video streaming, and progress tracking.',
  },
  {
    id: 'proj-3',
    type: 'project',
    date: '2021',
    title: 'Arduino GameBoy',
    subtitle: 'Embedded systems project',
    description:
      'C/C++ firmware for a handheld gaming device with LCD display, buttons, and sound output using Arduino Mega.',
  },
];

/**
 * Interactive Timeline component.
 * Displays a vertical timeline with expandable nodes.
 * Accordion behavior: only one node open at a time.
 * @param {Array} [data=timelineData] - Array of timeline entries.
 */
function Timeline({ data = timelineData }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [ref, visible] = useScrollReveal();

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div id="timeline" className={st.container}>
        <p className={st.emptyMessage}>No timeline entries to display.</p>
      </div>
    );
  }

  const handleToggle = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const typeIcon = (type) => {
    switch (type) {
      case 'education':
        return 'fa-graduation-cap';
      case 'experience':
        return 'fa-briefcase';
      case 'project':
        return 'fa-code';
      default:
        return 'fa-circle';
    }
  };

  return (
    <div id="timeline" className={st.container}>
      <div
        ref={ref}
        className={`${st.reveal} ${visible ? st.visible : ''} ${st.timelineWrapper}`}
      >
        <h2>Timeline</h2>
        <div className={st.timeline}>
          {data.map((entry, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <div
                key={entry.id}
                className={`${st.timelineNode} ${isExpanded ? st.timelineNodeExpanded : ''}`}
              >
                {/* Dot + line */}
                <div className={st.timelineMarker}>
                  <div className={st.timelineDot} />
                  {index < data.length - 1 && <div className={st.timelineLine} />}
                </div>

                {/* Content card */}
                <div
                  className={st.timelineCard}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  onClick={() => handleToggle(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleToggle(index);
                    }
                  }}
                >
                  <div className={st.timelineCardHeader}>
                    <span className={st.timelineDate}>{entry.date}</span>
                    <span className={st.timelineType}>
                      <i className={`fas ${typeIcon(entry.type)}`} />
                    </span>
                  </div>
                  <h3 className={st.timelineTitle}>{entry.title}</h3>
                  <p className={st.timelineSubtitle}>{entry.subtitle}</p>
                  <div
                    className={`${st.timelineContent} ${isExpanded ? st.timelineContentVisible : ''}`}
                  >
                    <p>{entry.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Timeline;