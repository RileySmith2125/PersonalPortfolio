// Single edit point for personal info shown across the site and resume.
export const site = {
  name: 'Riley',
  tagline: 'Software developer',
  bio: 'Short 2–3 sentence bio goes here. Replace this with who you are, what you build, and what you care about.',
  email: 'rileyk2x@gmail.com',
  github: 'https://github.com/<username>',
  linkedin: 'https://www.linkedin.com/in/<username>',
};

// Base-aware link helper. ALWAYS use this for internal hrefs/assets so links
// survive the GitHub Pages base path (/PersonalPortfolio).
export const url = (path: string) =>
  `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;
