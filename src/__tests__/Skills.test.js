import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Skills from '../pages/Skills';

jest.mock('../hooks/useScrollReveal', () => () => [jest.fn(), true]);

const mockSkills = {
  skills: {
    categories: [
      {
        name: 'Frontend',
        skills: [
          { name: 'React', level: 90 },
          { name: 'JavaScript', level: 85 },
          { name: 'TypeScript', level: 75 },
        ],
      },
      {
        name: 'Backend',
        skills: [
          { name: 'Node.js', level: 80 },
          { name: 'Python', level: 70 },
        ],
      },
      {
        name: 'Tools',
        skills: [
          { name: 'Git', level: 85 },
          { name: 'Docker', level: 65 },
        ],
      },
    ],
  },
};

jest.mock('../data/portfolio.json', () => mockSkills);

describe('Skills Section', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Category Groups', () => {
    it('renders all category headings', () => {
      render(<Skills />);
      
      mockSkills.skills.categories.forEach((category) => {
        expect(screen.getByText(category.name)).toBeInTheDocument();
      });
    });

    it('renders skills grouped under correct categories', () => {
      render(<Skills />);
      
      mockSkills.skills.categories.forEach((category) => {
        const categorySection = screen.getByText(category.name).closest('div');
        expect(categorySection).toBeInTheDocument();
        
        category.skills.forEach((skill) => {
          expect(within(categorySection).getByText(skill.name)).toBeInTheDocument();
        });
      });
    });

    it('renders all skill names from JSON data', () => {
      render(<Skills />);
      
      const allSkillNames = mockSkills.skills.categories.flatMap((cat) =>
        cat.skills.map((skill) => skill.name)
      );
      
      allSkillNames.forEach((skillName) => {
        expect(screen.getByText(skillName)).toBeInTheDocument();
      });
    });
  });

  describe('Progress Bars', () => {
    it('renders progress bars for each skill', () => {
      render(<Skills />);
      
      const progressBars = document.querySelectorAll('[role="progressbar"]');
      expect(progressBars.length).toBe(
        mockSkills.skills.categories.flatMap((cat) => cat.skills).length
      );
    });

    it('sets progress bar widths to match skill levels', () => {
      render(<Skills />);
      
      mockSkills.skills.categories.forEach((category) => {
        category.skills.forEach((skill) => {
          const progressBar = screen.getByRole('progressbar', {
            name: new RegExp(`${skill.name}.*${skill.level}%`, 'i'),
          });
          expect(progressBar).toHaveStyle({ width: `${skill.level}%` });
        });
      });
    });

    it('handles edge case: skill with 0% level', () => {
      const skillsWithZero = {
        ...mockSkills,
        skills: {
          categories: [
            {
              name: 'Test',
              skills: [{ name: 'NewSkill', level: 0 }],
            },
          ],
        },
      };
      
      jest.mock('../data/portfolio.json', () => skillsWithZero);
      
      render(<Skills />);
      
      const progressBar = screen.getByRole('progressbar', {
        name: /NewSkill.*0%/i,
      });
      expect(progressBar).toHaveStyle({ width: '0%' });
    });

    it('handles edge case: skill with 100% level', () => {
      const skillsWithMax = {
        ...mockSkills,
        skills: {
          categories: [
            {
              name: 'Test',
              skills: [{ name: 'ExpertSkill', level: 100 }],
            },
          ],
        },
      };
      
      jest.mock('../data/portfolio.json', () => skillsWithMax);
      
      render(<Skills />);
      
      const progressBar = screen.getByRole('progressbar', {
        name: /ExpertSkill.*100%/i,
      });
      expect(progressBar).toHaveStyle({ width: '100%' });
    });
  });

  describe('Responsive Layout', () => {
    const viewportSizes = [
      { width: 320, height: 568, label: '320px' },
      { width: 768, height: 1024, label: '768px' },
      { width: 1024, height: 768, label: '1024px' },
    ];

    viewportSizes.forEach(({ width, height, label }) => {
      it(`has no overlapping elements at ${label}`, () => {
        window.innerWidth = width;
        window.innerHeight = height;
        window.dispatchEvent(new Event('resize'));
        
        const { container } = render(<Skills />);
        
        const elements = container.querySelectorAll('*');
        const rects = Array.from(elements).map((el) => {
          const rect = el.getBoundingClientRect();
          return {
            element: el,
            left: rect.left,
            right: rect.right,
            top: rect.top,
            bottom: rect.bottom,
          };
        });
        
        for (let i = 0; i < rects.length; i++) {
          for (let j = i + 1; j < rects.length; j++) {
            const a = rects[i];
            const b = rects[j];
            
            if (
              a.element.tagName === 'SCRIPT' ||
              a.element.tagName === 'STYLE' ||
              b.element.tagName === 'SCRIPT' ||
              b.element.tagName === 'STYLE'
            ) {
              continue;
            }
            
            const horizontalOverlap = a.left < b.right && a.right > b.left;
            const verticalOverlap = a.top < b.bottom && a.bottom > b.top;
            
            if (horizontalOverlap && verticalOverlap) {
              const aRect = a.element.getBoundingClientRect();
              const bRect = b.element.getBoundingClientRect();
              
              const aArea = aRect.width * aRect.height;
              const bArea = bRect.width * bRect.height;
              
              const overlapLeft = Math.max(aRect.left, bRect.left);
              const overlapRight = Math.min(aRect.right, bRect.right);
              const overlapTop = Math.max(aRect.top, bRect.top);
              const overlapBottom = Math.min(aRect.bottom, bRect.bottom);
              const overlapArea = Math.max(0, overlapRight - overlapLeft) * Math.max(0, overlapBottom - overlapTop);
              
              const minArea = Math.min(aArea, bArea);
              if (overlapArea > minArea * 0.5) {
                throw new Error(
                  `Overlapping elements at ${label}: ${a.element.tagName} and ${b.element.tagName}`
                );
              }
            }
          }
        }
      });
    });
  });

  describe('Empty State', () => {
    it('handles empty categories gracefully', () => {
      const emptySkills = {
        skills: {
          categories: [],
        },
      };
      
      jest.mock('../data/portfolio.json', () => emptySkills);
      
      render(<Skills />);
      
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    it('handles category with empty skills array', () => {
      const emptyCategorySkills = {
        skills: {
          categories: [
            {
              name: 'Empty Category',
              skills: [],
            },
          ],
        },
      };
      
      jest.mock('../data/portfolio.json', () => emptyCategorySkills);
      
      render(<Skills />);
      
      expect(screen.getByText('Empty Category')).toBeInTheDocument();
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('progress bars have accessible names with skill name and level', () => {
      render(<Skills />);
      
      mockSkills.skills.categories.forEach((category) => {
        category.skills.forEach((skill) => {
          const progressBar = screen.getByRole('progressbar', {
            name: new RegExp(`${skill.name}.*${skill.level}%`, 'i'),
          });
          expect(progressBar).toHaveAttribute('aria-valuenow', String(skill.level));
          expect(progressBar).toHaveAttribute('aria-valuemin', '0');
          expect(progressBar).toHaveAttribute('aria-valuemax', '100');
        });
      });
    });
  });
});
