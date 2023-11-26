// import { LeaderBoard } from "../../model/leaderboard";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";

export const ActionType = {
  RECEIVE_LEADERBOARD: "RECEIVE_LEADERBOARD",
};

export function receiveLoaderboardsActionCreator(leaderboards = []) {
  return {
    type: ActionType.RECEIVE_LEADERBOARD,
    payload: { leaderboards },
  };
}

export function asyncReceiveLeaderboards() {
  return async (dispatch) => {
    showLoading();
    try {
      const leaderboards = await api.getAllLeaderboards();
      dispatch(receiveLoaderboardsActionCreator(leaderboards));
    } catch (err: any) {
      alert(err.message);
    }
    hideLoading();
  };
}
