# PM Planning Guidelines

- Every ticket that involves any user interface changes **must** explicitly require full mobile responsiveness:
  - Use flexible layouts (flexbox, grid, percentage widths).
  - Add appropriate CSS media queries for breakpoints (e.g., 768px for tablets, 480px for phones).
  - Ensure touch targets (buttons, links) are at least 44x44 CSS pixels.

- Include acceptance criteria for responsiveness in each UI ticket.