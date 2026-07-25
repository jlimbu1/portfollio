import st from '../styles/App.module.scss'
import useScrollReveal from '../hooks/useScrollReveal'

const skillCategories = [
  {
    title: 'Programming Languages',
    skills: [
      { icon: 'devicon-c-plain', label: 'C', proficiency: 70, target: 'arduino-gameboy' },
      { icon: 'devicon-cplusplus-plain', label: 'C++', proficiency: 75, target: 'arduino-gameboy' },
      { icon: 'devicon-java-plain-wordmark', label: 'Java', proficiency: 80, target: 'projects' },
      { icon: 'devicon-javascript-plain', label: 'JavaScript', proficiency: 90, target: 'experiences' },
      { icon: 'devicon-typescript-plain', label: 'TypeScript', proficiency: 85, target: 'experiences' },
      { icon: 'devicon-nodejs-plain-wordmark', label: 'NodeJS', proficiency: 85, target: 'arm-mooc' },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { icon: 'devicon-vuejs-plain-wordmark', label: 'Vue 2/3', proficiency: 85, target: 'experiences' },
      { icon: 'devicon-react-original-wordmark', label: 'React', proficiency: 90, target: 'wealthskey' },
      { icon: 'devicon-nextjs-plain', label: 'NextJS', proficiency: 80, target: 'wealthskey' },
      { icon: 'devicon-nuxtjs-plain', label: 'NuxtJS', proficiency: 75, target: 'experiences' },
      { icon: 'devicon-tailwindcss-plain', label: 'Tailwind CSS', proficiency: 90, target: 'experiences' },
      { icon: 'devicon-bootstrap-plain', label: 'Bootstrap', proficiency: 85, target: 'experiences' },
      { icon: 'devicon-html5-plain-wordmark', label: 'HTML5', proficiency: 95, target: 'projects' },
      { icon: 'devicon-css3-plain-wordmark', label: 'CSS3', proficiency: 90, target: 'projects' },
    ],
  },
  {
    title: 'Backend & Database',
    skills: [
      { icon: 'devicon-express-original', label: 'ExpressJS', proficiency: 85, target: 'arm-mooc' },
      { icon: 'devicon-nestjs-plain', label: 'NestJS', proficiency: 75, target: 'fletrix' },
      { icon: 'devicon-mongodb-plain-wordmark', label: 'MongoDB', proficiency: 80, target: 'fletrix' },
      { icon: 'devicon-socketio-original', label: 'Socket.IO', proficiency: 70, target: 'danger-dungeon' },
      { icon: '', label: 'JWT', proficiency: 80, target: 'experiences' },
      { icon: '', label: 'Microservices', proficiency: 75, target: 'experiences' },
    ],
  },
  {
    title: 'Tools & Platforms',
    skills: [
      { icon: 'devicon-docker-plain', label: 'Docker', proficiency: 80, target: 'arm-mooc' },
      { icon: 'devicon-kubernetes-plain', label: 'Kubernetes', proficiency: 65, target: 'arm-mooc' },
      { icon: 'devicon-git-plain', label: 'Git', proficiency: 90, target: 'projects' },
      { icon: 'devicon-linux-plain', label: 'Linux', proficiency: 85, target: 'projects' },
      { icon: 'devicon-amazonwebservices-plain-wordmark', label: 'AWS EC2', proficiency: 70, target: 'arm-mooc' },
      { icon: 'devicon-arduino-plain-wordmark', label: 'Arduino', proficiency: 65, target: 'arduino-gameboy' },
    ],
  },
]

const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        el.setAttribute('tabindex', '-1');
        el.focus({ preventScroll: true });
    }
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

    const isClickable = Boolean(target);
    const ariaLabel = target
        ? `${label}: ${proficiency}% proficiency. Press Enter to jump to ${label} usage`
        : `${label}: ${proficiency}% proficiency`;

    return (
        <div
            ref={ref}
            className={`${st.skillRing} ${visible ? st.skillRingVisible : ''} ${isClickable ? st.skillRingClickable : st.noAction}`}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role={isClickable ? 'button' : 'img'}
            tabIndex={isClickable ? 0 : -1}
            aria-label={ariaLabel}
            title={target ? `Jump to ${label} usage` : `${label}: ${proficiency}%`}
            style={{ transitionDelay: `${index * 0.08}s` }}
        >
            <svg className={st.skillRingSvg} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
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