import st from '../styles/App.module.scss'
import React, { useState, useCallback, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faX } from '@fortawesome/free-solid-svg-icons'
import useScrollSpy from '../hooks/useScrollSpy'

const sections = ['abouts', 'timeline', 'skills', 'contacts'];

function Nav() {
    const [scrolled, setScrolled] = useState(false);
    const [show, setShow] = useState(false);
    const active = useScrollSpy(sections, 120);

    const handleScroll = useCallback(() => {
        setScrolled(window.scrollY > 50);
        setShow(false);
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    const closeMenu = () => setShow(false);

    const handleKeyDown = (e, id) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
                el.setAttribute('tabindex', '-1');
                el.focus({ preventScroll: true });
            }
            closeMenu();
        }
    };

    return (
        <header className={`${st.nav} ${scrolled ? st.navScrolled : ''}`} role="banner">
            <div className={st.navInner}>
                <a
                    className={st.logo}
                    href="#abouts"
                    onClick={closeMenu}
                    aria-label="Navigate to About section"
                >
                    <img src="https://i.imgur.com/YLt0FBm.jpg" alt="Jimmy Limbu portfolio logo" />
                </a>

                <button
                    className={st.hamburger}
                    onClick={() => setShow(!show)}
                    aria-label={show ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={show}
                    aria-controls="main-navigation"
                >
                    <FontAwesomeIcon icon={show ? faX : faBars} aria-hidden="true" />
                </button>

                <nav
                    id="main-navigation"
                    className={`${st.navLinks} ${show ? st.navOpen : ''}`}
                    role="navigation"
                    aria-label="Main navigation"
                >
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
                            onKeyDown={(e) => handleKeyDown(e, id)}
                            aria-current={active === id ? 'true' : undefined}
                            aria-label={`Navigate to ${label} section`}
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
