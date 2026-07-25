import React from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import st from './Timeline.module.scss';

function TimelineNode({ entry }) {
  const [ref, visible] = useScrollReveal();

  if (!entry) {
    return null;
  }

  const {
    title,
    institution,
    company,
    date,
    description,
  } = entry;

  const org = institution || company || null;

  return (
    <div
      ref={ref}
      className={`${st.node} ${st.reveal} ${visible ? st.visible : ''}`}
      data-testid="timeline-node"
    >
      <div className={st.card}>
        <div className={st.cardBody}>
          {title && <h3 className={st.title}>{title}</h3>}
          {org && <p className={st.org}>{org}</p>}
          {date && <p className={st.date}>{date}</p>}
          {description && <p className={st.description}>{description}</p>}
        </div>
      </div>
    </div>
  );
}

export default TimelineNode;
