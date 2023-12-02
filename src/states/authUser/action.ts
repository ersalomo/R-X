/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
import { showLoading, hideLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import { UserLogin } from "../../model/user";

export const ActionType = {
  SET_AUTH_USER: "SET_AUTH_USER",
  UNSET_AUTH_USER: "UNSET_AUTH_USER",
};

export function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

export function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
}

export function asyncUnsetAuthUser() {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(unsetAuthUserActionCreator());
    api.putAccessToken("");
    dispatch(hideLoading());
  };
}

export function asyncSetAuthUser(user: UserLogin) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const token: string = await api.login(user);
      api.putAccessToken(token);
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (err) {}
    dispatch(hideLoading());
  };
}
