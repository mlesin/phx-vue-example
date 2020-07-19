import { defineModule } from "direct-vuex";
import { /*moduleActionContext,*/ moduleGetterContext } from "./index";
import { Message, Reply } from "@/socketApi";

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
      const { state } = moduleGetterContext(args, module1);
      return `Hello, ${state.name}!`;
    }
  },
  mutations: {
    SET_NAME(state, response: Message) {
      state.name = response.message;
    },
    REPLY(_state, response: Reply) {
      console.log("in mutation", response);
      if (response.response === "join") {
        console.log("joined channel");
      } else {
        console.log("getting message:", response.response.message);
      }
    }
  },
  actions: {
    async loadName(_context, payload: { id: string }) {
      //const { commit } = moduleActionContext(context, module1);
      const name = `Name-${payload.id}`; // load it from somewhere
      //commit.SET_NAME(name);
      return { name };
    }
  }
});

export default module1;
