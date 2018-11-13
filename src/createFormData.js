import FormData from 'form-data';

function createFormData(props) {
  const formData = new FormData();
  props.forEach((key, value) => formData.append(key, value));
  return {
    form: formData,
    headers: formData.getHeaders(),
  };
}

export default createFormData;
