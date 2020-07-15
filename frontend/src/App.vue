<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h2>Phx-Vue-Example</h2>
      </div>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col md="6">
            <communicator sender="Left"></communicator>
          </v-col>
          <v-col md="6">
            <communicator sender="Right"></communicator>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Communicator from "./components/Communicator.vue";

@Component({
  components: {
    Communicator
  }
})
export default class App extends Vue {}
</script>
