// Single edit point for personal info shown across the site and resume.
export const site = {
  name: 'Riley Smith',
  tagline: 'Software developer',
  bio: "This portfolio is where I highlight interests and projects that you won't find on my resume. Machine learning, geopolitics, and football are a couple things you'll find. Enjoy!",
  location: 'Oakland, CA',
  email: 'rileyk2x@gmail.com',
  github: 'https://github.com/RileySmith2125',
  linkedin: 'https://www.linkedin.com/in/<username>',

  // Résumé-only content (distinct from the About-page bio above).
  resumeSummary:
    'Software developer with eight years across payments infrastructure and developer tools. I specialise in the parts other people would rather not own — data integrity, sync, and the systems that have to be correct at 3am. Currently independent.',
  experience: [
    {
      role: 'Independent Software Developer',
      org: 'Self-employed',
      dates: '2024 — Present',
      bullets: [
        'Build developer tools and local-first systems for small teams and solo makers, with clients in fintech and digital publishing.',
        'Shipped Halyard, an open-source CRDT sync engine now running in several production apps.',
      ],
    },
    {
      role: 'Senior Engineer',
      org: 'Tessellate (payments infrastructure)',
      dates: '2021 — 2024',
      bullets: [
        'Owned the double-entry ledger service handling ~2M transactions a day; led a rewrite that cut reconciliation from hours to minutes.',
        'Designed the idempotency and audit layer that passed three external compliance reviews without a finding.',
        'Mentored four engineers and ran the internal systems-design reading group.',
      ],
    },
    {
      role: 'Software Engineer',
      org: 'Northbeam',
      dates: '2019 — 2021',
      bullets: [
        'Grew the internal metrics platform from a prototype to company-wide use.',
        'Introduced plain-text, reviewable infrastructure config; halved deploy incidents.',
      ],
    },
  ],
  skills: [
    { label: 'Languages', value: 'Rust · Go · TypeScript · SQL' },
    { label: 'Systems', value: 'SQLite · PostgreSQL · WebRTC · WebAssembly' },
    { label: 'Focus', value: 'Distributed systems · Local-first · Developer tooling' },
  ],
  education: {
    degree: 'B.S. Computer Science',
    school: 'University of California, Davis',
    year: '2019',
  },
};

// Base-aware link helper. ALWAYS use this for internal hrefs/assets so links
// survive the GitHub Pages base path (/PersonalPortfolio).
export const url = (path: string) =>
  `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;
