import st from '../styles/App.module.scss'
import useScrollReveal from '../hooks/useScrollReveal'
import { useEffect, useState, useRef } from 'react'

const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
};

function SkillCircle({ icon, label, percentage, target }) {
    const circleRef = useRef(null);
    const [animated, setAnimated] = useState(false);
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setAnimated(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (circleRef.current) {
            observer.observe(circleRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = animated ? circumference - (percentage / 100) * circumference : circumference;
    const transition = prefersReducedMotion ? 'none' : 'stroke-dashoffset 1.2s ease-out';

    return (
        <div
            ref={circleRef}
            className={st.skillCircle}
            onClick={() => target && scrollTo(target)}
            title={target ? `Jump to ${label} usage` : label}
            role={target ? 'button' : 'presentation'}
            tabIndex={target ? 0 : undefined}
            onKeyDown={(e) => {
                if (target && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    scrollTo(target);
                }
            }}
        >
            <svg className={st.skillCircleSvg} viewBox="0 0 100 100" aria-label={`${label}: ${percentage}%`}>
                <circle
                    className={st.skillCircleBg}
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    strokeWidth="6"
                />
                <circle
                    className={st.skillCircleProgress}
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    style={{ transition }}
                    transform="rotate(-90 50 50)"
                />
            </svg>
            <div className={st.skillCircleContent}>
                {icon && <i className={`${icon} ${st.skillCircleIcon}`}></i>}
                <span className={st.skillCircleLabel}>{label}</span>
                <span className={st.skillCirclePercent}>{percentage}%</span>
            </div>
        </div>
    );
}

function Skills() {
    const [ref, visible] = useScrollReveal();

    const skillCategories = [
        {
            title: 'Programming Languages',
            skills: [
                { icon: 'devicon-c-plain', label: 'C', percentage: 70, target: 'arduino-gameboy' },
                { icon: 'devicon-cplusplus-plain', label: 'C++', percentage: 75, target: 'arduino-gameboy' },
                { icon: 'devicon-java-plain-wordmark', label: 'Java', percentage: 80, target: 'projects' },
                { icon: 'devicon-javascript-plain', label: 'JavaScript', percentage: 95, target: 'experiences' },
                { icon: 'devicon-typescript-plain', label: 'TypeScript', percentage: 90, target: 'experiences' },
                { icon: 'devicon-nodejs-plain-wordmark', label: 'NodeJS', percentage: 85, target: 'arm-mooc' },
            ],
        },
        {
            title: 'Frontend',
            skills: [
                { icon: 'devicon-vuejs-plain-wordmark', label: 'Vue 2/3', percentage: 95, target: 'experiences' },
                { icon: 'devicon-react-original-wordmark', label: 'React', percentage: 85, target: 'wealthskey' },
                { icon: 'devicon-nextjs-plain', label: 'NextJS', percentage: 80, target: 'wealthskey' },
                { icon: 'devicon-nuxtjs-plain', label: 'NuxtJS', percentage: 80, target: 'experiences' },
                { icon: 'devicon-tailwindcss-plain', label: 'Tailwind CSS', percentage: 90, target: 'experiences' },
                { icon: 'devicon-bootstrap-plain', label: 'Bootstrap', percentage: 85, target: 'experiences' },
                { icon: 'devicon-html5-plain-wordmark', label: 'HTML5', percentage: 95, target: 'projects' },
                { icon: 'devicon-css3-plain-wordmark', label: 'CSS3', percentage: 90, target: 'projects' },
            ],
        },
        {
            title: 'Backend & Database',
            skills: [
                { icon: 'devicon-express-original', label: 'ExpressJS', percentage: 85, target: 'arm-mooc' },
                { icon: 'devicon-nestjs-plain', label: 'NestJS', percentage: 75, target: 'fletrix' },
                { icon: 'devicon-mongodb-plain-wordmark', label: 'MongoDB', percentage: 80, target: 'fletrix' },
                { icon: 'devicon-socketio-original', label: 'Socket.IO', percentage: 70, target: 'danger-dungeon' },
                { icon: null, label: 'JWT', percentage: 85, target: 'experiences' },
                { icon: null, label: 'Microservices', percentage: 75, target: 'experiences' },
            ],
        },
        {
            title: 'Tools & Platforms',
            skills: [
                { icon: 'devicon-docker-plain', label: 'Docker', percentage: 80, target: 'arm-mooc' },
                { icon: 'devicon-kubernetes-plain', label: 'Kubernetes', percentage: 65, target: 'arm-mooc' },
                { icon: 'devicon-git-plain', label: 'Git', percentage: 95, target: 'projects' },
                { icon: 'devicon-linux-plain', label: 'Linux', percentage: 85, target: 'projects' },
                { icon: 'devicon-amazonwebservices-plain-wordmark', label: 'AWS EC2', percentage: 70, target: 'arm-mooc' },
                { icon: 'devicon-arduino-plain-wordmark', label: 'Arduino', percentage: 60, target: 'arduino-gameboy' },
            ],
        },
    ];

    return (
        <div id='skills' className={st.container}>
            <div ref={ref} className={`${st.reveal} ${visible ? st.visible : ''}`}>
                <h2>Skills</h2>

                {skillCategories.map((category) => (
                    <div key={category.title} className={st.skillCategory}>
                        <h4>{category.title}</h4>
                        <div className={st.skillCirclesGrid}>
                            {category.skills.map((skill) => (
                                <SkillCircle
                                    key={skill.label}
                                    icon={skill.icon}
                                    label={skill.label}
                                    percentage={skill.percentage}
                                    target={skill.target}
                                />
                            ))}
                        </div>
                    </div>
                ))}

                <h4>Spoken Languages</h4>
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