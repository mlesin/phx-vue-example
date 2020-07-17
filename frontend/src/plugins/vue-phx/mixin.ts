import Vue from "vue";

export default Vue.extend({
  created() {
    const channels = this.$options.channels;
    if (channels) {
      Object.keys(channels).forEach((channelName: string) => {
        const channel = this.$channelKeeper.retrieveChannel(channelName, {});
        Object.keys(channels[channelName]).forEach((eventName: string) => {
          const callback = channels[channelName][eventName];
          channel.on(eventName, (payload?: unknown) => callback.apply(this, [payload]));
        });
      });
    }
  },
  beforeDestroy() {
    const channels = this.$options.channels;
    if (channels) {
      Object.keys(channels).forEach(key => {
        console.log("Bye", key);
        // Bad idea to leave channel here, because other components may be connected
        // this.$options.channels?.[key].leave?.();
        // delete this.$options.channels?.[key];
      });
    }
  }
});
