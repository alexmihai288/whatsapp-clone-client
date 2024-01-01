import { Conversation, Profile } from "@prisma/client";

export type ConversationWithMembers = Conversation & {
  memberOne: Profile;
  memberTwo: Profile;
};
