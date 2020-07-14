import Vue from "vue";

export default Vue.extend({
  created() {
    // Phoenix is not exist in the options
    if (!this.$options.phoenix) {
      return;
    }
    this.$waitingEventList = {};
    for (const key of Object.keys(this.$options.phoenix)) {
      const phoenixOption = this.$options.phoenix[key];
      if (typeof phoenixOption === "string") {
        console.log(this.$options.phoenix, this);
        // this.$channel ? this.$channel.on(key, this[phoenixOption]) : (this.$waitingEventList[key] = phoenixOption);
      } else {
        console.log(this.$options.phoenix);
        const channel = this.$channelKeeper.retrieveChannel(key);
        for (const eventName of Object.keys(this.$options.phoenix[key])) {
          console.log(this.$options.phoenix);
          // const methodName = this.$options.phoenix[key][eventName];
          // channel.on(eventName, this[methodName]);
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
        this.$channel = this.$channelKeeper.retrieveChannel(channelName, params);
        for (const key of Object.keys(this.$waitingEventList)) {
          const methodName = this.$waitingEventList[key];
          // this.$channel.on(key, this[methodName]);
        }
      }
    }
  }
});
