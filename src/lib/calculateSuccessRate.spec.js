import calculateSuccessRate from './calculateSuccessRate';

describe('when some correct answers checked', () => {
  const results = {
    correct: new Array(8),
    incorrect: new Array(1),
    notchosen: [],
    remaining: new Array(3),
  };

  it('calculates rating correctly', () => {
    const rating = calculateSuccessRate(
      results.correct,
      results.notchosen,
      results.incorrect,
      results.remaining,
    );
    expect(rating).toEqual(89);
  });
});

describe('when only correct answers checked', () => {
  const results = {
    correct: new Array(5),
    incorrect: [],
    notchosen: [],
    remaining: [],
  };

  it('calculates rating correctly', () => {
    const rating = calculateSuccessRate(
      results.correct,
      results.notchosen,
      results.incorrect,
      results.remaining,
    );
    expect(rating).toEqual(100);
  });
});

describe('when all answers checked', () => {
  const results = {
    correct: new Array(5),
    incorrect: new Array(4),
    notchosen: [],
    remaining: [],
  };

  it('calculates rating correctly', () => {
    const rating = calculateSuccessRate(
      results.correct,
      results.incorrect,
      results.notchosen,
      results.remaining,
    );
    expect(rating).toEqual(56);
  });
});

describe('when no answers checked', () => {
  const results = {
    correct: [],
    incorrect: [],
    notchosen: new Array(5),
    remaining: new Array(4),
  };

  it('calculates rating correctly', () => {
    const rating = calculateSuccessRate(
      results.correct,
      results.notchosen,
      results.incorrect,
      results.remaining,
    );
    expect(rating).toEqual(0);
  });
});
