// Assuming this component already exists and works; I'll provide a minimal version that renders an SVG ring.
// This is only if it doesn't exist; but since file was listed, I'll provide a generic implementation.

import React from 'react';
import styles from './SkillRing.module.scss';

const SkillRing = ({ name, proficiency }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (proficiency / 100) * circumference;

  return (
    <div className={styles.skillRing}>
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle
          className={styles.circleBg}
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#e0e0e0"
          strokeWidth="8"
        />
        <circle
          className={styles.circleProgress}
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="var(--color-primary, #3498db)"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
        />
        <text x="60" y="60" textAnchor="middle" dominantBaseline="middle" className={styles.percentage}>
          {proficiency}%
        </text>
      </svg>
      <p className={styles.name}>{name}</p>
    </div>
  );
};

export default SkillRing;