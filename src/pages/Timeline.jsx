import React, { useState } from 'react';
import st from '../styles/App.module.scss';
import useScrollReveal from '../hooks/useScrollReveal';

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
    title: 'Arduino Gameboy',
    subtitle: 'Embedded gaming device',
    description:
      'Built a retro game emulator on Arduino with C++ and custom display driver. Designed PCB and wrote firmware for input handling.',
  },
];

function Timeline() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [ref, visible] = useScrollReveal();

  const handleToggle = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="timeline" className={st.container}>
      <div ref={ref} className={`${st.reveal} ${visible ? st.visible : ''}`}>
        <h2>Timeline</h2>
        <div className={st.timeline}>
          {timelineData.map((entry, index) => (
            <div
              key={entry.id}
              className={`${st.node} ${expandedIndex === index ? st.expanded : ''}`}
              onClick={() => handleToggle(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleToggle(index);
                }
              }}
              aria-expanded={expandedIndex === index}
            >
              <div className={st.dot}>
                <span className={st.dotInner} />
              </div>
              <div className={st.line} />
              <div className={st.content}>
                <div className={st.header}>
                  <span className={st.date}>{entry.date}</span>
                  <h3>{entry.title}</h3>
                </div>
                {expandedIndex === index && (
                  <div className={st.details}>
                    <p className={st.subtitle}>{entry.subtitle}</p>
                    <p className={st.description}>{entry.description}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Timeline;