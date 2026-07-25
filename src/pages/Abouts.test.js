import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Abouts from './Abouts';

// Mock the scroll reveal hook
jest.mock('../hooks/useScrollReveal', () => ({
  __esModule: true,
  default: () => [null, true],
}));

describe('Abouts Component', () => {
  test('renders the About heading', () => {
    render(<Abouts />);
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  test('renders the subtitle Software Engineer', () => {
    render(<Abouts />);
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  });

  test('renders contact phone number', () => {
    render(<Abouts />);
    expect(screen.getByText(/\+852 54980873/)).toBeInTheDocument();
  });

  test('renders contact email', () => {
    render(<Abouts />);
    expect(screen.getByText(/limbujimmy1@gmail.com/)).toBeInTheDocument();
  });

  test('renders location', () => {
    render(<Abouts />);
    expect(screen.getByText(/Mong Kok, Hong Kong/)).toBeInTheDocument();
  });

  test('renders profile image with correct alt text', () => {
    render(<Abouts />);
    const img = screen.getByAltText('Jimmy Limbu');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://i.imgur.com/8wtSgQm.jpg');
  });

  test('renders bio paragraph', () => {
    render(<Abouts />);
    const bio = screen.getByText(/Software engineer with 4\+ years of experience/);
    expect(bio).toBeInTheDocument();
  });

  test('has correct container id for navigation', () => {
    render(<Abouts />);
    const container = document.getElementById('abouts');
    expect(container).toBeInTheDocument();
  });

  test('applies reveal animation classes when visible', () => {
    render(<Abouts />);
    const wrapper = screen.getByAltText('Jimmy Limbu').closest('div');
    expect(wrapper).toHaveClass('reveal');
    expect(wrapper).toHaveClass('visible');
  });

  test('renders FontAwesome icons for contact items', () => {
    const { container } = render(<Abouts />);
    const icons = container.querySelectorAll('svg');
    expect(icons.length).toBeGreaterThanOrEqual(3);
  });
});