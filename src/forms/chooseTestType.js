// @flow
import FormData from 'form-data';
import { testTypes } from '../lib/constants';

function chooseTestType(testType = 'Ставка') {
  const form = new FormData();
  const testTypeID = testTypes[testType];
  form.append('id_test', testTypeID);
  form.append('action', 'show_info');
  form.append('submit', 'Далее');
  return form;
}

export default chooseTestType;
