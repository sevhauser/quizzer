import storage from './storage';

class QuizzesController {
  constructor(storageKey = 'quizzes') {
    this.key = storageKey;
    this.loaded = false;
    this.quizzes = [];
  }

  async load() {
    const items = await storage.getItem(this.key);
    this.quizzes = items === null ? [] : items;
    this.loaded = true;
  }

  async save() {
    if (!this.loaded) {
      throw "Storage has not been loaded!";
    }
    await storage.setItem(this.key, this.quizzes);
  }

  async create(name, description) {
    const id = Date.now();
    const quiz = {
      id,
      name,
      description,
    };
    if (!this.loaded) {
      await this.load();
    }
    this.quizzes.push(quiz);
    await this.save();
  }
}

export default QuizzesController;