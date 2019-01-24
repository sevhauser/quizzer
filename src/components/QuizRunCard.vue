<template>
  <v-card
    v-if="loaded"
    :color="resultColors.cardColor"
    style="width: 100%;max-width: 500px;">
    <v-card-text>
      <v-layout
        align-center>
        <v-icon
          class="mr-2"
          :color="resultColors.color">
          {{ resultColors.icon }}
        </v-icon>
        <div>
          {{ question.question }}
        </div>
      </v-layout>
      <v-layout
        v-if="question.type === questionTypes.TEXT">
        <v-text-field
          label="Your Answer"
          :error="answer.checked && !answer.result"
          :success="answer.checked && answer.result"
          v-model="answer.answer"></v-text-field>
      </v-layout>
      <v-layout
        v-else-if="question.type === questionTypes.TRUEFALSE">
        <v-spacer></v-spacer>
        <v-btn
          flat
          :color="answer.correct ? 'green':''"
          @click="answer.correct = true">
          TRUE
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          flat
          :color="answer.correct ? '':'red'"
          @click="answer.correct = false">
          FALSE
        </v-btn>
        <v-spacer></v-spacer>
      </v-layout>
      <v-layout
        v-else
        column
        class="mt-2">
        <v-card v-for="(option, index) in answer.answers"
          :key="option.id"
          flat
          color="transparent"
          class="mb-2"
          @click="toggleCorrect(index)">
          <v-layout
            justify-center
            align-center>
            <v-btn
              icon
              small
              style="align-self:center;">
              <v-icon :color="option.correct ? 'green' : 'red'">
                <template v-if="option.correct">check_circle</template>
                <template v-else>cancel</template>
              </v-icon>
            </v-btn>
            <div style="flex-grow: 1;">
              {{ option.text }}
            </div>
          </v-layout>
        <v-divider></v-divider> 
        </v-card>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        flat
        @click="checkAnswer">CHECK</v-btn>
      <v-btn
        v-if="answer.checked"
        flat
        @click="next">NEXT</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { QuestionTypes } from '@/controllers';

export default {
  name: 'QuizRunCard',
  data: () => ({
    loaded: false,
    answer: null,
  }),
  computed: {
    questionTypes() {
      return QuestionTypes;
    },
    resultColors() {
      let result = {
        icon: 'help',
        color: '',
        cardColor: '',
      };
      if (this.answer.checked) {
        if (this.answer.result) {
          result.icon = 'check_circle';
          result.color = 'green';
          result.cardColor = '#425742';
        } else {
          result.icon = 'cancel';
          result.color = 'red';
          result.cardColor = '#504242';
        }
      }
      return result;
    },
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
    question: {
      type: Object,
      required: true,
    },
  },
  methods: {
    next() {
      this.$emit('next');
    },
    checkAnswer() {
      let result = false;
      if (this.answer.type === QuestionTypes.TEXT) {
        result = this.question.answer === this.answer.answer;
      } else if (this.answer.type === QuestionTypes.TRUEFALSE) {
        result = this.question.correct === this.answer.correct;
      } else if (this.answer.type === QuestionTypes.MULTI_RADIO) {
        const correctAnswer = this.question.answers.find((el) => el.correct);
        this.answer.answers.forEach((el) => {
          if (el.id === correctAnswer.id && el.correct && el.correct === correctAnswer.correct) {
            result = true;
          }
        });
      } else if (this.answer.type === QuestionTypes.MULTI_CHECKBOX) {
        result = true;
        for (let i = 0; i < this.answer.answers.length; i++) {
          const res = this.answer.answers[i].correct === this.question.answers[i].correct;
          if (!res) {
            result = false;
          }
          this.answer.answers[i].result = res;
        }
      }
      this.answer.result = result;
      this.answer.checked = true;
      this.$emit('input', this.answer);
    },
    toggleCorrect(index) {
      let result = !this.answer.answers[index].correct;
      if (this.question.type === QuestionTypes.MULTI_RADIO && result) {
        this.answer.answers.forEach((el) => el.correct = false);
      }
      this.answer.answers[index].correct = result;
    },
  },
  created() {
    this.answer = this.value;
    this.loaded = true;
  },
};
</script>

<style>

</style>
