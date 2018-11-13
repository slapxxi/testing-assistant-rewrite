// @flow
function normalizeString(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\s*-\s*/g, '-')
    .replace(/\|/gi, ',');
}

export default normalizeString;
