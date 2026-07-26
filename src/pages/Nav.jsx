import React, { useState } from 'react';
import { useScrollSpy } from '../hooks/useScrollSpy';

const sectionIds = ['about', 'skills', 'projects', 'experience', 'education', 'contact'];

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useScrollSpy(sectionIds, 100);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  };

  return (
    <header role="banner">
      <nav aria-label="Main navigation">
        <div className="logo">
          <a href="#home" aria-label="Home">Portfolio</a>
        </div>
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          onKeyDown={handleKeyDown}
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul id="nav-menu" className={`nav-links ${menuOpen ? 'visible' : ''}`} role="menubar">
          {sectionIds.map((id) => (
            <li key={id} role="none">
              <a
                href={`#${id}`}
                role="menuitem"
                className={activeSection === id ? 'active' : ''}
                tabIndex={0}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Nav;