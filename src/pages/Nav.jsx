import React from 'react';
import { useScrollSpy } from '../hooks/useScrollSpy';

const sectionIds = ['about', 'education', 'experience', 'projects', 'skills'];

const Nav = () => {
  const active = useScrollSpy(sectionIds, 100);

  return (
    <nav>
      <ul>
        {sectionIds.map((id) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={active === id ? 'active' : ''}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    const closeMenu = () => setShow(false);

    const toggleMenu = useCallback(() => {
        setShow(prev => !prev);
    }, []);

    return (
        <header className={`${st.nav} ${scrolled ? st.navScrolled : ''}`}>
            <div className={st.navInner}>
                <a className={st.logo} href="#abouts" onClick={closeMenu}>
                    <img src="https://i.imgur.com/YLt0FBm.jpg" alt="logo" />
                </a>

                <button
                    className={st.hamburger}
                    onClick={toggleMenu}
                    onTouchEnd={(e) => {
                        e.preventDefault();
                        toggleMenu();
                    }}
                    aria-label="Toggle navigation"
                    aria-expanded={show}
                >
                    <FontAwesomeIcon icon={show ? faX : faBars} />
                </button>

                <nav className={`${st.navLinks} ${show ? st.navOpen : ''}`}>
                    {[
                        ['abouts', 'About'],
                        ['timeline', 'Timeline'],
                        ['skills', 'Skills'],
                        ['contacts', 'Contact'],
                    ].map(([id, label]) => (
                        <a
                            key={id}
                            href={`#${id}`}
                            className={active === id ? st.navActive : ''}
                            onClick={closeMenu}
                        >
                            {label}
                        </a>
                    ))}
                </nav>
            </div>
        </header>
    )
}

export default Nav;
