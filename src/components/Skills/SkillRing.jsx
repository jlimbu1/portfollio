import React from 'react';
import styles from '../../styles/Skills.module.scss';

const SkillRing = ({ name, proficiency }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (proficiency / 100) * circumference;

  return (
    <figure className={styles.skillCard} aria-label={`${name} proficiency ${proficiency}%`} role="figure">
      <svg width="120" height="120" viewBox="0 0 120 120" role="img" aria-hidden="true">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#e0e0e0"
          strokeWidth="8"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#2196f3"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
        />
      </svg>
      <span className={styles.skillName}>{name}</span>
      <span className={styles.skillPercent}>{proficiency}%</span>
    </figure>
  );
};

export default SkillRing;