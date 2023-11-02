import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../states/users/reducer";
import threadReducer from "../states/threads/reducer";

export const store = configureStore({
  reducer: {
    users: userReducer,
    threads: threadReducer,
  },
  middleware: [],
});
