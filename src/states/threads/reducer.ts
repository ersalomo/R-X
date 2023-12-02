import { ActionType } from "./action";
import { ThreadResponse } from "../../model/thread";
import { voteTypeValue } from "../../utils/api";

export default function threadReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.ADD_THREAD:
      return [...threads, action.payload.thread];
    case ActionType.DELETE_THREAD:
      return threads.filter((thread) => thread !== action.payload.id);
    case ActionType.RECEIVE_THREADS:
      const { threads: threadsVal, category } = action.payload;
      return category === ""
        ? threadsVal
        : threadsVal.filter(
            (thread: ThreadResponse) =>
              thread.category?.toLowerCase() === category.toLowerCase(),
          );

    case ActionType.TOGGLE_LIKE_THREAD:
      const { userId, threadId, voteType } = action.payload;
      return threads.map((thread: ThreadResponse) => {
        if (thread.id === threadId) {
          switch (voteType) {
            case voteTypeValue.upVote:
              return {
                ...thread,
                upVotesBy: [...new Set([...thread.upVotesBy, userId])],
                downVotesBy: thread.downVotesBy.filter((uId) => uId !== userId),
              };
            case voteTypeValue.downVote:
              return {
                ...thread,
                downVotesBy: [...new Set([...thread.downVotesBy, userId])],
                upVotesBy: thread.upVotesBy.filter((uId) => uId !== userId),
              };
          }
        }
        return thread;
      });
    default:
      return threads;
  }
}
