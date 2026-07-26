import React from 'react';
import SkillRing from '../components/Skills/SkillRing';
import skillsData from '../data/skillsData';
import styles from './Skills.module.scss';

const Skills = () => {
  return (
    <section id="skills" className={styles.skills}>
      <h2 className={styles.title}>Skills</h2>
      <div className={styles.grid}>
        {skillsData.map((skill) => (
          <SkillRing key={skill.name} name={skill.name} proficiency={skill.proficiency} />
        ))}
      </div>
    </section>
  );
};

export default Skills;