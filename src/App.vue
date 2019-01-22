<template>
  <v-app dark>
    <v-toolbar app>
      <v-btn icon to="/">
        <v-icon>home</v-icon>
      </v-btn>
      <v-toolbar-title>QUIZZER</v-toolbar-title>
    </v-toolbar>
    <router-view/>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({}),
};
</script>
