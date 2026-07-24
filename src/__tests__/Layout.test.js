import React from 'react';
import { render, screen, act } from '@testing-library/react';
import App from '../App';
import tokens from '../styles/Const.module.scss';

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

  it('validates Const.module.scss exports', () => {
    expect(tokens).toBeDefined();
    expect(typeof tokens).toBe('object');
    expect(Object.keys(tokens).length).toBeGreaterThan(0);
    expect(tokens).toHaveProperty('colorPrimary');
    expect(tokens).toHaveProperty('breakpointSm');
    expect(tokens).toHaveProperty('breakpointMd');
    expect(tokens).toHaveProperty('breakpointLg');
    expect(tokens).toHaveProperty('colorSecondary');
    expect(tokens).toHaveProperty('fontPrimary');
    expect(tokens).toHaveProperty('spacingUnit');
    expect(tokens).toHaveProperty('colorText');
  });
});