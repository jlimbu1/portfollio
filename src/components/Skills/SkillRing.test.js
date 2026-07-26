import React from 'react';
import { render, screen } from '@testing-library/react';
import SkillRing from './SkillRing';

describe('SkillRing', () => {
  it('renders skill name', () => {
    render(<SkillRing name="React" proficiency={90} />);
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('sets correct aria label for accessibility', () => {
    render(<SkillRing name="Git" proficiency={85} />);
    const container = screen.getByRole('figure');
    expect(container).toHaveAttribute('aria-label', 'Git proficiency 85%');
  });

  it('renders progress bar with correct width', () => {
    render(<SkillRing name="Python" proficiency={75} />);
    const barFill = document.querySelector('[class*="barFill"]');
    expect(barFill).toHaveStyle('width: 75%');
  });
});