import localforage from 'localforage';
import QuizMeta from './QuizMeta';
import Quiz from './Quiz';

const storage = localforage.createInstance({
  name: 'quizzer',
  storeName: 'quiz',
});

class QuizController {
  constructor(storageKey = 'quizzes') {
    this.key = storageKey;
    this.loaded = false;
    this.quizzes = [];
  }

  async load() {
    if (this.loaded) return;
    let items = await storage.getItem(this.key);
    if (items === null) {
      items = [];
    }
    items.forEach((el) => {
      const quiz = new Quiz(el);
      this.quizzes.push(quiz);
    });
    this.loaded = true;
  }

  async save() {
    const data = [];
    this.quizzes.forEach((el) => {
      data.push(el.getMeta());
    });
    await storage.setItem(this.key, data);
  }

  async getQuiz(id) {
    if (!this.loaded) {
      await this.load();
    }
    const result = this.quizzes.find((el) => el.id === id);
    if (result === null) {
      throw "Quiz does not exist!";
    }
    const questions = await this.getQuizQuestionData(id);
    result.setQuestionData(questions);
    return result;
  }

  async saveQuiz(quiz) {
    const questions = [];
    quiz.questions.forEach((q) => {
      questions.push(q.values());
    });
    await this.saveQuizQuestionData(quiz.id, questions);
  }

  async saveQuizQuestionData(id, questions) {
    await storage.setItem(`${id}-questions`, questions);
  }

  async getQuizQuestionData(id) {
    const questions = await storage.getItem(`${id}-questions`);
    return questions === null ? [] : questions;
  }

  async createQuiz(name, description) {
    const id = `quiz-${Date.now()}`;
    const meta = new QuizMeta();
    meta.id = id;
    meta.name = name;
    meta.description = description;
    const quiz = new Quiz(meta);
    if (!this.loaded) {
      await this.load();
    }
    this.quizzes.push(quiz);
    await this.save();
    return id;
  }

  async deleteQuiz(id) {
    if (!this.loaded) {
      await this.load();
    }
    const index = this.quizzes.findIndex((el) => el.id === id);
    if (index >= 0) {
      this.quizzes.splice(index, 1);
    }
    await storage.removeItem(`${id}-questions`);
    await storage.removeItem(id);
    await this.save();
  }

  async exportQuiz(id) {
    const quiz = await this.getQuiz(id);
    const result = {
      appVersion: process.env.VUE_APP_VERSION,
      schemaVersion: process.env.VUE_APP_SCHEMA,
      ['name']: quiz.name,
      quiz,
    };
    const filename = `${quiz.name.replace(/([^A-Za-z0-9])+/g, '_')}.json`;
    return {
      data: JSON.stringify(result),
      name: filename,
    };
  }

  async importQuiz(data) {
    if (data.schemaVersion === process.env.VUE_APP_SCHEMA) {
      const quizId = await this.createQuiz(data.quiz.meta.name, data.quiz.meta.description);
      const quiz = await this.getQuiz(quizId);
      quiz.setQuestionData(data.quiz.questions);
      await this.saveQuiz(quiz);
      return quizId;
    }
    return 0;
  }
}

export default QuizController;