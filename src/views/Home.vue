<template>
  <v-content>
    <v-container
      fluid
      grid-list-lg
      v-if="loaded">
      <v-layout row wrap>
        <v-flex>
          <QuizListCard
            v-for="quiz in controller.quizzes"
            :key="quiz.id"
            :title="quiz.title"
            :description="quiz.description"/>
        </v-flex>
      </v-layout>
    </v-container>
    <QuizEdit
      :controller="controller"/>
  </v-content>
</template>

<script>
import { QuizzesController } from '@/controllers';
import QuizListCard from '@/components/QuizListCard.vue';
import QuizEdit from '@/components/QuizEdit.vue';

export default {
  name: 'Home',
  data: () => ({
    loaded: false,
    controller: new QuizzesController(),
    showCreate: false,
  }),
  created() {
    this.controller.load().then(() => {
      this.loaded = true;
    });
  },
  components: {
    QuizListCard,
    QuizEdit,
  },
}
</script>
