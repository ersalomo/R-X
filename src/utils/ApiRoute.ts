const BASE_URL = "https://forum-api.dicoding.dev/v1";
const API_ROUTE = {
  USERS: {
    REGISTER: `${BASE_URL}/register`,
    LOGIN: `${BASE_URL}/login`,
    ALL_USERS: `${BASE_URL}/users`,
    DETAIL: `${BASE_URL}/users/me`,
  },
  THREADS: {
    CREATE: `${BASE_URL}/threads`,
    ALL_THREADS: `${BASE_URL}/threads`,
    DETAIL: `${BASE_URL}/threads/:threadId`,
  },
  COMMENTS: {
    CREATE: `${BASE_URL}/threads/:threadId/comments`,
  },
  VOTES: {
    UP_VOTE: `${BASE_URL}/threads/:threadId/up-vote`,
    DOWN_VOTE: `${BASE_URL}/threads/:threadId/down-vote`,
    NEUTRALIZE: `${BASE_URL}/threads/:threadId/neutral-vote`,
  },
  VOTE_COMMENTS: {
    UP_VOTE_COMMENT: `${BASE_URL}/threads/:threadId/comments/:commentId/up-vote`,
    DOWN_VOTE_COMMENT: `${BASE_URL}/threads/:threadId/comments/:commentId/down-vote`,
    NEUTRALIZE_VOTE_COMMENT: `${BASE_URL}/threads/:threadId/comments/:commentId/neutral-vote`,
  },
  LEADERBOARDS: {
    ALL: `${BASE_URL}/leaderboards`,
  },
};

export default API_ROUTE;
