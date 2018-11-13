import toCSV from './toCSV';

const results = {
  answers: [
    {
      question: 'pie',
      correct: ['apple'],
      incorrect: ['wut'],
      remaining: [],
      missed: ['dough'],
    },
    {
      question: 'dish',
      correct: ['plate'],
      incorrect: ['wut'],
      remaining: [],
      missed: ['meal, tasty one'],
    },
  ],
};

it('converts missing options to CSV', () => {
  const csv = toCSV(results);
  expect(csv).toEqual(
    'pie, apple, dough\ndish, plate, meal| tasty one',
  );
});
