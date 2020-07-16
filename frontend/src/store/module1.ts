/* eslint-disable @typescript-eslint/no-use-before-define */
import { defineModule } from "direct-vuex";
import { moduleActionContext, moduleGetterContext } from "./index";

export interface Module1State {
  name: null | string;
}

const module1 = defineModule({
  namespaced: true as true,
  state: (): Module1State => {
    return {
      name: null
    };
  },
  getters: {
    message(...args): string {
      const { state } = module1GetterContext(args);
      return `Hello, ${state.name}!`;
    }
  },
  mutations: {
    SET_NAME(state, newName: string) {
      state.name = newName;
    }
  },
  actions: {
    async loadName(context, payload: { id: string }) {
      const { commit } = module1ActionContext(context);
      const name = `Name-${payload.id}`; // load it from somewhere
      commit.SET_NAME(name);
      return { name };
    }
  }
});

export default module1;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const module1GetterContext = (args: [Module1State, any, any, any]) => moduleGetterContext(args, module1);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const module1ActionContext = (context: any) => moduleActionContext(context, module1);
