<template>
  <v-dialog 
    v-model="visible"
    max-width="600px">
    <v-btn
      slot="activator"
      icon
      @click="show">
      <v-icon>cloud_download</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">Import Quiz</span>
      </v-card-title>
      <v-card-text>
        <v-layout
          justify-center
          style="min-height: 36px">
          <input type="file" accept="application/json"
            v-if="state === 'init'"
            ref="fileinput"
            @change="fileChange($event.target.files)">
          <v-layout
            column
            align-center
            v-else-if="state === 'importready'">
            <span class="grey--text caption">NAME</span>
            <span>{{ this.data.quiz.meta.name }}</span>
            <span class="grey--text caption">DESCRIPTION</span>
            <span>{{ this.data.quiz.meta.description }}</span>
            <v-btn
              color="green"
              class="mt-2"
              @click="importQuiz">
              IMPORT
            </v-btn>
          </v-layout>
          <v-progress-circular
            v-else-if="state === 'importing'"
            indeterminate></v-progress-circular>
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
  name: 'QuizImporter',
  data: () => ({
    visible: false,
    state: 'init',
    data: null,
  }),
  props: {
    controller: {
      type: Object,
      required: true
    },
  },
  methods: {
    show() {
      this.reset();
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
    importQuiz() {
      this.state = 'importing';
      this.controller.importQuiz(this.data).then(() => {
        this.close();
      });
    },
    reset() {
      this.state = 'init';
    },
    verifyData() {
      let error = false;
      if (this.data === null) {
        error = true;
      } else if (!(this.data.appVersion && this.data.schemaVersion && this.data.name)) {
        error = true;
      }
      if (error) {
        alert('Uploaded file is invalid!');
        return;
      }
      this.state = 'importready';
    },
    fileChange(files) {
      if (files.length === 0) return;
      if (files[0].type !== 'application/json') {
        alert('Invalid File Format!');
        return;
      }
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.data = JSON.parse(evt.target.result);
        this.verifyData();
      };
      reader.readAsText(files[0]);
    }
  },
};
</script>

