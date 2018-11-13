import { uniqBy } from 'lodash';
import cheerio from 'react-native-cheerio';
import normalizeString from './normalizeString';

const optionContainerSelector = 'div[style="padding: 5px; display: table-row;"]';
const optionTextSelector = 'div[style="display: table-cell; text-align: left;"]';
const optionIDSelector = 'div[style="display: table-cell; padding: 3px;"] > input';

function parseOptions(html) {
  const parsedOptions = [];
  const $ = cheerio.load(html);
  const options = $(optionContainerSelector);
  options.each((i, option) => {
    const $option = $(option);
    const optionID = $option.find(optionIDSelector).attr('name');
    const optionText = $option.find(optionTextSelector).text();
    parsedOptions.push({
      id: optionID,
      text: normalizeString(optionText),
    });
  });
  return uniqBy(parsedOptions, (o) => o.text);
}

export default parseOptions;
