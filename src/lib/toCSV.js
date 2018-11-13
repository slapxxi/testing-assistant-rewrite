// @flow
import calculateSuccessRate from './calculateSuccessRate';

function toCSV(results) {
  return results.answers
    .filter((r) => calculateSuccessRate(r.correct, r.missed, r.incorrect) < 100)
    .map(
      (r) =>
        `${replaceCommas(r.question)}, ${[...toDB(r.correct), ...toDB(r.missed)].join(
          ', ',
        )}`,
    )
    .join('\n');
}

function toDB(options) {
  return options.map(replaceCommas);
}

function replaceCommas(text) {
  return text.replace(/,/gi, '|');
}

export default toCSV;
