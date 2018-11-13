function matchAvailableToCorrect(allOptions, correctOptions) {
  return allOptions.filter((option) => {
    const found = correctOptions.find(
      (correctOption) => correctOption.text === option.text,
    );
    if (found) {
      return true;
    }
    return false;
  });
}

export default matchAvailableToCorrect;
