import { QuestionTypes } from './QuestionTypes';

class Question {
  constructor() {
    this.id = '';
    this.type = '';
    this.question = '';
    this.answer = '';
    this.correct = false;
    this.answerCaseSensitive = false;
    this.answers = [];
  }

  values() {
    return JSON.parse(JSON.stringify({
      id: this.id,
      type: this.type,
      question: this.question,
      answer: this.answer,
      correct: this.correct,
      answerCaseSensitive: this.answerCaseSensitive,
      answers: this.answers,
    }));
  }

  getCleanAnswer(index) {
    const result = Object.assign({ index: index }, this.answerValues());
    return result;
  }

  answerValues() {
    const result = this.values();
    result.answer = '';
    result.correct = null;
    result.result = false;
    result.checked = false;
    result.answers.forEach((el) => {
      el.correct = false;
      el.result = null;
    });
    return result;
  }

  addAnswer(value, correct) {
    if (correct && this.type === QuestionTypes.MULTI_RADIO) {
      this.answers.forEach((el) => {
        el.correct = false;
      });
    }
    this.answers.push({
      id: `${this.id}-a${Date.now()}`,
      text: value,
      correct
    });
  }

  removeAnswer(index) {
    if (index < this.answers.length) {
      this.answers.splice(index, 1);
    }
  }

  toggleAnswerCorrect(index) {
    const newVal = !this.answers[index].correct;
    this.answers[index].correct = newVal;
    if (this.type === QuestionTypes.MULTI_RADIO && newVal) {
      this.answers.forEach((el, i) => {
        if (i === index) return;
        el.correct = !newVal;
      });
    }
  }

  static fromValues(values) {
    return Object.assign(new this(), values);
  }
}

export default Question;
