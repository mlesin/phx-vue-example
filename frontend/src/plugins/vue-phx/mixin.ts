import Vue from "vue";
import { ObeyChannels } from "./obey";

export default Vue.extend({
  created() {
    // Phoenix is not exist in the options
    if (!this.$options.phoenix) {
      return;
    }
    for (const key of Object.keys(this.$options.phoenix)) {
      const phoenixOption = this.$options.phoenix[key];
      if (typeof phoenixOption === "function") {
        console.log("mixin create:", key, phoenixOption);
        if (this.$channel) {
          console.log("mixin create $channel exists:", key, phoenixOption);
          this.$channel.on(key, (response?: Record<string, string>) => phoenixOption.apply(this, [response]));
        } else {
          console.log("mixin create put into $waitingEventList:", key, phoenixOption);
          this.$waitingEventList[key] = phoenixOption;
        }
      } else {
        console.log("mixin create 2:", this.$options.phoenix);
        const channel = this.$channelKeeper.retrieveChannel(key);
        for (const eventName of Object.keys(this.$options.phoenix[key])) {
          console.log(this.$options.phoenix);
          const method = (this.$options.phoenix as ObeyChannels)[key][eventName];
          channel.on(eventName, (response?: Record<string, string>) => method.apply(this, [response]));
        }
      }
    }
  },
  destroyed() {
    // Phoenix is not exist in the options
    if (!this.$options.phoenix) {
      return;
    }
    for (const key of Object.keys(this.$options.phoenix)) {
      const phoenixOption = this.$options.phoenix[key];
      if (phoenixOption instanceof Function) {
        if (this.$channel) {
          this.$channel.off(key);
        }
      } else {
        const channel = this.$channelKeeper.retrieveChannel(key);
        for (const eventName of Object.keys(this.$options.phoenix[key])) {
          channel.off(eventName);
        }
      }
    }
  },
  methods: {
    $initChannel(channelName: string, params?: Record<string, unknown>) {
      if (this.$waitingEventList) {
        console.log("$initChannel:", channelName, "params:", params, "$waitingEventList:", this.$waitingEventList);
        this.$channel = this.$channelKeeper.retrieveChannel(channelName, params);
        for (const key of Object.keys(this.$waitingEventList)) {
          const method = this.$waitingEventList[key];
          this.$channel.on(key, (response?: Record<string, string>) => method.apply(this, [response]));
        }
      }
    }
  }
});
