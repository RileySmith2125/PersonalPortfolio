// Single edit point for personal info shown across the site and resume.
export const site = {
  name: 'Riley Smith',
  tagline: 'Software developer',
  bio: "This portfolio is where I highlight interests and projects that you won't find on my resume. Machine learning, geopolitics, and football are a couple things you'll find. Enjoy!",
  location: 'Oakland, CA',
  email: 'rileyk2x@gmail.com',
  github: 'https://github.com/RileySmith2125',
  linkedin: 'https://www.linkedin.com/in/<username>',

  // The résumé itself is a PDF you drop at public/resume.pdf — it is not
  // generated from this file. See src/pages/resume.astro.
};

// Base-aware link helper. ALWAYS use this for internal hrefs/assets so links
// survive the GitHub Pages base path (/PersonalPortfolio).
export const url = (path: string) =>
  `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;
