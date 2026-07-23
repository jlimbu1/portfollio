import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

function Hero() {
  return (
    <section className="vh-100 d-flex flex-column align-items-center justify-content-center text-center px-3" style={{ background: 'transparent' }}>
      <h1 className="display-3 fw-bold" style={{ color: '#ccd6f6' }}>Jing Wang</h1>
      <p className="lead" style={{ color: '#2fcaa6' }}>Full Stack Developer &amp; Creative Problem Solver</p>
      <p className="mt-3" style={{ color: '#8892b0', maxWidth: '600px', fontSize: '1.1rem' }}>
        I craft elegant, responsive digital experiences with modern technologies.
      </p>
      <a
        href="#abouts"
        className="mt-5"
        style={{ color: '#2fcaa6', animation: 'bounce 2s infinite' }}
        aria-label="Scroll to about section"
      >
        <FontAwesomeIcon icon={faChevronDown} size="2x" />
      </a>
      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-8px); }
          60% { transform: translateY(-4px); }
        }
      `}</style>
    </section>
  );
}

export default Hero;