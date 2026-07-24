import { useState, useEffect, useRef } from 'react';

export default function useScrollSpy(sectionIds, options = {}) {
    if (typeof options === 'number') {
        options = { offset: options };
    }
    const { offset = 100, threshold = 0 } = options;

    // Always call hooks at top level — never conditionally
    const intersectionActive = useIntersectionSpy(sectionIds, threshold);
    const [scrollActive, setScrollActive] = useState(sectionIds[0] || '');

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY + offset;
            let current = sectionIds[0] || '';
            for (const id of sectionIds) {
                const el = document.getElementById(id);
                if (el && el.offsetTop <= scrollY) {
                    current = id;
                }
            }
            setScrollActive(current);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sectionIds, offset]);

    return threshold > 0 ? intersectionActive : scrollActive;
}

function useIntersectionSpy(sectionIds, threshold) {
    const [active, setActive] = useState(sectionIds[0] || '');
    const observerRef = useRef(null);

    useEffect(() => {
        if (sectionIds.length === 0) return;
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter(entry => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                if (visible.length > 0) {
                    setActive(visible[0].target.id);
                }
            },
            { threshold }
        );
        sectionIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        observerRef.current = observer;
        return () => observer.disconnect();
    }, [sectionIds, threshold]);

    return active;
}
