const URL = 'http://81.23.108.42/pers_test/';

const colors = {
  blue: '#3250F6',
  cyan: '#1280F6',
  red: 'tomato',
  green: 'yellowgreen',
  darkgrey: '#223',
  grey: '#778',
  lightgrey: '#E2E0E5',
  white: '#FEFEFF',
};

const testTypes = {
  Ставка: 1,
  'Ставка+': 2,
  'Винная Карта': 43,
  'Коктейльная Карта': 8,
  'Коктейльная Карта с ШБ': 8,
  'Коктейльная Карта без ШБ': 9,
  'Коктейльная Карта с ШБ (Официант)': 37,
  'Коктейльная Карта без ШБ (Официант)': 38,
  'Узбекское Меню': 12,
};

const occupations = {
  Администратор: 1,
  Официант: 6,
  'Старший Официант': 5,
  Бармен: 4,
};

export { URL, colors, testTypes, occupations };
