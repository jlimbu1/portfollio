import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TimelineNode from '../TimelineNode';

jest.mock('../../../hooks/useScrollReveal', () => ({
  __esModule: true,
  default: jest.fn(),
}));

import useScrollReveal from '../../../hooks/useScrollReveal';

describe('TimelineNode', () => {
  const mockEntry = {
    title: 'Software Engineer',
    company: 'Tech Corp',
    date: '2020 - Present',
    description: 'Built scalable web applications.',
  };

  beforeEach(() => {
    useScrollReveal.mockReturnValue([{ current: null }, false]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders title, company, date, and description from entry prop', () => {
    render(<TimelineNode entry={mockEntry} />);

    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
    expect(screen.getByText('2020 - Present')).toBeInTheDocument();
    expect(screen.getByText('Built scalable web applications.')).toBeInTheDocument();
  });

  it('renders institution when company is missing', () => {
    const entryWithInstitution = {
      title: 'Student',
      institution: 'University',
      date: '2016 - 2020',
      description: 'Studied CS.',
    };

    render(<TimelineNode entry={entryWithInstitution} />);

    expect(screen.getByText('University')).toBeInTheDocument();
    expect(screen.queryByText('Tech Corp')).not.toBeInTheDocument();
  });

  it('renders nothing when entry is null', () => {
    const { container } = render(<TimelineNode entry={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when entry is undefined', () => {
    const { container } = render(<TimelineNode entry={undefined} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders without crashing when all optional fields are missing', () => {
    const { container } = render(<TimelineNode entry={{}} />);

    expect(container.firstChild).not.toBeNull();
    expect(screen.getByTestId('timeline-node')).toBeInTheDocument();
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('renders without crashing when entry has only title', () => {
    render(<TimelineNode entry={{ title: 'Only Title' }} />);

    expect(screen.getByText('Only Title')).toBeInTheDocument();
    expect(screen.queryByText('Tech Corp')).not.toBeInTheDocument();
  });

  it('renders without crashing when entry has only description', () => {
    render(<TimelineNode entry={{ description: 'Only description.' }} />);

    expect(screen.getByText('Only description.')).toBeInTheDocument();
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('renders without crashing when entry has only date', () => {
    render(<TimelineNode entry={{ date: '2024' }} />);

    expect(screen.getByText('2024')).toBeInTheDocument();
  });

  it('applies scroll-reveal visible class when useScrollReveal returns true', () => {
    useScrollReveal.mockReturnValue([{ current: null }, true]);

    render(<TimelineNode entry={mockEntry} />);

    const node = screen.getByTestId('timeline-node');
    expect(node).toHaveClass('visible');
  });

  it('does not apply scroll-reveal visible class when useScrollReveal returns false', () => {
    useScrollReveal.mockReturnValue([{ current: null }, false]);

    render(<TimelineNode entry={mockEntry} />);

    const node = screen.getByTestId('timeline-node');
    expect(node).not.toHaveClass('visible');
  });

  it('calls useScrollReveal hook', () => {
    render(<TimelineNode entry={mockEntry} />);

    expect(useScrollReveal).toHaveBeenCalledTimes(1);
  });

  it('renders institution over company when both are provided', () => {
    const entryWithBoth = {
      title: 'Developer',
      institution: 'Institute A',
      company: 'Company B',
      date: '2022',
      description: 'Worked on stuff.',
    };

    render(<TimelineNode entry={entryWithBoth} />);

    expect(screen.getByText('Institute A')).toBeInTheDocument();
    expect(screen.queryByText('Company B')).not.toBeInTheDocument();
  });

  it('renders with correct data-testid attribute', () => {
    render(<TimelineNode entry={mockEntry} />);

    expect(screen.getByTestId('timeline-node')).toBeInTheDocument();
  });

  it('renders description as paragraph element', () => {
    render(<TimelineNode entry={mockEntry} />);

    const description = screen.getByText('Built scalable web applications.');
    expect(description.tagName).toBe('P');
  });

  it('renders title as h3 element', () => {
    render(<TimelineNode entry={mockEntry} />);

    const title = screen.getByText('Software Engineer');
    expect(title.tagName).toBe('H3');
  });
});
