import cheerio from 'react-native-cheerio';

const timerSelector =
  'div[style="float: right; height: 100px; width: 200px; top: 20px; right: 20px;"]';

function parseRemainingTime(html) {
  const $ = cheerio.load(html);
  const timer = $(timerSelector);
  const match = timer
    .text()
    .toLowerCase()
    .trim()
    .match(/времени:\s*(\d+[:{0, 1}]\d+)/i);
  if (match) {
    return match[1];
  }
  return '';
}

export default parseRemainingTime;
