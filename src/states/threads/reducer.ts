import { ActionType } from "./action";

export default function threadReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.ADD_THREAD:
      return [...threads, action.payload];
    case ActionType.DELETE_THREAD:
      return threads.filter((thread) => thread !== action.payload.id);
    default:
      return threads;
  }
}
