import { Socket, SocketConnectOption } from "phoenix";
import _Vue, { PluginObject } from "vue";
import VuePhxMixin from "./mixin";

interface VuePhxOptions {
  url: string;
  params?: Partial<SocketConnectOption>;
}

const VueChannel: PluginObject<VuePhxOptions> = {
  install(Vue: typeof _Vue, options?: VuePhxOptions) {
    if (!options) return;
    const socket = new Socket(options.url, { params: options.params });
    Vue.prototype.$socket = socket;
    Vue.mixin(VuePhxMixin);
  }
};

export default VueChannel;
