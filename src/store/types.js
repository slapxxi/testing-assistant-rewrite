import type { UserData, Database } from '../lib/types';

export type AppState = {
  databases: { [string]: Database },
  user: UserData,
};

export type Action = { type: 'SAVE_USER_DATA' };
