export type Comment = {
  content: string;
};

export type Owner = {
  id: string;
  name: string;
  email: string;
};

export type CommentReq = Comment;
export type CommentRes = {
  id: string;
  content: string;
  upVotesBy: [];
  createdAt: string;
  downVotesBy: [];
  owner: Owner;
};
