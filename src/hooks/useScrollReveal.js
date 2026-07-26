import { useEffect, useRef, useState } from 'react';

const useScrollReveal = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observerCallback = (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.unobserve(entry.target);
        }
      });
    };

    const observerOptions = {
      threshold: options.threshold || 0.2,
      rootMargin: options.rootMargin || '0px',
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [ref, options.threshold, options.rootMargin]); // ref stable, but included for effect react rules

  return [ref, isVisible];
};

export default useScrollReveal;