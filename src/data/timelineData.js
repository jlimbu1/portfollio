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
      "Multiplayer online dungeon crawler game built with Java and LibGDX. Features procedural map generation, networked multiplayer, and real-time combat.",
    type: "project",
  },
];

/**
 * Returns all timeline entries merged and sorted by date (most recent first).
 * Each entry is normalized to include a `sortDate` (Date object) for ordering.
 * @returns {Array<Object>} Sorted array of timeline entry objects.
 */
export function getTimelineEntries() {
  const allEntries = [...educationData, ...experienceData, ...projectData];

  const parsed = allEntries.map((entry) => {
    const sortDate = parseDateFromRange(entry.date);
    return { ...entry, sortDate };
  });

  parsed.sort((a, b) => {
    if (!a.sortDate && !b.sortDate) return 0;
    if (!a.sortDate) return 1;
    if (!b.sortDate) return -1;
    return b.sortDate - a.sortDate;
  });

  return parsed;
}

/**
 * Parses a date string like "2023 - Present" or "2022" into a Date object.
 * For "Present", uses the current date. Returns null if unparseable.
 * @param {string} dateStr
 * @returns {Date|null}
 */
function parseDateFromRange(dateStr) {
  if (!dateStr || typeof dateStr !== "string") return null;

  const trimmed = dateStr.trim();

  // Handle "YYYY - Present" or "YYYY - present"
  const presentMatch = trimmed.match(/^(\d{4})\s*[-–]\s*Present$/i);
  if (presentMatch) {
    return new Date();
  }

  // Handle "YYYY - YYYY"
  const rangeMatch = trimmed.match(/^(\d{4})\s*[-–]\s*(\d{4})$/);
  if (rangeMatch) {
    const endYear = parseInt(rangeMatch[2], 10);
    return new Date(endYear, 11, 31);
  }

  // Handle single year "YYYY"
  const singleMatch = trimmed.match(/^(\d{4})$/);
  if (singleMatch) {
    const year = parseInt(singleMatch[1], 10);
    return new Date(year, 11, 31);
  }

  return null;
}
