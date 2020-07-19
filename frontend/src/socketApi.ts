import { Assignments } from "./plugins/vue-phx";
import store from "./store";
import * as t from "io-ts";
import { pipe } from "fp-ts/lib/function";
import * as E from "fp-ts/lib/Either";
import Either = E.Either;

/** Helper function for describing optional types */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function optional<RT extends t.Any>(
  type: RT,
  name = `${type.name} | undefined`
): t.UnionType<[RT, t.UndefinedType], t.TypeOf<RT> | undefined, t.OutputOf<RT> | undefined, t.InputOf<RT> | undefined> {
  return t.union<[RT, t.UndefinedType]>([type, t.undefined], name);
}

// Describing validators for payloads we are expecting from our backend (`V` is short for `Validator`)
/** Message structure */
const MessageV = t.type(
  {
    /** Sender's ID */
    sender: t.string,
    /** Message text */
    message: t.string
  },
  "Message"
);
const JoinReplyV = t.type(
  {
    status: t.union([t.literal("ok"), t.literal("error")]),
    response: t.literal("join")
  },
  "Pure Reply"
);

/** Phoenix Reply structure */
const MessageReplyV = t.type(
  {
    status: t.union([t.literal("ok"), t.literal("error")]),
    response: MessageV
  },
  "Message Reply"
);

const ReplyV = t.union([JoinReplyV, MessageReplyV]);

// Static types for io-ts descriptions above
export type Message = t.TypeOf<typeof MessageV>;
export type JoinReply = t.TypeOf<typeof JoinReplyV>;
export type MessageReply = t.TypeOf<typeof MessageReplyV>;
export type Reply = t.TypeOf<typeof ReplyV>;

/** Helper function for validate types for messages we are receiving from our backend */
function validate<T>(codec: t.Type<T>, handler: (typedPayload: T) => void, errorHandler?: (errors: t.Errors) => void) {
  return (payload: unknown) => {
    const result: Either<t.Errors, T> = codec.decode(payload);
    pipe(
      result,
      E.fold(
        err => {
          if (errorHandler) {
            errorHandler(err);
          } else {
            console.error("Return type does not match expectations:", err);
          }
        },
        res => handler(res)
      )
    );
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
