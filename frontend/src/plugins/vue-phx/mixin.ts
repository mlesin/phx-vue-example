import Vue from "vue";
import { Channel } from "phoenix";

export default Vue.extend({
  created() {
    const channels = this.$options.channels;
    this.$options.channels = new Proxy(
      {},
      {
        set: (target: Record<string, Channel>, key: string, value) => {
          const chan = this.$channelKeeper.retrieveChannel(key, {});
          // const _chan = chan.join();

          if (value.onError) {
            chan.onError = value.onError;
          }

          if (value.onClose) {
            chan.onClose = value.onClose;
          }

          // if (value.onJoin) {
          //   chan.receive("ok", value.onJoin);
          // }

          if (value.onMessage) {
            chan.onMessage = function(event, payload, res) {
              value.onMessage(event, payload, res);
              return payload;
            };
          }

          target[key] = chan;
          return true;
        },
        deleteProperty: (target, key: string) => {
          delete target[key];
          return true;
        }
      }
    );
    if (channels) {
      Object.keys(channels).forEach((key: string) => {
        if (this.$options.channels) this.$options.channels[key] = channels[key];
      });
    }
  },
  beforeDestroy() {
    const channels = this.$options["channels"];

    if (channels) {
      Object.keys(channels).forEach(key => {
        console.log("Bye", key);
        this.$options.channels?.[key].leave?.();
        delete this.$options.channels?.[key];
      });
    }
  }
});
