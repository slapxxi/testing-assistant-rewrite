// @flow
import {
  cocktail,
  cocktailPro,
  cocktailWaiter,
  cocktailWaiterPro,
  stavka,
  stavkaPlus,
  uzbech,
  vinka,
} from '../data';
import initStateFromDB from '../lib/initStateFromDB';

const initState = {
  ...initStateFromDB({
    Ставка: stavka,
    'Ставка+': stavkaPlus,
    'Винная Карта': vinka,
    'Коктейльная Карта с ШБ': cocktailPro,
    'Коктейльная Карта без ШБ': cocktail,
    'Коктейльная Карта с ШБ (Официант)': cocktailWaiterPro,
    'Коктейльная Карта без ШБ (Официант)': cocktailWaiter,
    'Узбекское Меню': uzbech,
  }),
  user: {
    cardNumber: '',
    login: 'Kal11',
    password: '12345',
    occupation: 'Официант',
  },
};

function rootReducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'SAVE_USER_DATA':
      return { ...state, user: payload };
    default:
      return state;
  }
}

export default rootReducer;
