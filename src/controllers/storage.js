import localforage from 'localforage';

const store = localforage.createInstance({
  name: 'quizzer',
  storeName: 'quiz',
});

export default store;
