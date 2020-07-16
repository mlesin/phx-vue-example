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
import { Component, Prop } from "vue-property-decorator";
import { Obey } from "../plugins/vue-phx";
import store from "../store";

@Component({})
export default class Communicator extends Vue {
  historyList: { sender: string; message: string }[] = [];
  message = "";

  @Prop({ default: "" })
  sender!: string;

  public add() {
    if (this.message.length > 0) {
      store.dispatch.module1.loadName({ id: this.message });
      this.$channel.push("shout", {
        message: this.message,
        sender: this.sender
      });
      this.message = "";
    }
  }

  @Obey("other", "some_channel:*")
  public onOther(payload: { sender: string; message: string }) {
    console.log("this:", this, "payload:", payload);
    this.historyList.push({ sender: payload.sender, message: "other:" + payload.message });
  }

  @Obey("shout")
  public onShout(payload: { sender: string; message: string }) {
    console.log("this:", this, "payload:", payload);
    this.historyList.push(payload);
  }

  public created() {
    this.$initChannel("room:lobby");
  }
}
</script>
