<template>
  <v-content v-if="loaded">
    <v-card
      class="quiz-top">
      <v-card-actions>
        <h2 class="v-toolbar__title">{{ quiz.name }}</h2>
        <v-spacer></v-spacer>
        <v-btn
          icon
          @click="close">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-container
      justify-center
      fill-height>
      <v-layout style="width: 100%;height: auto;"
        justify-center>
        <template
          v-for="(answer, index) in answers">
          <QuizRunCard
            :key="index"
            v-if="index === current"
            v-model="answers[index]"
            :question="questions[answer.index]"
            @next="questionNext()"
            ></QuizRunCard>
        </template>
        <v-card
          style="width: 100%;max-width: 500px;"
          v-if="current === questionCount">
          <v-card-title>FINISHED</v-card-title>
          <v-card-text>
            {{ correctCount }} / {{ questionCount }} correct.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click="back">End</v-btn>
          </v-card-actions>
        </v-card>
      </v-layout>
    </v-container>
    <v-card class="quiz-control">
      <v-card-actions>
        <v-btn
          icon
          @click="questionBack"
          :disabled="current <= 0">
          <v-icon>arrow_left</v-icon>
        </v-btn>
        <div
          style="flex-grow:1; text-align: center">
          <template v-if="current < questionCount">
            {{ current + 1}} / {{ questionCount }}
          </template>
          <template v-else>FINISHED</template>
        </div>
        <v-btn
          icon
          @click="questionNext"
          :disabled="current >= questionCount">
          <v-icon>arrow_right</v-icon>
        </v-btn>
      </v-card-actions>
      <v-progress-linear
        color="green"
        class="mb-0 mt-0"
        v-model="progress"></v-progress-linear>
    </v-card>
  </v-content>
</template>

<script>
import { quizControl } from '@/controllers';
import QuizRunCard from '@/components/QuizRunCard.vue';

export default {
  name: 'QuizRun',
  data: () => ({
    loaded: false,
    quiz: null,
    answers: [],
    current: 0,
  }),
  props: {
    quizId: {
      type: String,
      required: true,
    },
  },
  computed: {
    progress() {
      return ((this.current) / this.questionCount) * 100;
    },
    questionCount() {
      return this.questions.length;
    },
    correctCount() {
      return this.answers.reduce((acc, current) => {
        return acc + (current.result === true ? 1 : 0);
      }, 0);
    },
  },
  methods: {
    async init() {
      this.quiz = await quizControl.getQuiz(this.quizId);
      this.answers = this.quiz.generateAnswers();
      this.questions = this.quiz.questions;
    },
    back() {
      this.$router.replace(`/quiz/${this.quizId}`);
    },
    close() {
      if (window.confirm('Do you want to cancel this quiz?')) {
        this.back();
      }
    },
    questionNext() {
      if (this.current <= this.questionCount) {
        this.current++;
      }
    },
    questionBack() {
      if (this.current > 0) {
        this.current--;
      }
    },
  },
  created(){
    this.init().then(() => {
      this.loaded = true;
    });
  },
  components: {
    QuizRunCard,
  },
};
</script>

<style>
  .quiz-top {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
  .quiz-control {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
</style>

