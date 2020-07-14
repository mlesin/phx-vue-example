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
            <v-card>
              <v-container>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="message"
                      label="Message"
                      @keydown.enter="add"
                    />
                  </v-col>
                  <v-col cols="auto">
                    <v-btn @click="add">Send</v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-list>
                      <v-list-item
                        v-for="(item, idx) in items.slice().reverse()"
                        :key="idx"
                      >
                        {{ item }}
                      </v-list-item>
                    </v-list>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({})
export default class App extends Vue {
  items: string[] = [];
  message = "";

  add() {
    if (this.message.length > 0) {
      this.items.push(this.message);
      this.message = "";
    }
  }
}
</script>
