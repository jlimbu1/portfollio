import { useEffect, useRef, useState } from 'react';

export default function useScrollReveal(threshold = 0.1, options = {}) {
    const { stagger = 0, direction = 'up' } = options;
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.unobserve(el);
                }
            },
            { threshold }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    const fromTransform = {
        up: 'translateY(40px)',
        down: 'translateY(-40px)',
        left: 'translateX(-40px)',
        right: 'translateX(40px)',
    }[direction] || 'translateY(40px)';

    const style = {
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate(0,0)' : fromTransform,
        transition: `opacity 0.6s ease-out, transform 0.6s ease-out`,
        transitionDelay: visible ? `${stagger}ms` : '0ms',
    };

    return [ref, visible, style];
}
