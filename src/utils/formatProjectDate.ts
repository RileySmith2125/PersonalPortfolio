// Compact "2025—" / "2024—25" / "2024" meta-line date format shared by the
// project detail page and the full-portfolio print document.
export const formatProjectDate = (start: Date, end?: Date) => {
  // Dates are date-only (from zod's z.coerce.date(), parsed as UTC midnight);
  // use UTC getters so e.g. "2025-01-01" doesn't shift back a year in
  // timezones behind UTC.
  const startYear = start.getUTCFullYear();
  if (!end) return `${startYear}—`;
  const endYear = end.getUTCFullYear();
  return startYear === endYear ? `${startYear}` : `${startYear}—${String(endYear).slice(-2)}`;
};
