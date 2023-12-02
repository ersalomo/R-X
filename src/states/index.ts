import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../states/users/reducer";
import authUserReducer from "./authUser/reducer";
import threadReducer from "../states/threads/reducer";
import { loadingBarReducer } from "react-redux-loading-bar";
import { thunk } from "./middleware";
import { isPreloadReducer } from "./isPreload/reducer";
import leaderboardsReducer from "./leaderboards/reducer";
import detailThreadReducer from "./threadDetail/reducer";
import { loadingBarMiddleware } from "react-redux-loading-bar";

const store = configureStore({
  reducer: {
    users: userReducer,
    threads: threadReducer,
    loadingBar: loadingBarReducer,
    isPreload: isPreloadReducer,
    authUser: authUserReducer,
    leaderboards: leaderboardsReducer,
    detailThread: detailThreadReducer,
    // setAlerts : (state, { payload } :PayloadAction<{alert : Ipa}> )
  },
  middleware: [thunk, loadingBarMiddleware()],
});

export default store;
