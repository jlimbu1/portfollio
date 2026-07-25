import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faBriefcase,
  faCode,
  faCalendarDays,
  faBuilding,
  faArrowRight,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import useScrollReveal from "../hooks/useScrollReveal";
import { educationData, experienceData, projectData } from "../data/timelineData";
import st from "../styles/Timeline.module.scss";

function getTypeIcon(type) {
  switch (type) {
    case "education":
      return faGraduationCap;
    case "experience":
      return faBriefcase;
    case "project":
      return faCode;
    default:
      return faCalendarDays;
  }
}

function getTypeLabel(type) {
  switch (type) {
    case "education":
      return "Education";
    case "experience":
      return "Experience";
    case "project":
      return "Project";
    default:
      return "";
  }
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length !== 2) return dateStr;
  const [start, end] = parts;
  const startDate = new Date(start.trim());
  const endDate = end.trim().toLowerCase() === "present" ? "Present" : new Date(end.trim());
  const startFormatted = startDate.toLocaleString("default", {
    month: "short",
    year: "numeric",
  });
  const endFormatted =
    endDate === "Present"
      ? "Present"
      : endDate.toLocaleString("default", { month: "short", year: "numeric" });
  return `${startFormatted} - ${endFormatted}`;
}

function parseDateForSort(dateStr) {
  if (!dateStr) return 0;
  const start = dateStr.split("-")[0].trim();
  return new Date(start).getTime();
}

function TimelineNode({ entry, index }) {
  const [ref, visible] = useScrollReveal();
  const isLeft = index % 2 === 0;
  const typeIcon = getTypeIcon(entry.type);
  const typeLabel = getTypeLabel(entry.type);

  return (
    <div
      ref={ref}
      className={`${st.timelineNode} ${isLeft ? st.left : st.right} ${
        visible ? st.visible : ""
      }`}
      role="article"
      aria-label={`${typeLabel}: ${entry.title}`}
      tabIndex={0}
    >
      <div className={st.timelineBadge}>
        <FontAwesomeIcon icon={typeIcon} aria-hidden="true" />
      </div>
      <div className={st.timelineContent}>
        <div className={st.timelineDate}>
          <FontAwesomeIcon icon={faCalendarDays} className={st.icon} aria-hidden="true" />
          <span>{formatDate(entry.date)}</span>
        </div>
        <h3 className={st.timelineTitle}>{entry.title}</h3>
        {entry.organization && (
          <p className={st.timelineOrg}>
            <FontAwesomeIcon icon={faBuilding} className={st.icon} aria-hidden="true" />
            {entry.organization}
          </p>
        )}
        {entry.description && (
          <p className={st.timelineDescription}>{entry.description}</p>
        )}
        {entry.highlights && entry.highlights.length > 0 && (
          <ul className={st.timelineHighlights}>
            {entry.highlights.map((item, i) => (
              <li key={i}>
                <FontAwesomeIcon icon={faArrowRight} className={st.icon} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        )}
        {entry.courses && entry.courses.length > 0 && (
          <div className={st.timelineCourses}>
            <h4>Relevant Courses</h4>
            <ul>
              {entry.courses.map((course, i) => (
                <li key={i}>
                  <FontAwesomeIcon icon={faBook} className={st.icon} aria-hidden="true" />
                  {course}
                </li>
              ))}
            </ul>
          </div>
        )}
        {entry.image && (
          <img
            src={entry.image}
            alt={entry.title}
            className={st.timelineImage}
            loading="lazy"
          />
        )}
      </div>
    </div>
  );
}

function Timeline() {
  const allEntries = [
    ...educationData.map((e) => ({ ...e, type: "education" })),
    ...experienceData.map((e) => ({ ...e, type: "experience" })),
    ...projectData.map((e) => ({ ...e, type: "project" })),
  ];

  const sortedEntries = allEntries.sort((a, b) => {
    const dateA = parseDateForSort(a.date);
    const dateB = parseDateForSort(b.date);
    return dateB - dateA;
  });

  if (sortedEntries.length === 0) {
    return (
      <section id="timeline" className={st.timelineSection} aria-label="Timeline">
        <div className={st.timelineContainer}>
          <h2 className={st.timelineHeading}>Timeline</h2>
          <p className={st.timelineEmpty}>No timeline entries to display.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="timeline" className={st.timelineSection} aria-label="Timeline">
      <div className={st.timelineContainer}>
        <h2 className={st.timelineHeading}>Timeline</h2>
        <div className={st.timelineTrack} role="list">
          {sortedEntries.map((entry, index) => (
            <TimelineNode key={`${entry.type}-${entry.title}-${index}`} entry={entry} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Timeline;