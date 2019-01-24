<template>
  <v-dialog
    :value="visible"
    max-width="600px"
    persistent>
    <v-card>
      <v-card-title>
        <span class="headline">Edit Quiz</span>
      </v-card-title>
      <v-card-text>
        <form>
          <v-text-field
            v-model="input.name"
            label="Quiz Title"
            required></v-text-field>
          <v-textarea
            v-model="input.description"
            label="Description"
            rows="1"
            auto-grow></v-textarea>
        </form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat @click="close">Cancel</v-btn>
        <v-btn flat @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'QuizCreate',
  data: () => ({
    input: {
      name: '',
      description: '',
    },
  }),
  props: {
    name: String,
    description: String,
    visible: Boolean,
  },
  watch: {
    name(newVal) {
      this.input.name = newVal;
    },
    description(newVal) {
      this.input.description = newVal;
    },
    visible(newVal) {
      if (newVal) {
        this.input.name = this.name;
        this.input.description = this.description;
      }
    },
  },
  methods: {
    save() {
      this.$emit('save', this.input);
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>
