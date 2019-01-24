<template>
  <v-app dark>
    <router-view/>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({}),
  computed: {
    showToolbar() {
      return this.$route.name !== 'quizrun';
    },
  },
};
</script>
