import FormData from 'form-data';

function confirmStart() {
  const form = new FormData();
  form.append('action', 'show_first_question');
  form.append('submit', 'С информацией ознакомлен');
  return form;
}

export default confirmStart;
