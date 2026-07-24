import { useState, useEffect, useRef } from 'react';

export default function useScrollSpy(sectionIds, options = {}) {
    // Backward compatibility: if second argument is a number, treat it as offset
    if (typeof options === 'number') {
        options = { offset: options };
    }

    const { offset = 100, threshold = 0 } = options;
    const [active, setActive] = useState(sectionIds[0] || '');

    // Use IntersectionObserver when a threshold > 0 is specified
    if (threshold > 0) {
        return useIntersectionSpy(sectionIds, threshold);
    }

    // Fallback to scroll-based detection
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
            setActive(current);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sectionIds, offset]);

    return active;
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
