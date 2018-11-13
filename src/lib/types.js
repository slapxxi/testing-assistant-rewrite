// @flow
export type ID = string;

export type Text = string;

export type Question = {
  id: ID,
  text: Text,
  options: Array<ID>,
};

export type Questions = Array<Question>;

export type Option = {
  +id: ID,
  +text: Text,
};

export type Options = Array<Option>;

export type TestType =
  | 'Ставка'
  | 'Ставка+'
  | 'Винная карта'
  | 'Узбекское Меню'
  | 'Коктейльная Карта';

export type TestMode = 'training' | 'real';

export type Database = {
  id: string,
  name: TestType,
  questions: Question,
  options: Options,
};

export type AppState = {
  databases: { [string]: Database },
};

export type UserData = {
  login: string,
  password: string,
  cardNumber: string,
  occupation: string,
};
