import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const Abouts = () => {
  const [ref, visible] = useScrollReveal(0.3);
  return (
    <div ref={ref} className={`section ${visible ? 'visible' : ''}`}>
      <h2>About Me</h2>
      <p>I am a passionate software engineer.</p>
    </div>
  );
};

export default Abouts;