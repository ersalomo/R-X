import { showLoading, hideLoading } from "react-redux-loading-bar";

function asyncPreloadProcess() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      // preload process
      //   const authUser = await getOwnProfile();
      //   dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      // fallback process
      //   dispatch(setAuthUserActionCreator(null));
    } finally {
      // end preload process
      //   dispatch(setIsPreloadActionCreator(false));
    }

    dispatch(hideLoading());
  };
}

export default asyncPreloadProcess;