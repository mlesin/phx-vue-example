import Vue from "vue";
export * from "vue";
export default Vue;

import { Socket } from "phoenix";
import ChannelKeeper from "./channelKeeper";
import { PhxChannels } from ".";
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
    channels?: PhxChannels;
  }
}
