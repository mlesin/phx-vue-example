import Vue from "vue";
export * from "vue";
export default Vue;

import { Socket, Channel } from "phoenix";
import ChannelKeeper from "./channelKeeper";
declare module "vue/types/vue" {
  interface Vue {
    $socket: Socket;
    $channelKeeper: ChannelKeeper;
  }
}

declare module "vue/types/options" {
  interface ComponentOptions<
    V extends Vue,
    Data = DefaultData<V>,
    Methods = DefaultMethods<V>,
    Computed = DefaultComputed,
    PropsDef = PropsDefinition<DefaultProps>,
    Props = DefaultProps
  > {
    channels?: Record<string, Partial<Channel>>;
  }
}
