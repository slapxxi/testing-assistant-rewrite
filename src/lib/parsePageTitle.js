import cheerio from 'react-native-cheerio';

const pageTitleSelector =
  'div[style="font-family: sans-serif; font-size: 24px;"] > p';

function parsePageTitle(html) {
  const $ = cheerio.load(html);
  const options = $(pageTitleSelector).text();
  return options;
}

export default parsePageTitle;
