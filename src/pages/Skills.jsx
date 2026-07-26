import React from 'react';
import skillsData from '../data/skillsData';
import SkillRing from '../components/Skills/SkillRing';
import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from '../styles/Skills.module.scss';

const Skills = () => {
  const [ref, visible] = useScrollReveal(0.1);
  return (
    <div
      ref={ref}
      className={`${styles.skillsSection} ${visible ? styles.visible : styles.hidden}`}
      id="skills"
    >
      <h2 className={styles.heading}>Skills</h2>
      <div className={styles.grid}>
        {skillsData.map((skill) => (
          <SkillRing key={skill.name} name={skill.name} proficiency={skill.proficiency} />
        ))}
      </div>
    </div>
  );
};

export default Skills;