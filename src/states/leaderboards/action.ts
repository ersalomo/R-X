// import { LeaderBoard } from "../../model/leaderboard";
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
    try {
      const leaderboards = await api.getAllLeaderboards();
      dispatch(receiveLoaderboardsActionCreator(leaderboards));
    } catch (err: any) {
      alert(err.message);
    }
  };
}
