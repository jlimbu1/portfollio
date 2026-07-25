// src/data/timelineData.js

export const educationData = [
  {
    id: "edu-1",
    title: "Higher Diploma in Software Engineering",
    institution: "IVE - Hong Kong Institute of Vocational Education",
    date: "2020 - 2022",
    description:
      "Focused on software development fundamentals, object-oriented programming, database management, and web application development. Completed multiple team-based projects simulating real-world software engineering workflows.",
    type: "education",
  },
  {
    id: "edu-2",
    title: "BSc (Hons) in Computing",
    institution: "Ulster University",
    date: "2022 - 2023",
    description:
      "Top-up degree program covering advanced computing topics including artificial intelligence, machine learning, cloud computing, and enterprise software architecture. Graduated with honors.",
    type: "education",
  },
];

export const experienceData = [
  {
    id: "exp-1",
    title: "Software Engineer",
    organization: "DIY ROCKS",
    date: "2023 - Present",
    description:
      "Leading development of 3D jewellery configurators and a white-label multi-tenant platform. Architecting frontend solutions with Vue 3, TypeScript, and Tailwind CSS. Building scalable microservices backend with NestJS and MongoDB. Implementing real-time 3D rendering pipelines and CI/CD workflows.",
    type: "experience",
  },
  {
    id: "exp-2",
    title: "Full Stack Developer",
    organization: "Fletrix",
    date: "2022 - 2023",
    description:
      "Developed and maintained B2B SaaS platform features using Vue 2, NuxtJS, and ExpressJS. Built RESTful APIs and integrated third-party services. Collaborated with cross-functional teams to deliver product increments on schedule.",
    type: "experience",
  },
  {
    id: "exp-3",
    title: "Junior Software Developer",
    organization: "Wealthskey",
    date: "2021 - 2022",
    description:
      "Built responsive web applications using React and NextJS. Implemented state management with Redux and integrated payment gateways. Participated in code reviews and agile ceremonies.",
    type: "experience",
  },
];

export const projectData = [
  {
    id: "proj-1",
    title: "ARM MOOC Platform",
    date: "2023",
    description:
      "A massive open online course platform for ARM architecture education. Built with NodeJS, ExpressJS, and MongoDB. Deployed on AWS EC2 with Docker and Kubernetes orchestration. Features include video streaming, interactive quizzes, and progress tracking.",
    type: "project",
  },
  {
    id: "proj-2",
    title: "Arduino Gameboy",
    date: "2022",
    description:
      "Custom handheld gaming device built with Arduino, C, and C++. Features a custom PCB, LCD display, and button inputs. Programmed classic games including Snake and Tetris with optimized memory management.",
    type: "project",
  },
  {
    id: "proj-3",
    title: "Danger Dungeon",
    date: "2022",
    description:
      "Multiplayer online dungeon crawler game built with Java and LibGDX. Features procedurally generated dungeons, real-time multiplayer combat, and loot systems. Deployed using custom server architecture.",
    type: "project",
  },
];

/**
 * Returns all timeline entries merged and sorted by date (most recent first).
 * Handles date ranges like "2023 - Present" by extracting the start year.
 * Entries with unparseable dates are placed at the end.
 * @returns {Array} Sorted array of timeline entry objects.
 */
export function getSortedTimelineEntries() {
  const allEntries = [...educationData, ...experienceData, ...projectData];

  return allEntries.sort((a, b) => {
    const yearA = extractStartYear(a.date);
    const yearB = extractStartYear(b.date);

    if (yearA === null && yearB === null) return 0;
    if (yearA === null) return 1;
    if (yearB === null) return -1;
    return yearB - yearA;
  });
}

/**
 * Extracts the start year from a date string.
 * Handles formats: "2023", "2023 - Present", "2020 - 2022".
 * Returns null if no valid year is found.
 * @param {string} dateStr
 * @returns {number|null}
 */
function extractStartYear(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return null;
  const match = dateStr.match(/^(\d{4})/);
  if (!match) return null;
  const year = parseInt(match[1], 10);
  return isNaN(year) ? null : year;
}

/**
 * Validates that a timeline entry has all required fields.
 * Required: id, title, date, description, type.
 * @param {object} entry
 * @returns {boolean}
 */
export function isValidTimelineEntry(entry) {
  if (!entry || typeof entry !== 'object') return false;
  const requiredFields = ['id', 'title', 'date', 'description', 'type'];
  return requiredFields.every(field => {
    const value = entry[field];
    return value !== undefined && value !== null && typeof value === 'string' && value.trim().length > 0;
  });
}

/**
 * Returns all timeline entries that pass validation.
 * @returns {Array}
 */
export function getValidTimelineEntries() {
  return getSortedTimelineEntries().filter(isValidTimelineEntry);
}
