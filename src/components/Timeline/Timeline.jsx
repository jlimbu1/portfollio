import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SkillRing from './SkillRing';

describe('SkillRing', () => {
  const defaultProps = {
    icon: 'devicon-react-original',
    label: 'React',
    proficiency: 90,
    target: 'experiences',
  };

  it('renders the skill label', () => {
    render(<SkillRing {...defaultProps} />);
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('renders the proficiency percentage', () => {
    render(<SkillRing {...defaultProps} />);
    expect(screen.getByText('90%')).toBeInTheDocument();
  });

  it('renders an accessible progressbar role', () => {
    render(<SkillRing {...defaultProps} />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toBeInTheDocument();
  });

  it('sets aria-valuenow to the proficiency value', () => {
    render(<SkillRing {...defaultProps} />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '90');
  });

  it('sets aria-valuemin to 0', () => {
    render(<SkillRing {...defaultProps} />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuemin', '0');
  });

  it('sets aria-valuemax to 100', () => {
    render(<SkillRing {...defaultProps} />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuemax', '100');
  });

  it('sets aria-label with the skill name', () => {
    render(<SkillRing {...defaultProps} />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-label', 'React proficiency');
  });

  it('renders the icon element with the correct class', () => {
    render(<SkillRing {...defaultProps} />);
    const icon = document.querySelector('i.devicon-react-original');
    expect(icon).toBeInTheDocument();
  });

  it('renders the SVG circle for the progress ring', () => {
    render(<SkillRing {...defaultProps} />);
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    const circle = svg.querySelector('circle');
    expect(circle).toBeInTheDocument();
  });

  it('applies the correct stroke-dashoffset based on proficiency', () => {
    render(<SkillRing {...defaultProps} />);
    const circle = document.querySelector('svg circle');
    expect(circle).toBeInTheDocument();
    const circumference = 2 * Math.PI * 45;
    const expectedOffset = circumference - (90 / 100) * circumference;
    const actualOffset = parseFloat(circle.getAttribute('stroke-dashoffset'));
    expect(actualOffset).toBeCloseTo(expectedOffset, 0);
  });

  it('renders with minimum proficiency of 0', () => {
    render(<SkillRing {...defaultProps} proficiency={0} />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '0');
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('renders with maximum proficiency of 100', () => {
    render(<SkillRing {...defaultProps} proficiency={100} />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '100');
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('clamps proficiency to 0 when negative value is provided', () => {
    render(<SkillRing {...defaultProps} proficiency={-10} />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '0');
  });

  it('clamps proficiency to 100 when value exceeds 100', () => {
    render(<SkillRing {...defaultProps} proficiency={150} />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '100');
  });

  it('renders without a target prop', () => {
    const propsWithoutTarget = {
      icon: 'devicon-javascript-plain',
      label: 'JavaScript',
      proficiency: 85,
    };
    render(<SkillRing {...propsWithoutTarget} />);
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('85%')).toBeInTheDocument();
  });

  it('renders with an empty label gracefully', () => {
    render(<SkillRing {...defaultProps} label="" />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toBeInTheDocument();
    expect(progressbar).toHaveAttribute('aria-label', ' proficiency');
  });

  it('renders with a missing icon gracefully', () => {
    render(<SkillRing {...defaultProps} icon="" />);
    expect(screen.getByText('React')).toBeInTheDocument();
    const icon = document.querySelector('i');
    expect(icon).toBeInTheDocument();
    expect(icon.className).toBe('');
  });
});