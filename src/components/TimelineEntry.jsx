import React from 'react';
import st from '../styles/App.module.scss';
import useScrollReveal from '../hooks/useScrollReveal';

function TimelineEntry({ entry }) {
  const [ref, visible] = useScrollReveal({ once: true });

  if (!entry) {
    return null;
  }

  const { title, subtitle, date, description, items } = entry;

  return (
    <div
      ref={ref}
      className={`${st.card} ${st.reveal} ${visible ? st.visible : ''}`}
    >
      <h4>{title || 'Untitled'}</h4>
      {subtitle && <p className={st.subtitle}>{subtitle}</p>}
      {date && <span className={st.date}>{date}</span>}
      {description && <p>{description}</p>}
      {items && items.length > 0 && (
        <ul>
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TimelineEntry;