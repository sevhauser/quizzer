import Question from './Question';
import { QuestionTypes, QuestionTypeNames } from './QuestionTypes';
import Quiz from './Quiz';
import QuizController from './QuizController';

const quizControl = new QuizController();

export {
  Question,
  QuestionTypes,
  QuestionTypeNames,
  Quiz,
  quizControl,
};
