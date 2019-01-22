<template>
  <v-card>
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{ title }}</h3>
        <span>{{ description }}</span>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: 'QuizListCard',
  props: {
    id: String,
    title: String,
    description: String,
  },
};
</script>
