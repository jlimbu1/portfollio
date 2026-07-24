import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faBriefcase, faCodeBranch, faChevronDown, faChevronUp, faExternalLinkAlt, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import useScrollReveal from '../hooks/useScrollReveal';

// Static data arrays – exact content should match original Edus.jsx, Exps.jsx, Projects.jsx
const educationData = [
  {
    id: 'edu-1',
    type: 'education',
    date: '2016-09',
    institution: 'University of Hong Kong',
    degree: 'Bachelor of Engineering in Computer Science',
    description: 'Graduated with honors. Focused on software engineering and algorithms.',
    link: null,
  },
];

const experienceData = [
  {
    id: 'exp-1',
    type: 'experience',
    date: '2020-06',
    company: 'DIY ROCKS',
    role: 'Software Engineer',
    description: 'Leading development of 3D jewellery configurators and white-label multi-tenant platform.',
    link: null,
  },
  {
    id: 'exp-2',
    type: 'experience',
    date: '2018-01',
    company: 'Xyrill Technologies',
    role: 'Junior Developer',
    description: 'Worked on B2B SaaS platforms and ERP systems using Vue.js and Node.js.',
    link: null,
  },
];

const projectData = [
  {
    id: 'proj-1',
    type: 'project',
    date: '2022-03',
    title: 'WealthsKey',
    description: 'A financial dashboard built with React and Next.js, integrating real-time market data.',
    link: 'https://wealthskey.com',
  },
  {
    id: 'proj-2',
    type: 'project',
    date: '2021-08',
    title: 'ARM MOOC',
    description: 'Online course platform for embedded systems, built with Node.js and MongoDB.',
    link: 'https://arm-mooc.example.com',
  },
  {
    id: 'proj-3',
    type: 'project',
    date: '2020-02',
    title: 'Arduino GameBoy',
    description: 'A handheld game console using Arduino, C++, and custom PCB design.',
    link: null,
  },
];

function InteractiveTimeline() {
  const [ref, visible] = useScrollReveal();
  const [expandedId, setExpandedId] = useState(null);

  // Merge and sort by date descending (newest first)
  const allEntries = [...educationData, ...experienceData, ...projectData].sort((a, b) => {
    const dateA = new Date(a.date + '-01');
    const dateB = new Date(b.date + '-01');
    return dateB - dateA;
  });

  const handleToggle = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const getIconForType = (type) => {
    switch (type) {
      case 'education':
        return faGraduationCap;
      case 'experience':
        return faBriefcase;
      case 'project':
        return faCodeBranch;
      default:
        return faCalendarAlt;
    }
  };

  const formatDate = (dateStr) => {
    const [year, month] = dateStr.split('-');
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${months[parseInt(month, 10) - 1]} ${year}`;
  };

  return (
    <section id="timeline" className="timeline-section">
      <div ref={ref} className={`timeline-wrapper ${visible ? 'visible' : ''}`}>
        <h2>Timeline</h2>
        <div className="timeline-line">
          {allEntries.map((entry) => (
            <div key={entry.id} className="timeline-node">
              <button
                className="timeline-marker"
                onClick={() => handleToggle(entry.id)}
                aria-expanded={expandedId === entry.id}
                aria-label={`${entry.type}: ${entry.title || entry.role || entry.degree}`}
              >
                <FontAwesomeIcon icon={getIconForType(entry.type)} className="timeline-icon" />
                <span className="timeline-date">{formatDate(entry.date)}</span>
                <FontAwesomeIcon
                  icon={expandedId === entry.id ? faChevronUp : faChevronDown}
                  className="timeline-chevron"
                />
              </button>

              {expandedId === entry.id && (
                <div className="timeline-card">
                  <div className="timeline-card-header">
                    {entry.type === 'education' && (
                      <>
                        <h3>{entry.degree}</h3>
                        <p className="timeline-card-sub">{entry.institution}</p>
                      </>
                    )}
                    {entry.type === 'experience' && (
                      <>
                        <h3>{entry.role}</h3>
                        <p className="timeline-card-sub">{entry.company}</p>
                      </>
                    )}
                    {entry.type === 'project' && (
                      <>
                        <h3>{entry.title}</h3>
                        {entry.link && (
                          <a href={entry.link} target="_blank" rel="noopener noreferrer" className="timeline-card-link">
                            <FontAwesomeIcon icon={faExternalLinkAlt} /> Visit
                          </a>
                        )}
                      </>
                    )}
                  </div>
                  <p className="timeline-card-description">{entry.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default InteractiveTimeline;