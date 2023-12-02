/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import { CommentReq, CommentRes, VoteCommentReq } from "../../model/comment";
import { ThreadResponse } from "../../model/thread";
import { receiveDetailThreadActionCreator } from "../threadDetail/action";
import { voteTypeValue } from "../../utils/api";

export const ActionType = {
  ADD_COMMENT: "ADD_COMMENT",
  TOGGLE_LIKE_COMMENT: "TOGGLE_LIKE_COMMENT",
};

export function addCommentActionCreator(comment: CommentRes) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: { comment },
  };
}

export function asyncAddComment(commentReq: CommentReq) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.createComment(commentReq);
      const newDetailThread = await api.getDetailThread(commentReq.threadId);
      dispatch(receiveDetailThreadActionCreator(newDetailThread));
    } catch (e: any) {}
    dispatch(hideLoading());
  };
}

export function toggleLikeCommentActionCreator(
  thread: ThreadResponse,
  req: VoteCommentReq,
  userId: string,
) {
  return {
    type: ActionType.TOGGLE_LIKE_COMMENT,
    payload: {
      // threadId,
      // commentId,
      // voteType
    },
  };

  return {
    ...thread,
    comments: thread.comments.map((comment) => {
      if (comment.id === req.commentId) {
        switch (req.voteType) {
          case voteTypeValue.upVote:
            return {
              ...comment,
              upVotesBy: [...new Set([...comment.upVotesBy, userId])],
              downVotesBy: comment.downVotesBy.filter((uId) => uId !== userId),
            };
          case voteTypeValue.downVote:
            return {
              ...comment,
              downVotesBy: [...new Set([...comment.downVotesBy, userId])],
              upVotesBy: comment.upVotesBy.filter((uId) => uId !== userId),
            };
        }
      }
      return comment;
    }),
  };
}

export function asyncToggleLikeComment(req: VoteCommentReq) {
  return async (dispatch) => {
    showLoading();
    try {
      await api.voteComment(req);
      const newDetailThread = await api.getDetailThread(req.threadId);
      dispatch(receiveDetailThreadActionCreator(newDetailThread));
    } catch (e: any) {
      alert(e.message);
      console.log(e);
    }
    hideLoading();
  };
}
