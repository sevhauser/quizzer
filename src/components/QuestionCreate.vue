<template>
  <v-dialog
    :value="visible"
    max-width="600px"
    persistent>
    <v-card>
      <v-card-title>
        <span class="headline">Add Question</span>
      </v-card-title>
      <v-card-text>
        <form v-on:submit.prevent="save">
          <v-textarea rows="1" auto-grow label="Question" v-model="question" required ref="textarea"/>
          <v-radio-group v-model="type">
            <v-radio
              v-for="type in types"
              :key="type"
              :label="typeNames[type]"
              :value="type"
              ></v-radio>
          </v-radio-group>
        </form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat @click="close">Cancel</v-btn>
        <v-btn flat @click="save" :disabled="!canSave">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { Question, QuestionTypes, QuestionTypeNames } from '@/controllers';

export default {
  name: 'QuestionCreate',
  data: () => ({
    question: '',
    type: QuestionTypes.MULTI_CHECKBOX,
    types: QuestionTypes,
    typeNames: QuestionTypeNames,
  }),
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    quiz: {
      type: Object,
      required: true,
    }
  },
  computed: {
    canSave() {
      return this.question.length > 0;
    },
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.reset();
      }
    }
  },
  methods: {
    save() {
      if (!this.canSave) return;
      const question = new Question();
      question.question = this.question;
      question.type = this.type;
      this.$emit('created', this.quiz.addQuestion(question));
    },
    close() {
      this.$emit('close');
    },
    reset() {
      this.question = '';
      this.type = QuestionTypes.MULTI_CHECKBOX;
    },
  },
  mounted() {
    setTimeout(() => {
      this.$refs.textarea.focus();
    }, 200);
  },
};
</script>
