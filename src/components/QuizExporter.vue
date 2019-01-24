<template>
  <v-dialog 
    v-model="visible"
    max-width="600px"
    persistent>
    <v-btn
      slot="activator"
      icon
      @click="show">
      <v-icon>cloud_upload</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">Export Quiz</span>
      </v-card-title>
      <v-card-text>
        <v-layout
          justify-center
          style="min-height: 36px">
          <v-btn
            color="green"
            class="ma-0"
            v-if="state === 'init'"
            @click="generate">EXPORT</v-btn>
          <v-progress-circular
            v-else-if="state === 'generating'"
            indeterminate></v-progress-circular>
          <v-btn
            color="green"
            :href="downloadLink"
            :download="fileName"
            v-if="state === 'ready'">
            DOWNLOAD
          </v-btn>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat @click="close">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'QuizExporter',
  data: () => ({
    visible: false,
    state: 'init',
    data: '',
    fileName: '',
  }),
  props: {
    controller: {
      type: Object,
      required: true
    },
    quizId: {
      type: String,
      required: true,
    },
  },
  computed: {
    downloadLink() {
      return `data:application/json;charset=utf-8,${this.data}`;
    },
  },
  methods: {
    show() {
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
    generate() {
      this.state = 'generating';
      this.controller.exportQuiz(this.quizId).then((result) => {
        this.data = result.data;
        this.fileName = result.name;
        this.ready();
      });
    },
    ready() {
      this.state = 'ready';
    },
    reset() {
      this.state = 'init';
    }
  },
};
</script>

