// @flow
import { findIndex, forEach, uniq } from 'lodash';
import Papa from 'papaparse';
import normalizeString from './normalizeString';

function initStateFromDB(config) {
  const result = {
    databases: {},
  };
  let id = 0;
  forEach(config, (i, key) => {
    const data = config[key].toLowerCase().trim();
    const { data: parsed } = Papa.parse(data);
    const state = createStateFromParsedData(parsed);
    result.databases = {
      ...result.databases,
      [key]: {
        id,
        name: key,
        questions: state.questions,
        options: state.options,
      },
    };
    id += 1;
  });
  return result;
}

function createStateFromParsedData(data) {
  const result = {
    questions: [],
    options: [],
  };
  data.map((item, index) => {
    const [question, ...options] = item;
    const text = normalizeString(question);
    const found = result.questions.find((q) => q.text === text);
    if (!found) {
      const optionIDs = [];
      options.forEach((option) => {
        const optionText = normalizeString(option);
        const id = result.options.length;
        const i = findIndex(result.options, (o) => o.text === optionText);
        if (i === -1) {
          result.options.push({ id, text: optionText });
          optionIDs.push(id);
        } else {
          optionIDs.push(i);
        }
      });
      result.questions.push({
        id: index,
        text,
        options: uniq(optionIDs),
      });
    } else {
      throw Error(`Duplicate row with key "${text}"`);
    }
  });
  return result;
}

export default initStateFromDB;
