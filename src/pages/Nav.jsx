import st from '../styles/App.module.scss'
import React, { useState, useCallback, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faX } from '@fortawesome/free-solid-svg-icons'
import useScrollSpy from '../hooks/useScrollSpy'

const sections = ['abouts', 'educations', 'experiences', 'projects', 'skills', 'contacts'];

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

    return (
        <header className={`${st.nav} ${scrolled ? st.navScrolled : ''}`}>
            <div className={st.navInner}>
                <a className={st.logo} href="#abouts" onClick={closeMenu}>
                    <img src="https://i.imgur.com/YLt0FBm.jpg" alt="logo" />
                </a>

                <button
                    className={st.hamburger}
                    onClick={() => setShow(!show)}
                    aria-label="Toggle navigation"
                >
                    <FontAwesomeIcon icon={show ? faX : faBars} />
                </button>

                <nav className={`${st.navLinks} ${show ? st.navOpen : ''}`}>
                    {[
                        ['abouts', 'About'],
                        ['educations', 'Education'],
                        ['experiences', 'Experience'],
                        ['projects', 'Projects'],
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
