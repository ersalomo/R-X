/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import { ThreadResponse } from "../../model/thread";

export const ActionType = {
  RECEIVE_DETAIL_THREAD: "RECEIVE_DETAIL_THREAD",
  CLEAR_DETAIL_THREAD: "CLEAR_DETAIL_THREAD",
  TOGGLE_LIKE_COMMENT_THREAD: "TOGGLE_LIKE_COMMENT_THREAD",
};

export function receiveDetailThreadActionCreator(detailThread: ThreadResponse) {
  return {
    type: ActionType.RECEIVE_DETAIL_THREAD,
    payload: { detailThread },
  };
}
export function clearDetailTalkActionCreator() {
  return {
    type: ActionType.CLEAR_DETAIL_THREAD,
  };
}

export function asyncGetDetailThread(threadId: string) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const detailThread = await api.getDetailThread(threadId);
      dispatch(receiveDetailThreadActionCreator(detailThread));
    } catch (error) {}
    dispatch(hideLoading());
  };
}

export function toggleLikeCommentThreadActionCreator(
  userId: string,
  commentId: string,
  voteType: string,
) {
  return {
    type: ActionType.TOGGLE_LIKE_COMMENT_THREAD,
    payload: {
      commentId,
      userId,
      voteType,
    },
  };
}

export function asyncToggleLikeCommentThread(req: VoteCommentReq) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(
      toggleLikeCommentActionCreator(req.commentId, authUser.id, req.voteType),
    );
    try {
      await api.voteComment(req);
    } catch (e: any) {
      dispatch(
        toggleLikeCommentActionCreator(
          req.commentId,
          authUser.id,
          req.voteType,
        ),
      );
      alert(e.message);
      console.log(e);
    }
    dispatch(hideLoading());
  };
}
