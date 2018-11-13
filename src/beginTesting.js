// @flow
import { chooseTestType, confirmStart } from './forms';
import { URL } from './lib/constants';
import parseOptions from './lib/parseOptions';
import parsePageTitle from './lib/parsePageTitle';
import parseQuestionCount from './lib/parseQuestionCount';

async function beginTesting(type) {
  let response = await request(chooseTestType(type));
  response = await request(confirmStart());
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

async function request(form) {
  return fetch(URL, {
    method: 'post',
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: form,
  });
}

export default beginTesting;
