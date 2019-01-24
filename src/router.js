import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Quiz from './views/Quiz.vue'
import QuizView from './views/QuizView.vue'
import QuizRun from './views/QuizRun.vue'
import QuestionEdit from './views/QuestionEdit.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/quiz/:quizId',
      component: Quiz,
      props: true,
      children: [
        {
          path: '',
          name: 'quiz',
          component: QuizView,
          props: true,
        }, {
          path: 'question/:questionId',
          component: QuestionEdit,
          props: true,
        }, {
          path: 'run',
          name: 'quizrun',
          component: QuizRun,
          props: true,
        }
      ],
    },
  ],
});
