import normalizeString from '../lib/normalizeString';

function findOptions(state, questionText) {
  const text = normalizeString(questionText);
  if (text === '') {
    return [];
  }
  const options = [];
  const question = state.questions.find((q) => q.text === text);
  if (question === undefined) {
    return [];
  }
  question.options.forEach((id) => {
    options.push(state.options.filter((option) => id === option.id)[0]);
  });
  return options;
}

export { findOptions };
