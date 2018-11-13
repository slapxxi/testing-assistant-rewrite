import parseQuestionCount from './parseQuestionCount';

const source = `
  <div style="float: right; height: 100px; width: 200px; top: 20px; right: 20px;" id="mytimer">
    Осталось:
    <br>времени: 18:53
    <br>вопросов:  16
  </div>
`;

it('parses question count', () => {
  const count = parseQuestionCount(source);
  expect(count).toEqual(16);
});

it('returns 0 if source is empty', () => {
  const count = parseQuestionCount('');
  expect(count).toEqual(0);
});
