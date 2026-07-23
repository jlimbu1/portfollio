// src/data/portfolioData.js
export const education = [
  {
    id: 'bachelor',
    school: 'The University of Hong Kong',
    degree: 'Bachelor of Engineering in Computer Science',
    period: '2016 – 2020',
    description:
      'Focused on software engineering, data structures, and algorithms. Completed a capstone project on IoT-based smart home automation.',
    gpa: '3.7/4.0',
  },
];

export const experience = [
  {
    id: 'diy-rocks',
    company: 'DIY ROCKS',
    role: 'Senior Software Engineer (Frontend Lead)',
    period: '2022 – Present',
    description:
      'Leading development of 3D jewellery configurators and a white-label multi-tenant platform. Architecting frontend with Vue 3, managing state with Pinia, and ensuring responsive, performant UI. Collaborating with designers and backend engineers to deliver B2B SaaS features.',
    skills: ['Vue 3', 'TypeScript', 'Three.js', 'Node.js', 'SCSS'],
  },
  {
    id: 'previous-company',
    company: 'TechCorp Ltd.',
    role: 'Full Stack Engineer',
    period: '2020 – 2022',
    description:
      'Built and maintained B2B platforms, SaaS tools, and ERP systems. Contributed to both frontend (React, Vue) and backend (Node.js, PostgreSQL).',
    skills: ['React', 'Vue 2', 'Node.js', 'PostgreSQL', 'REST APIs'],
  },
];

export const projects = [
  {
    id: 'wealthskey',
    title: 'Wealthskey',
    description:
      'A personal finance dashboard that aggregates bank accounts, tracks expenses, and provides investment insights.',
    tech: ['React', 'Next.js', 'TypeScript', 'Chart.js'],
    links: {
      github: 'https://github.com/jlimbu1/wealthskey',
      demo: 'https://wealthskey-demo.vercel.app',
    },
    image: '',
  },
  {
    id: 'arduino-gameboy',
    title: 'Arduino Gameboy',
    description:
      'A retro handheld gaming console built from scratch using Arduino components. Features a custom PCB, 2.8" TFT display, and game logic written in C++.',
    tech: ['C', 'C++', 'Arduino', 'Electronics'],
    links: {
      github: 'https://github.com/jlimbu1/arduino-gameboy',
    },
    image: '',
  },
  {
    id: 'arm-mooc',
    title: 'ARM MOOC Platform',
    description:
      'An online learning platform for ARM architecture courses. Includes interactive coding exercises and real-time progress tracking.',
    tech: ['Vue', 'Node.js', 'MongoDB', 'Docker'],
    links: {
      demo: 'https://arm-mooc.example.com',
    },
    image: '',
  },
  {
    id: 'bible-app',
    title: 'Bible Study App',
    description:
      'A cross-platform mobile application for reading and studying the Bible with note-taking and verse highlighting.',
    tech: ['React Native', 'Firebase', 'TypeScript'],
    links: {
      github: 'https://github.com/jlimbu1/bible-app',
    },
    image: '',
  },
  {
    id: 'shopk-pos',
    title: 'ShopK POS System',
    description:
      'A point-of-sale system for small retail shops with inventory management, sales analytics, and offline capability.',
    tech: ['Vue 3', 'Electron', 'SQLite'],
    links: {},
    image: '',
  },
  {
    id: 'stripe-integration',
    title: 'Stripe Payment Gateway Integration',
    description:
      'Seamless integration of Stripe payment processing for an e-commerce platform, handling subscriptions and one-time payments.',
    tech: ['Node.js', 'Stripe API', 'React'],
    links: {},
    image: '',
  },
  {
    id: 'ad-hoc-tools',
    title: 'Ad-Hoc Internal Tools',
    description:
      'Collection of small internal tools for data migration, CSV processing, and automated reporting used by the data team.',
    tech: ['Python', 'Bash', 'Node.js'],
    links: { github: 'https://github.com/jlimbu1/ad-hoc-tools' },
    image: '',
  },
  {
    id: 'b2b-data-migration',
    title: 'B2B Data Migration Tool',
    description:
      'A custom tool to migrate customer data from legacy systems to a new cloud-based CRM, ensuring data integrity and minimal downtime.',
    tech: ['Node.js', 'PostgreSQL', 'AWS Lambda'],
    links: {},
    image: '',
  },
];
// src/styles/_variables.scss
$color-primary: #1a1a2e;
$color-secondary: #16213e;
$color-accent: #0f3460;
$color-highlight: #e94560;
$color-bg: #f5f5f5;
$color-text: #333;
$color-text-light: #666;
$color-white: #ffffff;

$breakpoint-mobile: 480px;
$breakpoint-tablet: 768px;
$breakpoint-desktop: 1024px;

$spacing-xs: 4px;
$spacing-sm: 8px;
$spacing-md: 16px;
$spacing-lg: 24px;
$spacing-xl: 32px;
$spacing-2xl: 48px;

$font-size-sm: 0.875rem;
$font-size-base: 1rem;
$font-size-lg: 1.25rem;
$font-size-xl: 1.5rem;
$font-size-heading: 2rem;

$border-radius: 8px;
$transition-speed: 0.3s;
// src/styles/_mixins.scss
@use 'variables' as *;

// Responsive breakpoints
@mixin respond-mobile {
  @media (max-width: #{$breakpoint-mobile}) {
    @content;
  }
}

@mixin respond-tablet {
  @media (min-width: #{$breakpoint-mobile + 1}) and (max-width: #{$breakpoint-tablet}) {
    @content;
  }
}

@mixin respond-desktop {
  @media (min-width: #{$breakpoint-tablet + 1}) {
    @content;
  }
}

@mixin respond($breakpoint) {
  @if $breakpoint == mobile {
    @include respond-mobile {
      @content;
    }
  } @else if $breakpoint == tablet {
    @include respond-tablet {
      @content;
    }
  } @else if $breakpoint == desktop {
    @include respond-desktop {
      @content;
    }
  }
}

// Animation primitives
@mixin fade-in($duration: 0.5s, $delay: 0s) {
  opacity: 0;
  animation: fadeIn $duration ease-in-out $delay forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

@mixin slide-up($distance: 20px, $duration: 0.5s, $delay: 0s) {
  opacity: 0;
  transform: translateY($distance);
  animation: slideUp $duration ease-out $delay forwards;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY($distance);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

// Card hover effect
@mixin card-hover {
  transition: transform $transition-speed, box-shadow $transition-speed;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
}