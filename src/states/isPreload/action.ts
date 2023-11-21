// import asyncPreloadProcess from "../../utils/loading/loadingProcess";
import { setAuthUserActionCreator } from "../users/action";

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
    try {
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (err: any) {
      dispatch(setAuthUserActionCreator(null));
    } finally {
      dispatch(setIsPreloadActionCreator(false));
    }
  };
}
