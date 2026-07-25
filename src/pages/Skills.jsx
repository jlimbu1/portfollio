import { useScrollReveal } from '../hooks/useScrollReveal';
import st from '../styles/App.module.scss';

function SkillRing({ icon, label, proficiency, target, index }) {
    return (
        <div className={st.skillRing}>
            <div className={st.skillRingInner}>
                <svg className={st.skillRingSvg} viewBox="0 0 120 120">
                    <circle className={st.skillRingBg} cx="60" cy="60" r="54" />
                    <circle
                        className={st.skillRingFill}
                        cx="60"
                        cy="60"
                        r="54"
                        style={{ '--ring-fill': `${proficiency * 3.6}deg` }}
                    />
                </svg>
                {icon && <i className={`${st.skillRingIcon} ${icon} ${st.skillRingIcon}`}></i>}
                {!icon && <span className={st.skillRingLabelOnly}>{label}</span>}
            </div>
            <div className={st.skillRingTooltip}>
                <span className={st.skillRingTooltipLabel}>{label}</span>
                <span className={st.skillRingTooltipPct}>{proficiency}%</span>
            </div>
        </div>
    );
}

function SkillCategory({ title, children }) {
    const [ref, visible] = useScrollReveal();

    return (
        <div ref={ref} className={`${st.reveal} ${visible ? st.visible : ''}`}>
            <h4>{title}</h4>
            <div className={st.skills}>
                <ul>
                    {children}
                </ul>
            </div>
        </div>
    );
}

function Skills() {
    const [ref, visible] = useScrollReveal();

    return (
        <div id='skills' className={st.container}>
            <div ref={ref} className={`${st.reveal} ${visible ? st.visible : ''}`}>
                <h2>Skills</h2>

                {skillCategories.map((category) => (
                    <div key={category.title} className={st.skillCategory}>
                        <h4 className={st.skillCategoryTitle}>{category.title}</h4>
                        <div className={st.skillRingsGrid}>
                            {category.skills.map((skill, idx) => (
                                <SkillRing
                                    key={skill.label}
                                    icon={skill.icon}
                                    label={skill.label}
                                    proficiency={skill.proficiency}
                                    target={skill.target}
                                    index={idx}
                                />
                            ))}
                        </div>
                    </div>
                ))}

                <h4 className={st.skillCategoryTitle}>Spoken Languages</h4>
                <div className={st.skills}>
                    <ul>
                        <li className={st.noAction}>English (Fluent)</li>
                        <li className={st.noAction}>Nepali (Native)</li>
                        <li className={st.noAction}>Cantonese (Conversational)</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Skills;