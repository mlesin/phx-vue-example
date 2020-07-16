// type Callback = () => void;

// export default new (class {
//   listeners: Map<string, any>;

//   constructor() {
//     this.listeners = new Map();
//   }

//   addListener(label: string, callback: Callback, vm) {
//     if (typeof callback == "function") {
//       this.listeners.has(label) || this.listeners.set(label, []);
//       this.listeners.get(label).push({ callback: callback, vm: vm });

//       return true;
//     }

//     return false;
//   }

//   removeListener(label: string, callback: Callback, vm) {
//     const listeners = this.listeners.get(label);

//     if (listeners && listeners.length) {
//       const index = listeners.reduce((i, listener, index) => {
//         return typeof listener.callback == "function" && listener.callback === callback && listener.vm == vm ? (i = index) : i;
//       }, -1);

//       if (index > -1) {
//         listeners.splice(index, 1);
//         this.listeners.set(label, listeners);
//         return true;
//       }
//     }
//     return false;
//   }

//   emit(label: string, ...args) {
//     const listeners = this.listeners.get(label);

//     if (listeners && listeners.length) {
//       listeners.forEach(listener => {
//         listener.callback.call(listener.vm, ...args);
//       });
//       return true;
//     }
//     return false;
//   }
// })();
