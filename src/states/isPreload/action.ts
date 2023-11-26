// import asyncPreloadProcess from "../../utils/loading/loadingProcess";
import { setAuthUserActionCreator } from "../users/action";
import api from "../../utils/api";
import { hideLoading, showLoading } from "react-redux-loading-bar";

export const ActionType = {
  SET_IS_PRELOAD: "SET_IS_PRELOAD",
};

export function setIsPreloadActionCreator(isPreload: boolean) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: { isPreload },
  };
}

export function asyncPreloadProcess() {
  return async (dispatch) => {
    showLoading()
    try {
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (err: any) {
      dispatch(setAuthUserActionCreator(null));
    } finally {
      dispatch(setIsPreloadActionCreator(false));
    }
    hideLoading()
  };
}
