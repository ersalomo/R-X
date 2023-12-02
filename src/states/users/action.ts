/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
import api from "../../utils/api";
import { RegisterUser } from "../../model/user";
import { hideLoading, showLoading } from "react-redux-loading-bar";

export const ActionType = {
  RECEIVE_USERS: "RECEIVE_USERS",
};

export function receiveUsersActionCreator(users = []) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: { users },
  };
}

export function asyncReceiveUsers() {
  return async (dispatch) => {
    dispatch(showLoading());
    const users = await api.getAllUsers();
    dispatch(receiveUsersActionCreator(users));
    dispatch(hideLoading());
  };
}

export function asyncRegisterUser(user: RegisterUser) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.register(user);
    } catch (err) {}
    dispatch(hideLoading());
  };
}
