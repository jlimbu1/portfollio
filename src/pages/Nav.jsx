import st from '../styles/App.module.scss'
import React, { useState, useCallback, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faX } from '@fortawesome/free-solid-svg-icons'

function Nav() {
    const [scrolled, setScrolled] = useState(false);
    const [show, setShow] = useState(false);

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
                    <a href="#abouts" onClick={closeMenu}>About</a>
                    <a href="#educations" onClick={closeMenu}>Education</a>
                    <a href="#experiences" onClick={closeMenu}>Experience</a>
                    <a href="#projects" onClick={closeMenu}>Projects</a>
                    <a href="#skills" onClick={closeMenu}>Skills</a>
                    <a href="#contacts" onClick={closeMenu}>Contact</a>
                </nav>
            </div>
        </header>
    )
}

export default Nav;
