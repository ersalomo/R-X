/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import { receiveThreadsActionCreator } from "../threads/action";
import { receiveUsersActionCreator } from "../users/action";
import { ThreadResponse } from "../../model/thread";
import { UserResponse } from "../../model/user";

export function asyncPopulateThreadsAndUsers(category: string = "") {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const threads: [] = await api.getAllThreads();
      const users: [] = await api.getAllUsers();
      const addedUserThreads = threads.map((thread: ThreadResponse) => {
        return {
          ...thread,
          owner: users.find((user: UserResponse) => user.id === thread.ownerId),
        };
      });
      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(addedUserThreads, category));
    } catch (e) {}
    dispatch(hideLoading());
  };
}
