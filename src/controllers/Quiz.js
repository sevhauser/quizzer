import Question from './Question';
import QuizMeta from './QuizMeta';

class Quiz {
  constructor(meta = {}) {
    this.meta = new QuizMeta();
    Object.assign(this, meta);
    this.loaded = false;
    this.questions = [];
  }

  generateAnswers() {
    const result = new Array(this.questions.length);
    for (let i = 0; i < this.questions.length; i++) {
      const question = this.questions[i].getCleanAnswer(i);
      result[i] = question;
    }
    for (let j = result.length-1; j >=0; j--) {
      let rand = Math.floor(Math.random()*(j+1));
      const item = result[rand];

      result[rand] = result[j];
      result[j] = item;
    }
    return result;
  }

  randomQuestionOrder() {
    const result = new Array(this.questions.length);
    for (let i = 0; i < this.questions.length; i++) {
      const question = this.questions[i].getCleanAnswer(i);
      result[i] = question;
    }
    for (let j = result.length-1; j >=0; j--) {
      let rand = Math.floor(Math.random()*(j+1));
      const item = result[rand];

      result[rand] = result[j];
      result[j] = item;
    }
    return result;
  }

  addQuestion(question) {
    question.id = `q-${Date.now()}`;
    this.questions.push(question);
    return question.id;
  }

  setQuestionData(data) {
    this.questions = [];
    data.forEach((q) => {
      this.questions.push(Question.fromValues(q));
    });
  }

  getQuestion(id) {
    const question = this.questions.find((el) => el.id === id);
    if (id === null) {
      throw "Question does not exist!";
    }
    return question;
  }

  deleteQuestion(id) {
    const index = this.questions.findIndex((el) => el.id === id);
    if (index >= 0) {
      this.questions.splice(index,1);
    }
    
  }

  getMeta() {
    return this.meta;
  }
  set id(value) {
    this.meta.id = value;
  }
  get id() {
    return this.meta.id;
  }
  set name(value) {
    this.meta.name = value;
  }
  get name() {
    return this.meta.name;
  }
  set description(value) {
    this.meta.description = value;
  }
  get description() {
    return this.meta.description;
  }
}

export default Quiz;