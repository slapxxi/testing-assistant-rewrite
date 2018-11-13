// @flow
import FormData from 'form-data';
import { occupations } from '../lib/constants';

function beginRealTesting({ login, password, occupation, cardNumber }) {
  const form = new FormData();
  form.append('reviewer', login);
  form.append('id_dol', occupations[occupation]);
  form.append('card', cardNumber);
  form.append('pass', password);
  form.append('action', 'start');
  form.append('mode', 'exam');
  form.append('submit', 'Экзамен');
  return form;
}

export default beginRealTesting;
