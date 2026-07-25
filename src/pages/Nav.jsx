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

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Escape' && show) {
            setShow(false);
        }
    }, [show]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    return (
        <header className={`${st.nav} ${scrolled ? st.navScrolled : ''}`} role="banner">
            <div className={st.navInner}>
                <a className={st.logo} href="#abouts" onClick={closeMenu} aria-label="Go to About section">
                    <img src="https://i.imgur.com/YLt0FBm.jpg" alt="Jimmy Limbu logo" />
                </a>

                <button
                    className={st.hamburger}
                    onClick={() => setShow(!show)}
                    aria-label={show ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={show}
                    aria-controls="primary-navigation"
                >
                    <FontAwesomeIcon icon={show ? faX : faBars} aria-hidden="true" />
                </button>

                <nav
                    id="primary-navigation"
                    className={`${st.navLinks} ${show ? st.navOpen : ''}`}
                    role="navigation"
                    aria-label="Primary navigation"
                >
                    <ul role="list" className={st.navList}>
                        {[
                            ['abouts', 'About'],
                            ['timeline', 'Timeline'],
                            ['skills', 'Skills'],
                            ['contacts', 'Contact'],
                        ].map(([id, label]) => (
                            <li key={id} role="listitem">
                                <a
                                    href={`#${id}`}
                                    className={active === id ? st.navActive : ''}
                                    onClick={closeMenu}
                                    aria-current={active === id ? 'true' : undefined}
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Nav;