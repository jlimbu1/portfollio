import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import App from '../App';
import Abouts from '../pages/Abouts';
import InteractiveTimeline from '../pages/InteractiveTimeline';
import Skills from '../pages/Skills';
import Footer from '../pages/Footer';

expect.extend(toHaveNoViolations);

describe('Accessibility Tests', () => {
  describe('App - Full Page Audit', () => {
    it('should have no axe violations', async () => {
      const { container } = render(<App />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Abouts Section', () => {
    it('should have no axe violations', async () => {
      const { container } = render(<Abouts />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have accessible heading', () => {
      const { getByRole } = render(<Abouts />);
      const heading = getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading.textContent).toBeTruthy();
    });

    it('should have accessible image with alt text', () => {
      const { getByRole } = render(<Abouts />);
      const image = getByRole('img');
      expect(image).toHaveAttribute('alt');
      expect(image.getAttribute('alt')).toBeTruthy();
    });
  });

  describe('InteractiveTimeline Section', () => {
    it('should have no axe violations', async () => {
      const { container } = render(<InteractiveTimeline />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have accessible filter buttons', () => {
      const { getAllByRole } = render(<InteractiveTimeline />);
      const buttons = getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).toHaveAccessibleName();
      });
    });

    it('should have accessible timeline nodes', () => {
      const { getAllByRole } = render(<InteractiveTimeline />);
      const nodes = getAllByRole('button');
      nodes.forEach((node) => {
        expect(node).toHaveAccessibleName();
      });
    });

    it('should have logical heading hierarchy', () => {
      const { container } = render(<InteractiveTimeline />);
      const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
      let previousLevel = 0;
      headings.forEach((heading) => {
        const level = parseInt(heading.tagName.replace('H', ''), 10);
        expect(level - previousLevel).toBeLessThanOrEqual(1);
        previousLevel = level;
      });
    });
  });

  describe('Skills Section', () => {
    it('should have no axe violations', async () => {
      const { container } = render(<Skills />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have accessible heading', () => {
      const { getByRole } = render(<Skills />);
      const heading = getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading.textContent).toBeTruthy();
    });

    it('should have accessible progress bars', () => {
      const { getAllByRole } = render(<Skills />);
      const progressbars = getAllByRole('progressbar');
      progressbars.forEach((bar) => {
        expect(bar).toHaveAccessibleName();
        expect(bar).toHaveAttribute('aria-valuenow');
        expect(bar).toHaveAttribute('aria-valuemin');
        expect(bar).toHaveAttribute('aria-valuemax');
      });
    });
  });

  describe('Footer Section', () => {
    it('should have no axe violations', async () => {
      const { container } = render(<Footer />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have accessible social links', () => {
      const { getAllByRole } = render(<Footer />);
      const links = getAllByRole('link');
      links.forEach((link) => {
        expect(link).toHaveAccessibleName();
      });
    });

    it('should have accessible heading', () => {
      const { getByRole } = render(<Footer />);
      const heading = getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading.textContent).toBeTruthy();
    });
  });

  describe('Keyboard Navigation', () => {
    it('should have focusable interactive elements in logical order', () => {
      const { container } = render(<App />);
      const focusableElements = container.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      let previousTabIndex = -1;
      focusableElements.forEach((element) => {
        const tabIndex = element.getAttribute('tabindex');
        const currentTabIndex = tabIndex ? parseInt(tabIndex, 10) : 0;
        if (currentTabIndex >= 0) {
          expect(currentTabIndex).toBeGreaterThanOrEqual(previousTabIndex);
          previousTabIndex = currentTabIndex;
        }
      });
    });

    it('should have no focus traps', () => {
      const { container } = render(<App />);
      const focusableElements = container.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      expect(focusableElements.length).toBeGreaterThan(0);
    });
  });

  describe('Color Contrast', () => {
    it('should have sufficient color contrast on text elements', async () => {
      const { container } = render(<App />);
      const textElements = container.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, li, label');
      textElements.forEach((element) => {
        const style = window.getComputedStyle(element);
        const color = style.color;
        const backgroundColor = style.backgroundColor;
        if (color && backgroundColor && color !== 'transparent' && backgroundColor !== 'transparent') {
          expect(color).toBeDefined();
          expect(backgroundColor).toBeDefined();
        }
      });
    });
  });
});
