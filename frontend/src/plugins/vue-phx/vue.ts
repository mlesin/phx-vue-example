import Vue from "vue";
export * from "vue";
export default Vue;

import { Socket, Channel } from "phoenix";
import ChannelKeeper from "./channelKeeper";
import { ObeyOption, ObeyChannels } from "./obey";
declare module "vue/types/vue" {
  interface Vue {
    $channelKeeper: ChannelKeeper;
    $channel: Channel;
    $socket: Socket;
    $waitingEventList: Record<string, string>;
    /**
     * Init the channel and listen the event listed on options[phoenix]
     */
    $initChannel: (channelName: string, params?: Record<string, unknown>) => void;
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
    phoenix?: ObeyChannels | ObeyOption;
  }
}
