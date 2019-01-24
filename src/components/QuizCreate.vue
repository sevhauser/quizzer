<template>
  <v-dialog 
    v-model="visible"
    max-width="600px"
    persistent>
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
    <v-card>
      <v-card-title>
        <span class="headline">Create Quiz</span>
      </v-card-title>
      <v-card-text>
        <form>
          <v-text-field
            v-model="title"
            label="Quiz Title"
            required></v-text-field>
          <v-textarea
            v-model="description"
            label="Description"
            rows="1"
            auto-grow></v-textarea>
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
export default {
  name: 'QuizCreate',
  data: () => ({
    title: '',
    description: '',
    visible: false,
  }),
  props: {
    controller: Object,
  },
  computed: {
    canSave() {
      return this.title.length > 0;
    },
  },
  methods: {
    show() {
      this.reset();
      this.visible = true;
    },
    save() {
      this.controller.createQuiz(this.title, this.description).then(() => {
        this.close();
      });
    },
    close() {
      this.visible = false;
    },
    reset() {
      this.title = '';
      this.description = '';
    },
  },
};
</script>
