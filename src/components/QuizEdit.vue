<template>
  <v-dialog 
    v-model="visible"
    max-width="600px">
    <v-btn
      slot="activator"
      fab
      bottom
      right
      fixed
      color="green"
      @click="show">
      <v-icon>add</v-icon>
    </v-btn>
    <form>
    </form>
  </v-dialog>
</template>

<script>
export default {
  name: 'QuizEdit',
  data: () => ({
    title: '',
    description: '',
    visible: false,
  }),
  props: {
    controller: Object,
    id: {
      type: String,
      default: '',
    },
    create: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    show() {
      this.reset();
      this.visible = true;
    },
    reset() {
      this.title = '';
      this.description = '';
    },
  },
};
</script>
