// @flow
import initStateFromDB from './initStateFromDB';

describe('given empty data', () => {
  it('produces empty state', () => {
    const state = initStateFromDB({ example: '' });
    expect(state.databases).toEqual({
      example: {
        id: 0,
        name: 'example',
        options: [],
        questions: [],
      },
    });
  });
});

describe('given several dbs', () => {
  const firstDB = 'Orange Juice, orange, glass';
  const secondDB = 'Orange Juice, baseorange, glass';

  it('generates distinct entries', () => {
    const state = initStateFromDB({
      first: firstDB,
      second: secondDB,
    });
    const { first, second } = state.databases;
    expect(first !== second).toBeTruthy();
    expect(first.options !== second.options).toBeTruthy();
    expect(first.questions !== second.questions).toBeTruthy();
  });
});

describe('given database with several entries', () => {
  const db = `
    Orange Juice, Orange, Glass, ice
    Apple Juice, Apple, glass, ice
  `;

  it('saves and normalizes questions', () => {
    const state = initStateFromDB({ example: db });
    const { questions } = state.databases.example;
    expect(questions[0].text).toEqual('orange juice');
    expect(questions[1].text).toEqual('apple juice');
  });

  it('saves and normalizes options', () => {
    const state = initStateFromDB({ example: db });
    const { options } = state.databases.example;
    expect(options[0].text).toEqual('orange');
    expect(options[1].text).toEqual('glass');
    expect(options[2].text).toEqual('ice');
  });

  it('stores questions options as unique ids', () => {
    const state = initStateFromDB({ example: db });
    const { questions } = state.databases.example;
    expect(questions[0].options).toEqual([0, 1, 2]);
    expect(questions[1].options).toEqual([3, 1, 2]);
  });

  it('saves options ids', () => {
    const state = initStateFromDB({ example: db });
    const { options } = state.databases.example;
    expect(toIDs(options)).toEqual([0, 1, 2, 3]);
  });

  it('generates unique IDs for options', () => {
    const state = initStateFromDB({ example: db });
    const { options } = state.databases.example;
    expect(options).toHaveLength(4);
    expect(options).toEqual([
      { id: 0, text: 'orange' },
      { id: 1, text: 'glass' },
      { id: 2, text: 'ice' },
      { id: 3, text: 'apple' },
    ]);
  });
});

describe('given duplicate keys', () => {
  const db = `
    Apple Juice, apple, juice
    Apple Juice, apple, juice
  `;

  it('throws error', () => {
    expect(() => initStateFromDB({ example: db })).toThrow();
  });
});

function toIDs(collection) {
  return collection.map((item) => item.id);
}
