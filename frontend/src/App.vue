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
                        v-for="(item, idx) in historyList.slice().reverse()"
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
import { Obey } from "./plugins/vue-phx";

@Component({})
export default class App extends Vue {
  historyList: { sender: string; message: string }[] = [];
  message = "";
  sender = "";

  public add() {
    if (this.message.length > 0) {
      this.$channel.push("shout", {
        message: this.message,
        sender: this.sender
      });
      this.message = "";
    }
  }

  @Obey("shout")
  public onShout(payload: { sender: string; message: string }) {
    this.historyList.push(payload);
  }

  public created() {
    this.$initChannel("room:lobby");
  }
}
</script>
