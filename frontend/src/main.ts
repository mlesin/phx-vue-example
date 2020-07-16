import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";

import VuePhx from "./plugins/vue-phx";
Vue.use(new VuePhx("ws://localhost:4000/socket", { params: { token: "" } }));

Vue.config.productionTip = false;

new Vue({
  store: store.original,
  vuetify,
  render: h => h(App)
}).$mount("#app");
