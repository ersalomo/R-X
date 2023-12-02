/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { ThreadRequest, ThreadResponse } from "../../model/thread";
import api, { VoteType } from "../../utils/api";

enum ActionType {
  ADD_THREAD = "ADD_THREAD",
  DELETE_THREAD = "DELETE_THREAD",
  RECEIVE_THREADS = "RECEIVE_THREADS",
  TOGGLE_LIKE_THREAD = "TOGGLE_LIKE_THREAD",
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function deleteThreadActionCreator(id: string) {
  return {
    type: ActionType.DELETE_THREAD,
    payload: {
      id,
    },
  };
}

function asyncAddThread(threadReq: ThreadRequest) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread(threadReq);
      console.log(thread);
      dispatch(addThreadActionCreator(thread));
    } catch (e: any) {
      console.log(e);
      alert(e.message);
    }
    dispatch(hideLoading());
  };
}

function receiveThreadsActionCreator(
  threads: ThreadResponse[],
  category: string = "",
) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: { threads, category },
  };
}

function asyncReceiveThreads(category = "") {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const threads = await api.getAllThreads();
      dispatch(receiveThreadsActionCreator(threads, category));
    } catch (error: any) {}
    dispatch(hideLoading());
  };
}

function toggleLikeThreadActionCreator(threadId, userId, voteType) {
  return {
    type: ActionType.TOGGLE_LIKE_THREAD,
    payload: {
      threadId,
      userId,
      voteType,
    },
  };
}

function asyncToggleLikeThread(threadId: string, voteType: VoteType) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(toggleLikeThreadActionCreator(threadId, authUser.id, voteType));
    try {
      await api.voteThread(threadId, voteType);
    } catch (error: any) {
      dispatch(toggleLikeThreadActionCreator(threadId, authUser.id, voteType));
      console.log(error);
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  addThreadActionCreator,
  deleteThreadActionCreator,
  asyncAddThread,
  receiveThreadsActionCreator,
  asyncReceiveThreads,
  asyncToggleLikeThread,
  toggleLikeThreadActionCreator,
};
