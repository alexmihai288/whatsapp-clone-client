import { Conversation, Message, Profile } from "@prisma/client";

export type ConversationWithMembers = Conversation & {
  memberOne: Profile;
  memberTwo: Profile;
};


export type MessageWithMember = Message & {
  member: Profile;
};
