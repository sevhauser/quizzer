<template>
  <v-content v-if="loaded">
    <v-card>
      <v-card-actions>
        <v-btn
          icon
          small
          @click="back">
          <v-icon>arrow_back</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          icon
          small
          @click="saveQuestion">
          <v-icon>save</v-icon>
        </v-btn>
        <v-btn
          icon
          small
          @click="deleteQuestion">
          <v-icon>delete</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-container>
      <v-textarea rows="1" auto-grow label="Question" v-model="question.question" required/>
      <template v-if="question.type === questionTypes.TEXT">
        <v-text-field
          label="Answer"
          v-model="question.answer"></v-text-field>
      </template>
      <template v-else-if="question.type === questionTypes.TRUEFALSE">
        <v-layout>
          <v-spacer></v-spacer>
          <v-btn
            flat
            :color="question.correct ? 'green' : ''"
            @click="question.correct = true">
            TRUE
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            flat
            :color="!question.correct ? 'red' : ''"
            @click="question.correct = false">
            FALSE
          </v-btn>
          <v-spacer></v-spacer>
        </v-layout>
      </template>
      <template v-else>
        <v-card v-for="(answer, index) in question.answers"
          :key="index"
          flat
          class="mb-2">
            <v-layout
              justify-center
              align-center>
              <v-btn
                icon
                small
                style="align-self:center;"
                @click="toggleCorrect(index)">
                <v-icon :color="answer.correct ? 'green' : 'red'">
                  <template v-if="answer.correct">check_circle</template>
                  <template v-else>cancel</template>
                </v-icon>
              </v-btn>
              <div style="flex-grow: 1;">
                {{ answer.text }}
              </div>
              <v-btn
                icon
                small
                @click="removeAnswer(index)">
                <v-icon>remove_circle</v-icon>
              </v-btn>
            </v-layout>
        </v-card>
        <v-layout>
          <v-btn
            icon
            small
            style="align-self:center;"
            @click="newAnswer.correct = !newAnswer.correct">
            <v-icon :color="newAnswer.correct ? 'green' : 'red'">
              <template v-if="newAnswer.correct">check_circle</template>
              <template v-else>cancel</template>
            </v-icon>
          </v-btn>
          <v-text-field
            label="New Answer"
            @keyup.enter="addAnswer"
            @keyup.ctrl.enter="saveQuestion"
            ref="inputadd"
            v-model="newAnswer.text"></v-text-field>
          <v-btn
            icon
            small
            @click="addAnswer"
            :disabled="!canAdd"
            style="align-self: center;">
            <v-icon>add_circle</v-icon>
          </v-btn>
        </v-layout>
      </template>
    </v-container>
  </v-content>
</template>

<script>
import { quizControl, QuestionTypes } from '@/controllers';

export default {
  name: 'QuestionEdit',
  data: () => ({
    loaded: false,
    quiz: null,
    question: null,
    newAnswer: {
      text: '',
      correct: false,
    },
  }),
  computed: {
    questionTypes() {
      return QuestionTypes;
    },
    canAdd() {
      return this.newAnswer.text.length > 0;
    },
  },
  props: {
    quizId: {
      type: String,
      required: true,
    },
    questionId: {
      type: String,
      required: true,
    },
  },
  methods: {
    async init() {
      this.quiz = await quizControl.getQuiz(this.quizId);
      this.question = this.quiz.getQuestion(this.questionId);
    },
    afterLoaded() {
      if (this.$route.query.focus && this.$route.query.focus == 1) {
        setTimeout(() => {
          this.focusAdd();
        },200);
      }
    },
    back() {
      this.$router.replace(`/quiz/${this.quizId}`);
    },
    addAnswer() {
      if (this.canAdd) {
        this.question.addAnswer(this.newAnswer.text, this.newAnswer.correct);
        this.newAnswer.text = '';
        this.newAnswer.correct = false;
        this.focusAdd();
      }
    },
    removeAnswer(index) {
      this.question.removeAnswer(index);
    },
    focusAdd() {
      this.$refs.inputadd.focus();
    },
    toggleCorrect(index) {
      this.question.toggleAnswerCorrect(index);
    },
    deleteQuestion() {
      if (window.confirm('Do you want to delete this question?')) {
        this.quiz.deleteQuestion(this.questionId);
        quizControl.saveQuiz(this.quiz).then(() => {
          this.back();
        });
      }
    },
    saveQuestion() {
      quizControl.saveQuiz(this.quiz).then(() => {
        this.back();
      });
    },
  },
  created() {
    this.init().then(() => {
      this.loaded = true;
      this.afterLoaded();
    });
  },
};
</script>
