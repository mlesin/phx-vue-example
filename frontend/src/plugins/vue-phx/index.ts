import { Socket, SocketConnectOption } from "phoenix";
import _Vue, { PluginObject } from "vue";
import VuePhxMixin from "./mixin";
import ChannelKeeper from "./channelKeeper";

interface VuePhxOptions {
  url: string;
  params?: Partial<SocketConnectOption>;
}

const VueChannel: PluginObject<VuePhxOptions> = {
  install(Vue: typeof _Vue, options?: VuePhxOptions) {
    if (!options) return;
    const socket = new Socket(options.url, { params: options.params });
    console.log("connecting socket...");
    socket.connect();
    Vue.prototype.$channelKeeper = new ChannelKeeper(socket);
    Vue.prototype.$socket = socket;
    Vue.mixin(VuePhxMixin);
  }
};

export default VueChannel;
