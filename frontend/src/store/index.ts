import Vue from "vue";
import Vuex from "vuex";
import { createDirectStore } from "direct-vuex";
import module1 from "./module1";

Vue.use(Vuex);

const { store, rootActionContext, moduleActionContext, rootGetterContext, moduleGetterContext } = createDirectStore({
  state: {},
  mutations: {},
  actions: {},
  modules: { module1 }
});

export default store;

export { rootActionContext, moduleActionContext, rootGetterContext, moduleGetterContext };

// The following lines enable types in the injected store '$store'.
export type AppStore = typeof store;
declare module "vuex" {
  interface Store<S> {
    direct: AppStore;
  }
}
