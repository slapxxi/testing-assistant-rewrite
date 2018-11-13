// @flow
import FormData from 'form-data';

type ID = string;
type Answers = Array<ID>;

function showNextQuestion(selectedAnswers: Answers) {
  const form = new FormData();
  selectedAnswers.forEach((answer) => form.append(answer, 'on'));
  form.append('action', 'show_next_question');
  form.append('submit', 'Далее');
  return form;
}

export default showNextQuestion;
