import { Channel, Socket } from "phoenix";

export default class ChannelKeeper {
  private channels: Record<string, Channel> = {};
  constructor(private socket: Socket) {}
  public retrieveChannel(channelName: string, params?: Record<string, unknown>): Channel {
    if (this.channels[channelName]) {
      return this.channels[channelName];
    } else {
      const newChannel = this.socket.channel(channelName, params);
      this.channels[channelName] = newChannel;
      newChannel.join(); // TODO handle response?
      return newChannel;
    }
  }
}
