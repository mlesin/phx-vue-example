import { Socket, SocketConnectOption } from "phoenix";
import _Vue, { PluginObject } from "vue";
import VuePhxMixin from "./mixin";
import ChannelKeeper from "./channelKeeper";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EventCallback = (payload?: any) => void;

export type Assignments = Record<string, Record<string, EventCallback>>;

interface VuePhxOptions {
  url: string;
  params?: Partial<SocketConnectOption>;
  assignments: Assignments;
}

type PhxChnEvents = Record<string, EventCallback>;
export type PhxChannels = Record<string, PhxChnEvents>;

const VueChannel: PluginObject<VuePhxOptions> = {
  install(Vue: typeof _Vue, options?: VuePhxOptions) {
    if (!options) return;
    const socket = new Socket(options.url, { params: options.params });
    console.log("connecting socket...");
    socket.connect();
    const channelKeeper = new ChannelKeeper(socket);
    Vue.prototype.$channelKeeper = channelKeeper;
    Vue.prototype.$socket = socket;
    Object.keys(options.assignments).forEach(channelName => {
      const channel = channelKeeper.retrieveChannel(channelName);
      Object.keys(options.assignments[channelName]).forEach(eventName => {
        console.log("registering", channelName, eventName);
        channel.on(eventName, options.assignments[channelName][eventName]);
      });
    });
    Vue.mixin(VuePhxMixin);
  }
};

export default VueChannel;
