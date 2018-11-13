import parseRemainingTime from './parseRemainingTime';

const source = `
  <div style="float: right; height: 100px; width: 200px; top: 20px; right: 20px;" id="mytimer">
    Осталось:
    <br>времени: 16:53
    <br>вопросов:  16
  </div>
`;

it('parses remaining time', () => {
  const count = parseRemainingTime(source);
  expect(count).toEqual('16:53');
});

it('returns empty string if source is empty', () => {
  const count = parseRemainingTime('');
  expect(count).toEqual('');
});
