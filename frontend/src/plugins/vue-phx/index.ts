import { Socket, SocketConnectOption } from "phoenix";
import _Vue, { PluginObject } from "vue";
import VuePhxMixin from "./mixin";
import ChannelKeeper from "./channelKeeper";
import { AppStore } from "@/store";

interface VuePhxOptions {
  url: string;
  params?: Partial<SocketConnectOption>;
  store?: AppStore;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EventCallback = (payload?: any) => void;
type PhxChnEvents = Record<string, EventCallback>;
export type PhxChannels = Record<string, PhxChnEvents>;

const VueChannel: PluginObject<VuePhxOptions> = {
  install(Vue: typeof _Vue, options?: VuePhxOptions) {
    if (!options) return;
    const socket = new Socket(options.url, { params: options.params });
    console.log("connecting socket...");
    socket.connect();
    Vue.prototype.$channelKeeper = new ChannelKeeper(socket);
    Vue.prototype.$socket = socket;
    if (options.store) {
      console.log(options.store.commit.module1.SET_NAME("HOHOHO!"));
    }
    Vue.mixin(VuePhxMixin);
  }
};

export default VueChannel;
