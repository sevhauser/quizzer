<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'Quiz',
  props: {
    quizId: {
      type: String,
      required: true,
    },
  },
};
</script>
