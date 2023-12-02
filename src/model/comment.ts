import { Owner } from "./user";
import { VoteType } from "../utils/api";

export type Comment = {
  content: string;
};

export type CommentReq = Comment & {
  threadId: string;
};
export type CommentRes = {
  id: string;
  content: string;
  upVotesBy: [];
  createdAt: string;
  downVotesBy: [];
  owner: Owner;
};

export type VoteCommentReq = {
  threadId: string;
  commentId: string;
  voteType: VoteType;
};
