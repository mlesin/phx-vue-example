<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h2>Phx-Vue-Example</h2>
      </div>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="2">{{ $store.state.module1.name }}</v-col>
        </v-row>
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
import Communicator from "./components/Communicator.vue";

export default Vue.extend({
  components: { Communicator }
});
</script>
