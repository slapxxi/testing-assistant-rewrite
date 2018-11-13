// @flow
import { showNextQuestion } from '../forms';
import parseResults from '../lib/parseResults';
import toCSV from '../lib/toCSV';

const URL = 'http://81.23.108.42/pers_test/';

async function completeTesting(options) {
  const selectedAnswers = options.map((option) => option.id);
  const form = showNextQuestion(selectedAnswers);
  const response = await fetch(URL, {
    method: 'post',
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: form,
    credentials: 'include',
  });
  const data = await response.text();
  // the most important part
  const results = parseResults(data);
  console.log(`Paste this data into ${results.testType}:\n`, toCSV(results));
  return {
    results,
  };
}

export default completeTesting;
