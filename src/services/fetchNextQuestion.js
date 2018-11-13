// @flow
import { showNextQuestion } from '../forms';
import parseOptions from '../lib/parseOptions';
import parsePageTitle from '../lib/parsePageTitle';
import parseQuestionCount from '../lib/parseQuestionCount';

const URL = 'http://81.23.108.42/pers_test/';

async function fetchNextQuestion(options) {
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
  const question = parsePageTitle(data);
  const availableOptions = parseOptions(data);
  const questionCount = parseQuestionCount(data);
  return {
    question,
    availableOptions,
    questionCount,
  };
}

export default fetchNextQuestion;
