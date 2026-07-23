import st from '../styles/App.module.scss'
import React, { useState, useCallback, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faX } from '@fortawesome/free-solid-svg-icons'
import useScrollSpy from '../hooks/useScrollSpy'

const sections = ['abouts', 'educations', 'experiences', 'projects', 'skills', 'contacts'];

function Nav() {
    const [scrolled, setScrolled] = useState(false);
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const active = useScrollSpy(sections, 120);

    const handleScroll = useCallback(() => {
        setScrolled(window.scrollY > 50);
        setShowOffcanvas(false);
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    const toggleOffcanvas = () => setShowOffcanvas(prev => !prev);
    const closeOffcanvas = () => setShowOffcanvas(false);

    return (
        <header className={`${st.nav} ${scrolled ? st.navScrolled : ''}`}>
            <div className={`${st.navInner} container-fluid`}>
                <nav className="navbar navbar-expand-lg w-100 p-0">
                    <a className={`${st.logo} navbar-brand`} href="#abouts" onClick={closeOffcanvas}>
                        <img src="https://i.imgur.com/YLt0FBm.jpg" alt="logo" />
                    </a>

                    <button
                        className="navbar-toggler border-0"
                        type="button"
                        onClick={toggleOffcanvas}
                        aria-controls="offcanvasNavbar"
                        aria-expanded={showOffcanvas}
                        aria-label="Toggle navigation"
                    >
                        <FontAwesomeIcon
                            icon={showOffcanvas ? faX : faBars}
                            style={{ color: showOffcanvas ? '#ccd6f6' : '#2fcaa6' }}
                        />
                    </button>

                    <div
                        className={`offcanvas offcanvas-end ${showOffcanvas ? 'show' : ''}`}
                        tabIndex="-1"
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                        style={{
                            backgroundColor: '#020c1b',
                            width: '280px',
                            visibility: showOffcanvas ? 'visible' : 'hidden'
                        }}
                    >
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel" style={{ color: '#ccd6f6' }}>
                                Navigation
                            </h5>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                aria-label="Close"
                                onClick={closeOffcanvas}
                            />
                        </div>
                        <div className="offcanvas-body p-0">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                {[
                                    ['abouts', 'About'],
                                    ['educations', 'Education'],
                                    ['experiences', 'Experience'],
                                    ['projects', 'Projects'],
                                    ['skills', 'Skills'],
                                    ['contacts', 'Contact'],
                                ].map(([id, label]) => (
                                    <li className="nav-item" key={id}>
                                        <a
                                            className={`nav-link ${active === id ? st.navActive : ''}`}
                                            href={`#${id}`}
                                            onClick={closeOffcanvas}
                                            style={{
                                                color: active === id ? '#2fcaa6' : '#8892b0',
                                                fontWeight: active === id ? 600 : 400
                                            }}
                                        >
                                            {label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Desktop nav links: always visible on large screens */}
                    <ul className="navbar-nav d-none d-lg-flex ms-auto">
                        {[
                            ['abouts', 'About'],
                            ['educations', 'Education'],
                            ['experiences', 'Experience'],
                            ['projects', 'Projects'],
                            ['skills', 'Skills'],
                            ['contacts', 'Contact'],
                        ].map(([id, label]) => (
                            <li className="nav-item" key={id}>
                                <a
                                    className={`nav-link ${active === id ? st.navActive : ''}`}
                                    href={`#${id}`}
                                    onClick={closeOffcanvas}
                                    style={{
                                        color: active === id ? '#2fcaa6' : '#8892b0',
                                        fontWeight: active === id ? 600 : 400
                                    }}
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