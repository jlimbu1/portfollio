import React from 'react';
import { render, screen } from '@testing-library/react';
import SkillRing from './SkillRing';

describe('SkillRing', () => {
  it('renders skill name and proficiency percentage', () => {
    render(<SkillRing name="React" proficiency={90} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('90%')).toBeInTheDocument();
  });

  it('renders circular progress indicator', () => {
    render(<SkillRing name="Python" proficiency={75} />);
    const svg = screen.getByRole('img', { hidden: true }); // progress ring is often an svg
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('viewBox', '0 0 120 120');
  });

  it('sets correct aria label for accessibility', () => {
    render(<SkillRing name="Git" proficiency={85} />);
    const container = screen.getByRole('figure');
    expect(container).toHaveAttribute('aria-label', 'Git proficiency 85%');
  });
});