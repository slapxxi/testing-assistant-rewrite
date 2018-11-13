// @flow
import cheerio from 'react-native-cheerio';
import calculateSuccessRate from './calculateSuccessRate';
import normalizeString from './normalizeString';

const selectors = {
  resultsTable: 'table.results',
  tableRow: 'tbody > tr',
  question: 'td:nth-child(2)',
  answers: 'td:nth-child(3)',
  correctAnswer:
    'p[style="margin: 0; padding: 0px 25px; background-color: lightgreen; color: darkgreen;"]',
  incorrectAnswer: 'p[style="margin: 0; padding: 0px 25px;  color: darkred;"]',
  correctButNotChoseAnswer:
    'p[style="margin: 0; padding: 0px 25px; background-color: lightgreen;"]',
  remainingAnswer: 'p[style="margin: 0; padding: 0px 25px; "]',
};

function parseResults(html) {
  const answers = [];
  const $ = cheerio.load(html);
  const $table = $(selectors.resultsTable);
  const $rows = assertNotEmpty($table.find(selectors.tableRow), 'table rows');
  const testType = $rows
    .first()
    .find('th')
    .text();
  $rows.next().each((i, row) => {
    const $row = $(row);
    if (!contains($row, 'td+td+td+td')) {
      return;
    }
    const question = normalizeString($row.find(selectors.question).text());
    const $answers = assertNotEmpty($row.find(selectors.answers), 'answers');
    const correctAnswers = findCorrectAnswers($answers, $);
    const incorrectAnswers = findIncorrectAnswers($answers, $);
    const missedAnswers = findMissedAnswers($answers, $);
    const remainingAnswers = findRemainingAnswers($answers, $);
    answers.push({
      question,
      correct: correctAnswers,
      incorrect: incorrectAnswers,
      missed: missedAnswers,
      remaining: remainingAnswers,
      rating: calculateSuccessRate(correctAnswers, missedAnswers, incorrectAnswers),
    });
  });
  return {
    testType,
    answers,
    rating: determineOverallRating(answers),
  };
}

function determineOverallRating(answers) {
  return Math.min(...answers.map((r) => r.rating));
}

const findCorrectAnswers = createFinder(selectors.correctAnswer);
const findIncorrectAnswers = createFinder(selectors.incorrectAnswer);
const findMissedAnswers = createFinder(selectors.correctButNotChoseAnswer);
const findRemainingAnswers = createFinder(selectors.remainingAnswer);

function createFinder(selector) {
  return ($answers, $) => {
    const result = [];
    $answers.find(selector).each((i, a) => result.push(normalizeString($(a).text())));
    return result;
  };
}

function contains($element, selector) {
  return $element.find(selector).length !== 0;
}

function assertNotEmpty($collection, selectorName) {
  if ($collection.length === 0) {
    throw new Error(`Missing selector: "${selectorName}"`);
  }
  return $collection;
}

export default parseResults;
