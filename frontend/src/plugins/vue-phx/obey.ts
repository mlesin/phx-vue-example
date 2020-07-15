import Vue from "vue";
import { createDecorator } from "vue-class-component";

export interface ObeyOption {
  [eventName: string]: (response?: Record<string, string>) => void;
}

export interface ObeyChannels {
  [channelName: string]: ObeyOption;
}

export function Obey(
  eventName: string,
  channelName?: string
): (targetPrototype: Vue, memberName: string, propertyDescriptor: PropertyDescriptor) => void {
  return (targetPrototype: Vue, memberName: string, propertyDescriptor: PropertyDescriptor) => {
    console.log("create decorator:", targetPrototype, propertyDescriptor);
    const decorator = createDecorator((componentOptions, _k) => {
      componentOptions.phoenix = !componentOptions.phoenix ? Object.create(null) : componentOptions.phoenix;
      if (componentOptions.phoenix) {
        if (channelName) {
          componentOptions.phoenix[channelName] = componentOptions.phoenix[channelName]
            ? {
                ...(componentOptions.phoenix as ObeyChannels)[channelName],
                [eventName]: propertyDescriptor.value
              }
            : {
                [eventName]: propertyDescriptor.value
              };
        } else {
          (componentOptions.phoenix as ObeyOption)[eventName] = propertyDescriptor.value;
        }
      }
    });
    decorator(targetPrototype, memberName);
  };
}
