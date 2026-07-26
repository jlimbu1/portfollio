import React from 'react';
import styles from './SkillRing.module.scss';

const SkillRing = ({ name, proficiency }) => (
  <div className={styles.skill} role="figure" aria-label={`${name} proficiency ${proficiency}%`}>
    <h4 className={styles.name}>{name}</h4>
    <div className={styles.barTrack}>
      <div className={styles.barFill} style={{ width: `${proficiency}%` }} />
    </div>
  </div>
);

export default SkillRing;