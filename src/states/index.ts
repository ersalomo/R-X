import { configureStore } from "@reduxjs/toolkit";
import userReducer, { authUserReducer } from "../states/users/reducer";
import threadReducer from "../states/threads/reducer";
import { loadingBarReducer } from "react-redux-loading-bar";
import { thunk } from "./middleware";
import { isPreloadReducer } from "./isPreload/reducer";
import leaderboardsReducer from "./leaderboards/reducer";

const store = configureStore({
  reducer: {
    users: userReducer,
    threads: threadReducer,
    loadingBar: loadingBarReducer,
    isPreload: isPreloadReducer,
    authUser: authUserReducer,
    leaderboards: leaderboardsReducer,
    // setAlerts : (state, { payload } :PayloadAction<{alert : Ipa}> )
  },
  middleware: [thunk],
});

export default store;
