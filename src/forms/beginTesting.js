import FormData from 'form-data';

function beginTesting() {
  const form = new FormData();
  form.append('action', 'start');
  form.append('submit', 'Тренировка');
  return form;
}

export default beginTesting;
