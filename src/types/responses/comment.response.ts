import { AccountResponse0, AccountResponse1 } from "./account.response";

export type HiddenCommentResponse = {
  _id: string;
  createdAt: number;
  text: string;
  createdBy: AccountResponse0;
};

export type CommentResponse = {
  createdBy: AccountResponse1;
  isPinned: boolean;
  noOfLikes: number;
  noOfReplies: number;
} & HiddenCommentResponse;
