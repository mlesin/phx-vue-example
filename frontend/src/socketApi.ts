import { Assignments } from "./plugins/vue-phx";
import store from "./store";
import * as io from "io-ts";
import { PathReporter } from "io-ts/lib/PathReporter";
import { pipe } from "fp-ts/lib/function";
import * as E from "fp-ts/lib/Either";
import * as C from "fp-ts/lib/Console";

/** Helper function for describing optional types */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function optional<RT extends io.Any>(
  type: RT,
  name = `${type.name} | undefined`
): io.UnionType<[RT, io.UndefinedType], io.TypeOf<RT> | undefined, io.OutputOf<RT> | undefined, io.InputOf<RT> | undefined> {
  return io.union<[RT, io.UndefinedType]>([type, io.undefined], name);
}

// Describing validators for payloads we are expecting from our backend (`V` is short for `Validator`)
/** Message structure */
const MessageV = io.type(
  {
    /** Sender's ID */
    sender: io.string,
    /** Message text */
    message: io.string
  },
  "Message"
);
const JoinReplyV = io.type(
  {
    status: io.union([io.literal("ok"), io.literal("error")]),
    response: io.literal("join")
  },
  "Pure Reply"
);

/** Phoenix Reply structure */
const MessageReplyV = io.type(
  {
    status: io.union([io.literal("ok"), io.literal("error")]),
    response: MessageV
  },
  "Message Reply"
);

const ReplyV = io.union([JoinReplyV, MessageReplyV]);

// Static types for io-ts descriptions above
export type Message = io.TypeOf<typeof MessageV>;
export type JoinReply = io.TypeOf<typeof JoinReplyV>;
export type MessageReply = io.TypeOf<typeof MessageReplyV>;
export type Reply = io.TypeOf<typeof ReplyV>;

/** Helper function for validate types for messages we are receiving from our backend */
function validate<T>(codec: io.Type<T>, handler: (typedPayload: T) => void) {
  return (payload: unknown) => {
    const result = codec.decode(payload);
    pipe(result, E.mapLeft(C.error(PathReporter.report(result).join("\n"))), E.map(handler));
  };
}

// Assign store commits to events we are receiving and validate their types
const assignments: Assignments = {
  "room:lobby": {
    "газирумгарумге": validate(MessageV, store.commit.module1.SET_NAME),
    "phx_reply": validate(ReplyV, store.commit.module1.REPLY)
  }
};

export default assignments;
