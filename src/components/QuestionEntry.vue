<template>
  <v-list-tile @click="$emit('click')">
    <v-list-tile-avatar>
      <v-icon>{{ iconType }}</v-icon>
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title>{{ question.question }}</v-list-tile-title>
      <v-list-tile-sub-title>{{ subtitle }}</v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
import { QuestionTypeNames } from '@/controllers';

export default {
  name: 'QuestionEntry',
  props: {
    question: {
      type: Object,
      required: true,
    },
  },
  computed: {
    iconType() {
      return 'help';
    },
    subtitle() {
      return QuestionTypeNames[this.question.type];
    }
  },
};
</script>
