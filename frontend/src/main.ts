import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";

import VuePhx, { Assignments } from "./plugins/vue-phx";
const assignments: Assignments = {
  "some_channel:topic": {
    other: store.commit.module1.SET_NAME
  }
};
Vue.use(VuePhx, { url: "ws://localhost:4000/socket", params: { token: "" }, assignments });

Vue.config.productionTip = false;

new Vue({
  store: store.original,
  vuetify,
  render: h => h(App)
}).$mount("#app");
