import { ActionType } from "./action";
// type ActionLB<T> = {
//   type: string;
//   payload: T;
// };
// action: ActionLB<Array<LeaderBoard>> = {},

export default function leaderboardsReducer(leaderboards = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_LEADERBOARD:
      return action.payload.leaderboards;
    default:
      return leaderboards;
  }
}
