// @flow
import type { TestType, TestMode } from '../lib/types';

export type TestingResults = {
  testType: TestType,
  answers: Array<QuestionStats>,
  rating: number,
};

export type QuestionStats = {
  question: string,
  correct: Array<string>,
  incorrect: Array<string>,
  missed: Array<string>,
  remaining: Array<string>,
  rating: number,
};

export type Payload = {
  mode?: TestMode,
  login?: string,
  password?: string,
  occupation?: string,
  cardNumber?: string,
};
