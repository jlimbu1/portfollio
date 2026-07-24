import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faBriefcase, faProjectDiagram, faExternalLinkAlt, faChevronDown, faChevronUp, faCalendarAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const educationData = [
  {
    id: 'edu-1',
    type: 'education',
    title: 'Bachelor of Science in Computer Science',
    institution: 'University of Technology',
    location: 'San Francisco, CA',
    date: '2018 - 2022',
    description: 'Focused on software engineering, algorithms, and web development with a minor in data science.',
    details: [
      'GPA: 3.8 / 4.0',
      "Dean's List — Fall 2019, Spring 2020, Fall 2021",
      'Senior Capstone: Real-time collaboration web app',
      'Teaching Assistant for Data Structures (2 semesters)',
    ],
  },
  {
    id: 'edu-2',
    type: 'education',
    title: 'Associate of Science in Mathematics',
    institution: 'City College',
    location: 'San Francisco, CA',
    date: '2016 - 2018',
    description: 'Foundational coursework in calculus, linear algebra, and discrete mathematics.',
    details: [
      'Completed with honors',
      'Math Club President',
      'Tutored introductory programming courses',
    ],
  },
];

const experienceData = [
  {
    id: 'exp-1',
    type: 'experience',
    title: 'Senior Software Engineer',
    company: 'Tech Corp',
    location: 'San Francisco, CA',
    date: '2022 - Present',
    description: 'Lead frontend architecture for a SaaS platform serving 50K+ users.',
    details: [
      'Architected React component library used across 4 product teams',
      'Reduced page load time by 40% through code splitting and lazy loading',
      'Mentored 3 junior engineers through structured code reviews',
      'Drove migration from class components to hooks',
    ],
  },
  {
    id: 'exp-2',
    type: 'experience',
    title: 'Frontend Developer',
    company: 'StartupXYZ',
    location: 'Remote',
    date: '2020 - 2022',
    description: 'Built customer-facing dashboards and interactive data visualizations.',
    details: [
      'Developed real-time analytics dashboard with D3.js and React',
      'Implemented responsive designs across desktop, tablet, and mobile',
      'Owned CI/CD pipeline for frontend deployments',
    ],
  },
  {
    id: 'exp-3',
    type: 'experience',
    title: 'Junior Developer Intern',
    company: 'Web Agency Co.',
    location: 'San Francisco, CA',
    date: '2019 - 2020',
    description: 'Contributed to client projects using React, Node.js, and PostgreSQL.',
    details: [
      'Built 5+ client websites with custom WordPress themes',
      'Automated email notification system reducing manual work by 20 hours/week',
      'Wrote integration tests achieving 85% code coverage',
    ],
  },
];

const projectData = [
  {
    id: 'proj-1',
    type: 'project',
    title: 'Portfolio Website',
    technologies: 'React · SCSS · FontAwesome',
    date: '2024',
    description: 'Personal portfolio with an interactive timeline, dark theme, and scroll-reveal animations.',
    link: 'https://example.com',
    details: [
      'Fully responsive from 320px to 1440px+',
      'Interactive timeline with expandable nodes and category filters',
      'Keyboard-navigable with ARIA attributes for accessibility',
      'Performance optimized with lazy loading and code splitting',
    ],
  },
  {
    id: 'proj-2',
    type: 'project',
    title: 'Collaborative Whiteboard',
    technologies: 'React · Socket.io · Canvas API',
    date: '2023',
    description: 'Real-time collaborative drawing tool with multi-user support and chat.',
    link: 'https://github.com/example/whiteboard',
    details: [
      'Real-time synchronization via WebSockets with latency compensation',
      'Layer-based canvas rendering supporting 100+ simultaneous strokes',
      'Persistent storage with auto-save and version history',
    ],
  },
  {
    id: 'proj-3',
    type: 'project',
    title: 'Weather Dashboard',
    technologies: 'React · Chart.js · OpenWeather API',
    date: '2022',
    description: 'Weather dashboard with 7-day forecasts, historical charts, and location search.',
    details: [
      'Client-side caching with stale-while-revalidate strategy',
      'Geolocation-based auto-detect with fallback to IP lookup',
      'Offline-capable with service worker and IndexedDB caching',
    ],
  },
];

const allItems = [
  ...educationData.map((item) => ({ ...item, category: 'education' })),
  ...experienceData.map((item) => ({ ...item, category: 'experience' })),
  ...projectData.map((item) => ({ ...item, category: 'project' })),
];

const categories = [
  { key: 'all', label: 'All', icon: null },
  { key: 'education', label: 'Education', icon: faGraduationCap },
  { key: 'experience', label: 'Experience', icon: faBriefcase },
  { key: 'project', label: 'Projects', icon: faProjectDiagram },
];

const sortByDate = (a, b) => {
  const aEnd = a.date.includes(' - ') ? a.date.split(' - ')[1] : a.date;
  const bEnd = b.date.includes(' - ') ? b.date.split(' - ')[1] : b.date;
  return bEnd.localeCompare(aEnd);
};

const styles = {
  section: {
    padding: 'var(--section-padding-y, 64px) var(--section-padding-x, 16px)',
    position: 'relative',
  },
  header: {
    marginBottom: '24px',
  },
  heading: {
    fontSize: 'clamp(1.25rem, 4vw, 1.75rem)',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: 'var(--primary-header-color, #97ffe7)',
    margin: '0 0 0.5rem',
  },
  filters: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    marginBottom: '32px',
    paddingBottom: '4px',
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  },
  filterBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '10px 18px',
    minHeight: '44px',
    minWidth: '44px',
    border: '1px solid rgba(47, 202, 166, 0.2)',
    borderRadius: '8px',
    background: 'rgba(47, 202, 166, 0.05)',
    color: 'var(--primary-text-color, #2fcaa6)',
    fontFamily: 'var(--font-family-base, sans-serif)',
    fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background 0.2s, border-color 0.2s, color 0.2s',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    outline: 'none',
    WebkitTapHighlightColor: 'transparent',
  },
  filterBtnActive: {
    background: 'rgba(151, 255, 231, 0.15)',
    borderColor: 'var(--primary-header-color, #97ffe7)',
    color: 'var(--primary-header-color, #97ffe7)',
  },
  timelineWrapper: {
    position: 'relative',
    paddingLeft: '28px',
  },
  timelineLine: {
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '11px',
    width: '2px',
    background: 'linear-gradient(to bottom, rgba(47, 202, 166, 0.3), rgba(47, 202, 166, 0.1))',
    zIndex: 0,
  },
  node: {
    position: 'relative',
    marginBottom: '24px',
    paddingLeft: '28px',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
    outline: 'none',
  },
  nodeDot: {
    position: 'absolute',
    left: '-17px',
    top: '6px',
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    border: '2px solid var(--primary-header-color, #97ffe7)',
    background: 'var(--primary-color, #020c1b)',
    zIndex: 1,
    transition: 'background 0.2s, transform 0.2s, box-shadow 0.2s',
  },
  nodeDotActive: {
    background: 'var(--primary-header-color, #97ffe7)',
    boxShadow: '0 0 12px rgba(151, 255, 231, 0.4)',
    transform: 'scale(1.15)',
  },
  nodeCard: {
    padding: '16px 16px 16px 20px',
    borderLeft: '2px solid rgba(47, 202, 166, 0.12)',
    borderRadius: '0 8px 8px 0',
    transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
    minHeight: '44px',
  },
  nodeCardHover: {
    borderColor: 'var(--primary-header-color, #97ffe7)',
    background: 'rgba(151, 255, 231, 0.03)',
  },
  nodeHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '8px',
    flexWrap: 'wrap',
  },
  nodeTitleGroup: {
    flex: '1 1 200px',
    minWidth: 0,
  },
  nodeTitle: {
    fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
    fontWeight: 600,
    color: 'var(--primary-header-color, #97ffe7)',
    margin: '0 0 2px',
    lineHeight: 1.3,
    wordBreak: 'break-word',
  },
  nodeSubtitle: {
    fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
    color: 'rgba(47, 202, 166, 0.7)',
    margin: '0 0 4px',
    lineHeight: 1.4,
  },
  nodeMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: 'clamp(0.75rem, 1.8vw, 0.85rem)',
    color: 'rgba(47, 202, 166, 0.5)',
    flexWrap: 'wrap',
  },
  nodeMetaItem: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
  },
  nodeChevron: {
    flexShrink: 0,
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    transition: 'background 0.2s, transform 0.2s',
    color: 'var(--primary-text-color, #2fcaa6)',
    fontSize: '0.85rem',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
    outline: 'none',
  },
  nodeChevronExpanded: {
    transform: 'rotate(180deg)',
  },
  nodeDetails: {
    overflow: 'hidden',
    transition: 'max-height 0.3s ease, opacity 0.25s ease',
    maxHeight: '0',
    opacity: 0,
  },
  nodeDetailsOpen: {
    maxHeight: '600px',
    opacity: 1,
  },
  nodeDescription: {
    fontSize: 'clamp(0.82rem, 2vw, 0.9rem)',
    color: 'var(--primary-text-color, #2fcaa6)',
    lineHeight: 1.6,
    margin: '10px 0 8px',
  },
  nodeDetailList: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 4px',
  },
  nodeDetailItem: {
    padding: '3px 0 3px 16px',
    position: 'relative',
    fontSize: 'clamp(0.78rem, 1.8vw, 0.85rem)',
    color: 'rgba(47, 202, 166, 0.85)',
    lineHeight: 1.5,
  },
  nodeDetailBullet: {
    position: 'absolute',
    left: '2px',
    top: '11px',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: 'rgba(47, 202, 166, 0.3)',
  },
  nodeLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    marginTop: '8px',
    fontSize: 'clamp(0.78rem, 1.8vw, 0.85rem)',
    color: 'var(--primary-header-color, #97ffe7)',
    textDecoration: 'none',
    padding: '6px 0',
    minHeight: '44px',
    transition: 'opacity 0.2s',
  },
  emptyState: {
    textAlign: 'center',
    padding: '48px 16px',
    color: 'rgba(47, 202, 166, 0.5)',
    fontSize: '1rem',
    lineHeight: 1.6,
  },
  emptyStateIcon: {
    fontSize: '2rem',
    marginBottom: '12px',
    opacity: 0.4,
  },
};

const TimelineNode = React.memo(({ item, isExpanded, onToggle, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const nodeRef = React.useRef(null);
  const detailsRef = React.useRef(null);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onToggle(item.id);
      }
    },
    [item.id, onToggle]
  );

  const categoryIcon =
    item.type === 'education'
      ? faGraduationCap
      : item.type === 'experience'
      ? faBriefcase
      : faProjectDiagram;

  return (
    <div
      ref={nodeRef}
      className="timeline-node"
      style={styles.node}
      onClick={() => onToggle(item.id)}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      aria-controls={`timeline-details-${item.id}`}
    >
      <div
        style={{
          ...styles.nodeDot,
          ...(isExpanded ? styles.nodeDotActive : {}),
        }}
        aria-hidden="true"
      />
      <div
        style={{
          ...styles.nodeCard,
          ...(isHovered ? styles.nodeCardHover : {}),
        }}
      >
        <div style={styles.nodeHeader}>
          <div style={styles.nodeTitleGroup}>
            <h3 style={styles.nodeTitle}>{item.title}</h3>
            <p style={styles.nodeSubtitle}>
              {item.type === 'education'
                ? item.institution
                : item.type === 'experience'
                ? item.company
                : item.technologies}
            </p>
            <div style={styles.nodeMeta}>
              <span style={styles.nodeMetaItem}>
                <FontAwesomeIcon icon={faCalendarAlt} size="sm" />
                <span>{item.date}</span>
              </span>
              {item.location && (
                <span style={styles.nodeMetaItem}>
                  <FontAwesomeIcon icon={faMapMarkerAlt} size="sm" />
                  <span>{item.location}</span>
                </span>
              )}
            </div>
          </div>
          <button
            style={{
              ...styles.nodeChevron,
              ...(isExpanded ? styles.nodeChevronExpanded : {}),
            }}
            onClick={(e) => {
              e.stopPropagation();
              onToggle(item.id);
            }}
            aria-label={isExpanded ? `Collapse details for ${item.title}` : `Expand details for ${item.title}`}
            tabIndex={-1}
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
        </div>
        <div
          ref={detailsRef}
          id={`timeline-details-${item.id}`}
          style={{
            ...styles.nodeDetails,
            ...(isExpanded ? styles.nodeDetailsOpen : {}),
          }}
          role="region"
          aria-hidden={!isExpanded}
          tabIndex={isExpanded ? 0 : -1}
        >
          {item.description && (
            <p style={styles.nodeDescription}>{item.description}</p>
          )}
          {item.details && item.details.length > 0 && (
            <ul style={styles.nodeDetailList}>
              {item.details.map((detail, i) => (
                <li key={i} style={styles.nodeDetailItem}>
                  <span style={styles.nodeDetailBullet} />
                  {detail}
                </li>
              ))}
            </ul>
          )}
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.nodeLink}
              onClick={(e) => e.stopPropagation()}
              aria-label={`${item.title} — opens in new tab`}
            >
              <FontAwesomeIcon icon={faExternalLinkAlt} size="sm" />
              <span>View Project</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
});

TimelineNode.displayName = 'TimelineNode';

const InteractiveTimeline = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedId, setExpandedId] = useState(null);
  const nodeRefs = useRef([]);

  const filteredItems = useMemo(() => {
    const items =
      activeCategory === 'all'
        ? [...allItems]
        : allItems.filter((item) => item.category === activeCategory);
    return items.sort(sortByDate);
  }, [activeCategory]);

  const handleToggle = useCallback((id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const handleCategoryChange = useCallback((key) => {
    setActiveCategory(key);
    setExpandedId(null);
  }, []);

  // Reset node refs when filtered items change
  useEffect(() => {
    nodeRefs.current = nodeRefs.current.slice(0, filteredItems.length);
  }, [filteredItems.length]);

  return (
    <section className="timeline" style={styles.section} aria-label="Experience and Education Timeline">
      <div style={styles.header}>
        <h2 style={styles.heading}>
          <FontAwesomeIcon icon={faProjectDiagram} />
          <span>Experience &amp; Education</span>
        </h2>
      </div>

      <div
        style={styles.filters}
        role="tablist"
        aria-label="Filter timeline by category"
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              role="tab"
              aria-selected={isActive}
              aria-controls="timeline-panel"
              style={{
                ...styles.filterBtn,
                ...(isActive ? styles.filterBtnActive : {}),
              }}
              onClick={() => handleCategoryChange(cat.key)}
            >
              {cat.icon && (
                <FontAwesomeIcon icon={cat.icon} size="sm" />
              )}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      <div id="timeline-panel" role="tabpanel" style={styles.timelineWrapper}>
        <div style={styles.timelineLine} aria-hidden="true" />

        {filteredItems.length === 0 ? (
          <div style={styles.emptyState} role="status" aria-live="polite">
            <div style={styles.emptyStateIcon}>
              <FontAwesomeIcon icon={faProjectDiagram} />
            </div>
            <p>No items found for this category.</p>
          </div>
        ) : (
          filteredItems.map((item, index) => (
            <TimelineNode
              key={item.id}
              item={item}
              index={index}
              isExpanded={expandedId === item.id}
              onToggle={handleToggle}
              nodeRefs={nodeRefs}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default InteractiveTimeline;
