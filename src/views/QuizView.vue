<template>
  <v-content v-if="loaded">
    <v-card class="quiz-top">
      <v-card-actions>
        <v-btn
          icon
          to="/">
          <v-icon>arrow_back</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          icon
          @click="editQuiz">
          <v-icon>edit</v-icon>
        </v-btn>
        <QuizExporter
          :quizId="quizId"
          :controller="controller"></QuizExporter>
        <v-btn
          icon
          @click="deleteQuiz">
          <v-icon>delete</v-icon>
        </v-btn>
      </v-card-actions>
      <v-card-title>
        <div>
          <h2 class="headline">{{ quiz.name }}</h2>
          <span>{{ quiz.description }}</span>
        </div>
      </v-card-title>
      <v-btn
        absolute
        fab
        small
        bottom
        right
        @click="runQuiz">
        <v-icon>play_arrow</v-icon>
      </v-btn>
    </v-card>
    <div class="quiz-content">
      <v-container>
        <v-layout>
          <v-btn
            icon
            small
            @click="toggleSort"
            style="margin-left: 0">
            <v-icon>sort</v-icon>
          </v-btn>
          <h3 class="subheading" style="align-self:center;">Questions</h3>
        </v-layout>
      </v-container>
      <v-list two-line>
        <template
          v-for="(question, index) in questionList">
          <QuestionEntry
            :key="question.id"
            :question="question"
            @click="loadQuestion(question.id)"/>
          <v-divider
            v-if="index + 1 < questionList.length"
            :key="index"></v-divider>
        </template>
        <v-list-tile v-if="questionList.length === 0">
          <v-list-tile-content>
            <v-list-tile-title>No questions found.</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </div>
    <v-btn
      fab
      bottom
      right
      fixed
      color="green"
      @click="addQuestion">
      <v-icon>add</v-icon>
    </v-btn>
    <QuestionCreate
      :quiz="quiz"
      :visible="showAdd"
      @close="showAdd = false"
      @created="handleNewQuestion"/>
    <QuizEdit
      :name="quiz.name"
      :description="quiz.description"
      :visible="showEdit"
      @close="showEdit = false"
      @save="saveMeta"/>
  </v-content>
</template>

<script>
import { quizControl } from '@/controllers';
import QuizEdit from '@/components/QuizEdit.vue';
import QuestionEntry from '@/components/QuestionEntry.vue';
import QuestionCreate from '@/components/QuestionCreate.vue';
import QuizExporter from '@/components/QuizExporter.vue';

export default {
  name: 'QuizView',
  data: () => ({
    loaded: false,
    quiz: null,
    showEdit: false,
    showAdd: false,
    sort: 'added',
    controller: quizControl,
  }),
  props: {
    quizId: {
      type: String,
      required: true,
    },
  },
  computed: {
    questionList() {
      const questions = this.quiz.questions;
      return questions.sort((a, b) => {
        if (this.sort === 'added') {
          if (a.id > b.id) return 1;
          if (a.id < b.id) return -1;
          return 0;
        } else if (this.sort === 'newest') {
          if (a.id > b.id) return -1;
          if (a.id < b.id) return 1;
          return 0;
        }
      });
    },
  },
  methods: {
    async init() {
      const quiz = await quizControl.getQuiz(this.quizId);
      this.quiz = quiz;
    },
    runQuiz() {
      this.$router.push(`/quiz/${this.quizId}/run`);
    },
    toggleSort() {
      let result = '';
      switch(this.sort) {
        case 'added':
          result = 'newest';
          break;
        case 'newest':
        default:
          result = 'added';
      }
      this.sort = result;
    },
    addQuestion() {
      this.showAdd = true;
    },
    handleNewQuestion(val) {
      quizControl.saveQuiz(this.quiz);
      this.showAdd = false;
      this.loadQuestion(val, true);
    },
    loadQuestion(id, focus = false) {
      let query = focus ? '?focus=1' : '';
      this.$router.push(`/quiz/${this.quizId}/question/${id}${query}`);
    },
    deleteQuiz() {
      if(confirm('Do you want to delete this quiz?')) {
        quizControl.deleteQuiz(this.quizId).then(() => {
          this.$router.replace('/');
        });
      }
    },
    editQuiz() {
      this.showEdit = true;
    },
    exportQuiz() {
    },
    saveMeta(input) {
      this.quiz.name = input.name;
      this.quiz.description = input.description;
      this.showEdit = false;
      quizControl.save();
    },
  },
  created() {
    this.init().then(() => {
      this.loaded = true;
    });
  },
  components: {
    QuizEdit,
    QuestionEntry,
    QuestionCreate,
    QuizExporter
  },
};
</script>

<style scoped>
  .quiz-top {
    position: sticky;
    top: 0;
    z-index: 1;
  }
</style>
