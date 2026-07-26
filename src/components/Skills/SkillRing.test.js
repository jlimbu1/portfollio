import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SkillRing from './SkillRing';

describe('SkillRing', () => {
  test('renders skill name and proficiency', () => {
    render(<SkillRing name="React" proficiency={90} />);
    expect(screen.getByText(/React/i)).toBeInTheDocument();
    expect(screen.getByText(/90%/i)).toBeInTheDocument();
  });

  test('renders SVG circle', () => {
    const { container } = render(<SkillRing name="JavaScript" proficiency={75} />);
    const circle = container.querySelector('circle');
    expect(circle).toBeInTheDocument();
  });

  test('updates percentage text based on proficiency prop', () => {
    const { rerender } = render(<SkillRing name="HTML" proficiency={50} />);
    expect(screen.getByText(/50%/i)).toBeInTheDocument();
    rerender(<SkillRing name="HTML" proficiency={80} />);
    expect(screen.getByText(/80%/i)).toBeInTheDocument();
  });
});