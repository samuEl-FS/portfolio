/**
 * Dynamic Experience Calculator Utility
 * Dynamically computes total years of work experience starting from LocoBuzz (November 2017).
 */

export const CAREER_START_DATE = '2017-11-01';

/**
 * Calculates the numeric number of completed years of experience from CAREER_START_DATE to today.
 * @returns {number} Dynamic years count (e.g. 8)
 */
export function getYearsOfExperience(startDateStr = CAREER_START_DATE) {
  const start = new Date(startDateStr);
  const now = new Date();
  const diffInMs = now.getTime() - start.getTime();
  const years = diffInMs / (1000 * 60 * 60 * 24 * 365.25);
  return Math.floor(years);
}

/**
 * Returns formatted years string with '+' suffix (e.g. "8+")
 * @returns {string} Formatted years (e.g. "8+")
 */
export function getFormattedExperienceString(startDateStr = CAREER_START_DATE) {
  return `${getYearsOfExperience(startDateStr)}+`;
}
