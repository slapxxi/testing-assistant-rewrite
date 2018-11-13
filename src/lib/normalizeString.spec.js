import normalizeString from './normalizeString';

it('converts to lower case', () => {
  const result = normalizeString('SomeThing');
  expect(result).toEqual('something');
});

it('removes surrounding whitespace', () => {
  const result = normalizeString('  something   ');
  expect(result).toEqual('something');
});

it('removes duplicate whitespace', () => {
  const result = normalizeString('  something  with   double  spaces');
  expect(result).toEqual('something with double spaces');
});

it('removes whitespace around dashes', () => {
  const result = normalizeString('something- with dash');
  expect(result).toEqual('something-with dash');
});

it('replaces | with commas', () => {
  const result = normalizeString('juicy| apple');
  expect(result).toEqual('juicy, apple');
});
