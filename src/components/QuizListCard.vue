<template>
  <v-flex xs12>
    <v-card @click="$emit('click')">
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">{{ quiz.name }}</h3>
          <span>{{ quiz.description }}</span>
        </div>
      </v-card-title>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: 'QuizListCard',
  props: {
    quiz: {
      type: Object,
      required: true,
    },
  },
};
</script>
