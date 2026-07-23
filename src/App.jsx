// --- src/App.jsx ---
import st from './styles/App.module.scss'
import Nav from './pages/Nav';
import Abouts from './pages/Abouts';
import Timeline from './pages/Timeline';
import Skills from './pages/Skills';
import Footer from './pages/Footer';

function App() {
  return (
    <div className={st.App}>
      <Nav />
      <main className={st.main_container}>
        <Abouts />
        <Timeline />
        <Skills />
        <Footer />
      </main>
    </div>
  );
}

export default App;

// --- src/data/timelineData.js ---
const timelineData = [
  {
    id: 'edu-1',
    type: 'education',
    title: 'Bachelor of Engineering in Computer Engineering',
    organization: 'HKUST',
    date: 'Sept 2019 - Aug 2022',
    description: 'Relevant Courses: Internet Computing, Mobile Application Development, Discrete Mathematical Tools for Computer Science, Industrial Experience.',
    image: 'https://i.imgur.com/gAcsR1B.png',
    details: [
      'Internet Computing',
      'Mobile Application Development',
      'Discrete Mathematical Tools for Computer Science',
      'Industrial Experience'
    ]
  },
  {
    id: 'edu-2',
    type: 'education',
    title: 'Associate of Engineering',
    organization: 'CCCU',
    date: 'Sept 2017 - Aug 2019',
    description: 'Relevant Courses: Introduction to Programming, Object-Oriented Programming and Design, Data Structure and Algorithms.',
    image: 'https://i.imgur.com/mignBUa.png',
    details: [
      'Introduction to Programming',
      'Object-Oriented Programming and Design',
      'Data Structure and Algorithms'
    ]
  },
  {
    id: 'exp-1',
    type: 'experience',
    title: 'Frontend Data Engineer',
    organization: 'DIY ROCKS (HK) Limited',
    date: 'Jan 2026 - Present',
    description: 'Act as technical liaison between product, external dev teams, and internal stakeholders. Manage white-label order systems. Coordinate across branches including China production team.',
    image: '',
    details: [
      'Act as technical liaison between product, external dev teams, and internal stakeholders, translating business requirements into actionable specifications.',
      'Manage white-label order systems, verifying configurator apps transmit accurate data to factory production pipelines.',
      'Coordinate across branches including China production team to ensure SKUs, pricing, and configurations are consistent.'
    ]
  },
  {
    id: 'proj-1',
    type: 'project',
    title: 'Ticket Challenger',
    organization: '',
    date: '',
    description: 'An online ticket purchasing experience simulator to practice ticket-nabbing skills.',
    image: '',
    details: [
      'HTML5, CSS3, JavaScript',
      'github.com/jlimbu1/ticket-challenger'
    ]
  },
  {
    id: 'proj-2',
    type: 'project',
    title: 'MOOC Web Platform for ARM Assembly Language',
    organization: '',
    date: '',
    description: 'A web platform for learning ARM assembly language with interactive exercises.',
    image: '',
    details: [
      'MongoDB, ExpressJS, ReactJS, NodeJS, Docker, Kubernetes'
    ]
  }
];

// Sort by date ascending (for education/experience with known dates, projects with empty dates go last)
timelineData.sort((a, b) => {
  const dateA = a.date ? new Date(a.date.split(' - ')[0].replace('Sept', 'September')) : new Date(0);
  const dateB = b.date ? new Date(b.date.split(' - ')[0].replace('Sept', 'September')) : new Date(0);
  return dateA - dateB;
});

export default timelineData;

// --- src/pages/Timeline.jsx ---
import React from 'react';
import st from '../styles/App.module.scss';
import TimelineNode from './TimelineNode';
import timelineData from '../data/timelineData';
import useScrollReveal from '../hooks/useScrollReveal';

function Timeline() {
  const [ref, visible] = useScrollReveal();

  return (
    <section id="timeline" className={st.container}>
      <div ref={ref} className={`${st.reveal} ${visible ? st.visible : ''}`}>
        <h2>Timeline</h2>
        <div className={st.timeline}>
          {timelineData.length === 0 ? (
            <p className={st.emptyMessage}>No timeline entries yet.</p>
          ) : (
            timelineData.map((entry) => (
              <TimelineNode key={entry.id} entry={entry} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Timeline;

// --- src/pages/TimelineNode.jsx ---
import React from 'react';
import st from '../styles/App.module.scss';

function TimelineNode({ entry }) {
  if (!entry) {
    return null;
  }

  return (
    <div className={st.timelineNode} data-type={entry.type}>
      <div className={st.nodeMarker}>
        <span className={st.nodeDot}></span>
        <div className={st.nodeLine}></div>
      </div>
      <div className={st.nodeContent}>
        <h3 className={st.nodeTitle}>{entry.title}</h3>
        {entry.organization && (
          <p className={st.nodeOrg}>{entry.organization}</p>
        )}
        {entry.date && (
          <p className={st.nodeDate}>{entry.date}</p>
        )}
      </div>
    </div>
  );
}

export default TimelineNode;