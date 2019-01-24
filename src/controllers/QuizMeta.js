class QuizMeta {
  constructor() {
    this.id = '';
    this.name = '';
    this.description = '';
  }

  static fromData(values) {
    return Object.assign(new self(), values);
  }
}

export default QuizMeta;
