import initStateFromDB from '../lib/initStateFromDB';
import { findOptions } from './selectors';

let state;

beforeEach(() => {
  state = initStateFromDB({ example: '' });
});

it('works', () => {});
