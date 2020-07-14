import Vue from "vue";
import { createDecorator } from "vue-class-component";

export function Obey(
  eventName: string,
  channelName?: string
): (target: Vue, key: string, _descriptor: unknown) => void {
  return (target: Vue, methodName: string, _descriptor: unknown) => {
    console.log(
      eventName,
      channelName,
      ":",
      target,
      ":",
      methodName,
      ":",
      _descriptor
    );
    createDecorator((componentOptions, _k) => {
      componentOptions.phoenix = !componentOptions.phoenix
        ? Object.create(null)
        : componentOptions.phoenix;
      if (componentOptions.phoenix) {
        if (channelName) {
          componentOptions.phoenix[channelName] = componentOptions.phoenix[
            channelName
          ]
            ? {
                ...(componentOptions.phoenix[channelName] as Record<
                  string,
                  string
                >),
                [eventName]: methodName
              }
            : {
                [eventName]: methodName
              };
        } else {
          componentOptions.phoenix[eventName] = methodName;
        }
      }
    })(target, methodName);
  };
}
