import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Timeline from './Timeline';

// Mock IntersectionObserver to trigger visibility
let callback;
class MockIntersectionObserver {
  constructor(cb) {
    callback = cb;
    this.observe = jest.fn();
    this.unobserve = jest.fn();
    this.disconnect = jest.fn();
  }
}
window.IntersectionObserver = MockIntersectionObserver;

// Since useScrollReveal uses ref and useEffect, we need to trigger the callback
// after each entry mounts. We'll trigger intersection for all entries after render.

const triggerAllVisible = () => {
  // Find all observed elements (entries) and trigger intersection
  document.querySelectorAll('[data-visible="false"]').forEach(element => {
    act(() => {
      callback([{ isIntersecting: true, target: element }]);
    });
  });
};

describe('Timeline', () => {
  beforeEach(() => {
    // Reset the callback before each test
    callback = undefined;
  });

  test('renders timeline section heading', () => {
    render(<Timeline />);
    expect(screen.getByRole('heading', { name: /timeline/i })).toBeInTheDocument();
  });

  test('renders all education, experience, and project entries', () => {
    render(<Timeline />);
    // Entries should match the number of combined data items.
    // From timelineData we have 2 edu, 3 exp, 3 proj = 8 entries.
    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(8);
  });

  test('displays correct entry details', () => {
    render(<Timeline />);
    expect(screen.getByText(/Higher Diploma in Software Engineering/i)).toBeInTheDocument();
    expect(screen.getByText(/IVE - Hong Kong Institute of Vocational Education/i)).toBeInTheDocument();
    expect(screen.getByText(/DIY ROCKS/i)).toBeInTheDocument();
    expect(screen.getByText(/ARM MOOC Platform/i)).toBeInTheDocument();
  });

  test('entries become visible when intersecting viewport', () => {
    render(<Timeline />);
    // Initially all entries invisible (data-visible="false")
    const entries = screen.getAllByRole('listitem');
    entries.forEach(entry => {
      expect(entry).toHaveAttribute('data-visible', 'false');
    });

    // Trigger intersection callback for all
    triggerAllVisible();

    entries.forEach(entry => {
      expect(entry).toHaveAttribute('data-visible', 'true');
    });
  });
});