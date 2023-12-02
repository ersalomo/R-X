import { ActionType } from "./action";
import { ThreadResponse } from "../../model/thread";

export default function detailThreadReducer(
  detailThread: ThreadResponse = null,
  action = {},
) {
  switch (action.type) {
    case ActionType.RECEIVE_DETAIL_THREAD:
      return action.payload.detailThread;
    case ActionType.CLEAR_DETAIL_THREAD:
      return null;
    case ActionType.TOGGLE_LIKE_COMMENT_THREAD:
      const { userId, commentId, voteType } = action.payload;
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id === commentId) {
            switch (voteType) {
              case voteTypeValue.upVote:
                return {
                  ...comment,
                  upVotesBy: [...new Set([...comment.upVotesBy, userId])],
                  downVotesBy: comment.downVotesBy.filter(
                    (uId) => uId !== userId,
                  ),
                };
              case voteTypeValue.downVote:
                return {
                  ...comment,
                  downVotesBy: [...new Set([...comment.downVotesBy, userId])],
                  upVotesBy: comment.upVotesBy.filter((uId) => uId !== userId),
                };
            }
          }
          return comment;
        }),
      };

    default:
      return detailThread;
  }
}
