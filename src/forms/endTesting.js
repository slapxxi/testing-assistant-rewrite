import FormData from 'form-data';

function endTesting() {
  const form = new FormData();
  form.append('action', 'leave');
  form.append('submit', 'В меню');
  return form;
}

export default endTesting;
