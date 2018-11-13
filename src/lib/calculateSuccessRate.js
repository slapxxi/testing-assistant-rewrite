// @flow
type Answers = Array<any>;

type Rating = number;

function calculateSuccessRate(
  { length: correctCount }: Answers,
  { length: missedCount }: Answers,
  { length: incorrectCount }: Answers,
): Rating {
  const expected = correctCount + missedCount;
  if (correctCount === 0) {
    return 0;
  }
  if (correctCount / expected === 1) {
    return Math.ceil(
      (1 - incorrectCount / (expected + incorrectCount)) * 100,
    );
  }
  return Math.ceil(correctCount / expected * 100);
}

export default calculateSuccessRate;
