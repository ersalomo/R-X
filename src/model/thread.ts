import { UserResponse } from "./user";

export type Thread = {
  title: string;
  body: string;
  category?: string;
};

export type ThreadResponse = Thread & {
  id: string;
  createdAt: string;
  ownerId: string;
  upVotesBy: [];
  downVotesBy: [];
  totalComments: number;
  owner?: UserResponse;
};

export type ThreadRequest = Thread;
