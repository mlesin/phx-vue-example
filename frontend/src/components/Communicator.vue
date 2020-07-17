<template>
  <v-card>
    <v-container>
      <v-row>
        <v-col>
          <v-text-field v-model="message" label="Message" @keydown.enter="add" />
        </v-col>
        <v-col cols="auto">
          <v-btn @click="add">Send</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-list>
            <v-list-item v-for="(item, idx) in historyList.slice().reverse()" :key="idx">
              <v-list-item-title>{{ item.sender }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.message }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import store from "../store";

export default Vue.extend({
  props: {
    sender: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      historyList: [] as { sender: string; message: string }[],
      message: ""
    };
  },
  channels: {
    "room:lobby": {
      газирумгарумге: function(payload: { sender: string; message: string }) {
        this.historyList.push({ sender: payload.sender, message: "other:" + payload.message });
      },
      shout: function(payload: { sender: string; message: string }) {
        this.historyList.push(payload);
      }
    }
  },
  methods: {
    add() {
      if (this.message.length > 0) {
        store.dispatch.module1.loadName({ id: this.message });
        console.log("sending msg:", this.message);
        this.$channelKeeper.retrieveChannel("room:lobby").push("shout", {
          message: this.message,
          sender: this.sender
        });
        this.message = "";
      }
    }
  }
});
</script>
