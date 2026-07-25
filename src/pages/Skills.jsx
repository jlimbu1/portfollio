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

function SkillRing({ icon, label, proficiency, target, index }) {
    const [ref, visible] = useScrollReveal();
    const radius = 42;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (proficiency / 100) * circumference;

    const handleClick = () => {
        if (target) scrollTo(target);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (target) scrollTo(target);
        }
    };

    const ariaLabel = target
        ? `${label}: ${proficiency}% proficiency. Click to jump to ${label} usage`
        : `${label}: ${proficiency}% proficiency`;

    return (
        <div
            ref={ref}
            className={`${st.skillRing} ${visible ? st.skillRingVisible : ''} ${target ? st.skillRingClickable : st.noAction}`}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role={target ? 'button' : 'img'}
            tabIndex={target ? 0 : -1}
            aria-label={ariaLabel}
            title={target ? `Jump to ${label} usage` : `${label}: ${proficiency}%`}
            style={{ transitionDelay: `${index * 0.08}s` }}
        >
            <svg
                className={st.skillRingSvg}
                viewBox="0 0 100 100"
                aria-hidden="true"
                focusable="false"
            >
                <circle
                    className={st.skillRingBg}
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    strokeWidth="6"
                />
                <circle
                    className={st.skillRingProgress}
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={visible ? offset : circumference}
                    style={{
                        transition: `stroke-dashoffset 1.2s ease-out ${index * 0.08}s`,
                    }}
                />
            </svg>
            <div className={st.skillRingContent} aria-hidden="true">
                {icon && <i className={`${icon} ${st.skillRingIcon}`}></i>}
                {!icon && <span className={st.skillRingLabelOnly}>{label}</span>}
            </div>
            <div className={st.skillRingTooltip} aria-hidden="true">
                <span className={st.skillRingTooltipLabel}>{label}</span>
                <span className={st.skillRingTooltipPct}>{proficiency}%</span>
            </div>
        </div>
    );
}

function Skills() {
    const [ref, visible] = useScrollReveal();

    return (
        <section id='skills' className={st.container} aria-labelledby="skills-heading">
            <div ref={ref} className={`${st.reveal} ${visible ? st.visible : ''}`}>
                <h2 id="skills-heading">Skills</h2>

                {skillCategories.map((category) => (
                    <div key={category.title} className={st.skillCategory} role="group" aria-label={category.title}>
                        <h4 className={st.skillCategoryTitle}>{category.title}</h4>
                        <div className={st.skillRingsGrid} role="list" aria-label={`${category.title} skills`}>
                            {category.skills.map((skill, idx) => (
                                <div key={skill.label} role="listitem">
                                    <SkillRing
                                        icon={skill.icon}
                                        label={skill.label}
                                        proficiency={skill.proficiency}
                                        target={skill.target}
                                        index={idx}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <div role="group" aria-label="Spoken Languages">
                    <h4 className={st.skillCategoryTitle}>Spoken Languages</h4>
                    <div className={st.skills}>
                        <ul aria-label="Languages spoken">
                            <li className={st.noAction}>English (Fluent)</li>
                            <li className={st.noAction}>Nepali (Native)</li>
                            <li className={st.noAction}>Cantonese (Conversational)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Skills;
