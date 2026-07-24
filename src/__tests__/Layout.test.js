import React from 'react';
import { render, screen, act } from '@testing-library/react';
import App from '../App';
import tokens from '../styles/Const.module.scss';
import portfolioData from '../data/portfolio.json';

describe('Responsive Layout Tests', () => {
  const setViewport = (width) => {
    window.innerWidth = width;
    window.dispatchEvent(new Event('resize'));
  };

  const checkNoHorizontalOverflow = () => {
    const scrollWidth = document.documentElement.scrollWidth;
    const clientWidth = document.documentElement.clientWidth;
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
  };

  const renderAppAndCheck = () => {
    render(<App />);
    // Wait for layout to settle
    act(() => {
      jest.advanceTimersByTime(100);
    });
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const viewportSizes = [320, 768, 1440];

  viewportSizes.forEach((width) => {
    it(`renders without horizontal overflow at ${width}px`, () => {
      setViewport(width);
      renderAppAndCheck();
      checkNoHorizontalOverflow();
    });
  });

  viewportSizes.forEach((width) => {
    it(`renders all sections at ${width}px`, () => {
      setViewport(width);
      renderAppAndCheck();

      expect(screen.getByText(/About/i)).toBeInTheDocument();
      expect(screen.getByText(/Timeline/i).closest('section, div')).toBeInTheDocument();
      expect(screen.getByText(/Skills/i)).toBeInTheDocument();
      expect(screen.getByText(/Contact/i)).toBeInTheDocument();
    });
  });

  it('applies light theme colors to body', () => {
    renderAppAndCheck();
    const body = document.body;
    const bodyStyle = window.getComputedStyle(body);
    // Expect white background
    expect(bodyStyle.backgroundColor).toBe('rgb(255, 255, 255)');
    // Expect dark text
    expect(bodyStyle.color).toBe('rgb(10, 25, 47)');
  });

  it('validates Const.module.scss exports', () => {
    expect(tokens).toBeDefined();
    expect(typeof tokens).toBe('object');
    expect(Object.keys(tokens).length).toBeGreaterThan(0);
    // Verify that a known class name is exported
    expect(tokens).toHaveProperty('timelineContainer');
    expect(tokens).toHaveProperty('timelineLine');
    expect(tokens).toHaveProperty('timelineNode');
    expect(tokens).toHaveProperty('timelineDot');
    expect(tokens).toHaveProperty('timelineContent');
  });

  it('renders Abouts content from portfolio.json', () => {
    renderAppAndCheck();
    const aboutData = portfolioData.abouts;
    expect(screen.getByText(aboutData.title)).toBeInTheDocument();
    expect(screen.getByText(aboutData.subtitle)).toBeInTheDocument();
    expect(screen.getByText(aboutData.description)).toBeInTheDocument();
    expect(screen.getByText(aboutData.phone)).toBeInTheDocument();
    expect(screen.getByText(aboutData.email)).toBeInTheDocument();
    expect(screen.getByText(aboutData.location)).toBeInTheDocument();
  });

  it('renders Footer content from portfolio.json', () => {
    renderAppAndCheck();
    const footerData = portfolioData.footer;
    expect(screen.getByText(footerData.title)).toBeInTheDocument();
    expect(screen.getByText(footerData.phone)).toBeInTheDocument();
    expect(screen.getByText(footerData.email)).toBeInTheDocument();
  });

  it('applies design tokens to Abouts section', () => {
    renderAppAndCheck();
    const aboutsSection = screen.getByText(/About/i).closest('div');
    expect(aboutsSection).toHaveStyle({
      padding: 'var(--section-padding-y, 64px) var(--section-padding-x, 16px)',
    });
  });

  it('applies design tokens to Footer section', () => {
    renderAppAndCheck();
    const footerSection = screen.getByText(/Contact/i).closest('footer');
    expect(footerSection).toHaveStyle({
      padding: 'var(--section-padding-y, 64px) var(--section-padding-x, 16px)',
    });
  });
});