<template>
  <v-content>
    <v-toolbar app>
      <v-toolbar-title>QUIZZER</v-toolbar-title>
      <v-spacer></v-spacer>
      <QuizImporter
        :controller="controller"></QuizImporter>
    </v-toolbar>
    <v-container
      fluid
      grid-list-lg
      v-if="loaded">
        <v-flex>
          <v-card
            color="red"
            class="mb-2">
            <v-card-title>
              <v-icon color="white">warning</v-icon>
              <span class="ml-1 font-weight-bold">IMPORTANT: </span><span>This app is minimal and dirty. I do not guarantee anything.</span>
            </v-card-title>
          </v-card>
          <QuizListCard
            class="mb-2"
            v-for="quiz in controller.quizzes"
            :key="quiz.id"
            :quiz="quiz"
            @click="loadQuiz(quiz.id)"/>
        </v-flex>
    </v-container>
    <QuizCreate
      :controller="controller"/>
  </v-content>
</template>

<script>
import { quizControl } from '@/controllers';
import QuizListCard from '@/components/QuizListCard.vue';
import QuizCreate from '@/components/QuizCreate.vue';
import QuizImporter from '@/components/QuizImporter.vue';

export default {
  name: 'Home',
  data: () => ({
    loaded: false,
    controller: quizControl,
    showCreate: false,
  }),
  methods: {
    loadQuiz(id) {
      this.$router.push(`/quiz/${id}`);
    }
  },
  created() {
    this.controller.load().then(() => {
      this.loaded = true;
    });
  },
  components: {
    QuizListCard,
    QuizCreate,
    QuizImporter,
  },
}
</script>
