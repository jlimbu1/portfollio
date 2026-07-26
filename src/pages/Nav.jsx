import React, { useState } from 'react';
import styles from './Nav.module.scss';

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className={styles.nav} role="navigation" aria-label="Main navigation">
      <div className={styles.container}>
        <a href="#" className={styles.logo}>
          Portfolio
        </a>
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          <span />
          <span />
          <span />
        </button>
        <ul className={`${styles.menu} ${menuOpen ? styles.menuOpen : ''}`} role="menubar">
          <li role="none"><a href="#about" role="menuitem" onClick={() => setMenuOpen(false)}>About</a></li>
          <li role="none"><a href="#skills" role="menuitem" onClick={() => setMenuOpen(false)}>Skills</a></li>
          <li role="none"><a href="#timeline" role="menuitem" onClick={() => setMenuOpen(false)}>Timeline</a></li>
          <li role="none"><a href="#contact" role="menuitem" onClick={() => setMenuOpen(false)}>Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;