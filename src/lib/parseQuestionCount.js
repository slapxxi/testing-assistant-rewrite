import cheerio from 'react-native-cheerio';

const questionCountSelector =
  'div[style="float: right; height: 100px; width: 200px; top: 20px; right: 20px;"]';

function parseQuestionCount(html) {
  const $ = cheerio.load(html);
  const questionCount = $(questionCountSelector);
  const match = questionCount
    .text()
    .toLowerCase()
    .trim()
    .match(/вопросов:\s*(\d+)/i);
  if (match) {
    return parseInt(match[1], 10);
  }
  return 0;
}

export default parseQuestionCount;
