import React from 'react';
import skillsData from '../data/skillsData';
import useScrollReveal from '../hooks/useScrollReveal';

const Skills = () => {
  return (
    <div className="section">
      <h2>Skills</h2>
      <div className="skills-grid">
        {skillsData.map((skill, idx) => (
          <SkillBar key={idx} skill={skill} />
        ))}
      </div>
    </div>
  );
};

const SkillBar = ({ skill }) => {
  const [ref, visible] = useScrollReveal(0.1);
  return (
    <div ref={ref} className={`skill ${visible ? 'visible' : ''}`}>
      <span>{skill.name}</span>
      <div className="bar-bg">
        <div
          className="bar-fill"
          style={{ width: `${visible ? skill.proficiency : 0}%` }}
        ></div>
      </div>
      <span>{skill.proficiency}%</span>
    </div>
  );
};

export default Skills;