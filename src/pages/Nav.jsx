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

export default Nav;