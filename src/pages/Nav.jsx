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
                    aria-expanded={show}
                >
                    <FontAwesomeIcon icon={show ? faX : faBars} />
                </button>

                <nav className={`${st.navLinks} ${show ? st.navLinksOpen : ''}`}>
                    <ul>
                        <li>
                            <a
                                className={`${st.navLink} ${active === 'abouts' ? st.active : ''}`}
                                href="#abouts"
                                onClick={closeMenu}
                            >
                                About
                            </a>
                        </li>
                        <li>
                            <a
                                className={`${st.navLink} ${active === 'educations' ? st.active : ''}`}
                                href="#educations"
                                onClick={closeMenu}
                            >
                                Education
                            </a>
                        </li>
                        <li>
                            <a
                                className={`${st.navLink} ${active === 'experiences' ? st.active : ''}`}
                                href="#experiences"
                                onClick={closeMenu}
                            >
                                Experience
                            </a>
                        </li>
                        <li>
                            <a
                                className={`${st.navLink} ${active === 'projects' ? st.active : ''}`}
                                href="#projects"
                                onClick={closeMenu}
                            >
                                Projects
                            </a>
                        </li>
                        <li>
                            <a
                                className={`${st.navLink} ${active === 'skills' ? st.active : ''}`}
                                href="#skills"
                                onClick={closeMenu}
                            >
                                Skills
                            </a>
                        </li>
                        <li>
                            <a
                                className={`${st.navLink} ${active === 'contacts' ? st.active : ''}`}
                                href="#contacts"
                                onClick={closeMenu}
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Nav;
