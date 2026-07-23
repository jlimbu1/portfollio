import { useState } from 'react';

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top"
      style={{
        backgroundColor: 'var(--color-bg-alt)',
        borderBottom: '1px solid var(--color-border)',
        padding: '0.5rem 1rem',
      }}
    >
      <div className="container">
        <span
          className="navbar-brand mb-0 h1"
          style={{ color: 'var(--color-primary)', fontWeight: 700 }}
        >
          Jimmy Limbu
        </span>
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {['abouts', 'education', 'experience', 'projects', 'skills', 'contacts'].map(
              (section) => (
                <li className="nav-item" key={section}>
                  <button
                    className="nav-link btn btn-link"
                    onClick={() => scrollToSection(section)}
                    style={{
                      textTransform: 'capitalize',
                      color: 'var(--color-text)',
                      textDecoration: 'none',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = 'var(--color-primary)')}
                    onMouseLeave={(e) => (e.target.style.color = 'var(--color-text)')}
                  >
                    {section}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;