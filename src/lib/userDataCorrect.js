function userDataCorrect(html) {
  return html.search(/указаны неверные сведения/gi) === -1;
}

export default userDataCorrect;
