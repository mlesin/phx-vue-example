import Vue from "vue";
import { createDecorator } from "vue-class-component";

export interface ObeyOption {
  [eventName: string]: string;
}

export interface ObeyChannels {
  [channelName: string]: ObeyOption;
}

export function Obey(
  eventName: string,
  channelName?: string
): (targetPrototype: Vue, memberName: string, _propDescriptor: PropertyDescriptor) => void {
  return (targetPrototype: Vue, memberName: string, _propertyDescriptor: PropertyDescriptor) => {
    console.log("create decorator:", targetPrototype, _propertyDescriptor);
    const decorator = createDecorator((componentOptions, _k) => {
      componentOptions.phoenix = !componentOptions.phoenix ? Object.create(null) : componentOptions.phoenix;
      if (componentOptions.phoenix) {
        if (channelName) {
          componentOptions.phoenix[channelName] = componentOptions.phoenix[channelName]
            ? {
                ...(componentOptions.phoenix as ObeyChannels)[channelName],
                [eventName]: memberName
              }
            : {
                [eventName]: memberName
              };
        } else {
          (componentOptions.phoenix as ObeyOption)[eventName] = memberName;
        }
      }
    });
    decorator(targetPrototype, memberName);
  };
}
