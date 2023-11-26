import { ThreadRequest } from "../model/thread";
import { CommentReq, CommentRes } from "../model/comment";
import { RegisterUser, UserLogin } from "../model/user";
import { BASE_URL } from "./ApiRoute";

export default (() => {
  async function _fetchWithAuth(url: string, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }
  /*
   * Token
   * */

  function putAccessToken(token: string) {
    localStorage.setItem("accessToken", token);
  }

  function getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  async function register(userReg: RegisterUser) {
    const res = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userReg),
    });
    const responseJson = await res.json();
    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }
    const {
      data: { user },
    } = responseJson;
    return user;
  }

  async function login(user: UserLogin) {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const responseJson = await res.json();
    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }
    const {
      data: { token },
    } = responseJson;
    return token;
  }

  async function getOwnProfile() {
    const res = await _fetchWithAuth(`${BASE_URL}/users/me`);

    const responseJson = await res.json();

    const { status, message } = responseJson;
    if (status !== "success") {
      console.log("sattus", status);
      throw new Error(message);
    }

    const {
      data: { user },
    } = responseJson;

    return user;
  }

  async function getAllUsers() {
    const response = await fetch(`${BASE_URL}/users`);
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { users },
    } = responseJson;

    return users;
  }

  /*
   * threads
   * */

  async function createThread(threadReq: ThreadRequest) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getAccessToken()} `,
      },
      body: JSON.stringify(threadReq),
    });
    const responseJson = await response.json();

    const { status, message } = responseJson;
    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { thread },
    } = responseJson;

    return thread;
  }

  async function getAllThreads() {
    const response = await fetch(`${BASE_URL}/threads`);
    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { threads },
    } = responseJson;

    return threads;
  }

  async function getDetailThread(id: string) {
    const response = await fetch(`${BASE_URL}/${id}`);
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { detailThread },
    } = responseJson;

    return detailThread;
  }

  // comments
  async function createComment(
    threadId: string,
    commentReq: CommentReq,
  ): Promise<CommentRes> {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
        body: JSON.stringify(commentReq),
      },
    );

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { comment },
    } = responseJson;

    const commentRes: CommentRes = comment;

    return commentRes;
  }
  // end comments
  // votes

  async function upVote(threadId: string) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/up-vote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    );

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }
    const {
      data: { vote },
    } = responseJson;

    return vote;
  }
  async function downVote(threadId: string) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/down-vote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    );

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }
    const {
      data: { vote },
    } = responseJson;

    return vote;
  }

  async function neutralVote(threadId: string) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/neutral-vote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    );

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }
    const {
      data: { vote },
    } = responseJson;

    return vote;
  }

  // end votes
  // start comment
  async function upVoteComment(threadId: string, commentId: string) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    );

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }
    const {
      data: { vote },
    } = responseJson;

    return vote;
  }
  async function downVoteComment(threadId: string, commentId: string) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    );

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }
    const {
      data: { vote },
    } = responseJson;

    return vote;
  }
  async function netralVoteComment(threadId: string, commentId: string) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    );

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== "success") {
      throw new Error(message);
    }
    const {
      data: { vote },
    } = responseJson;

    return vote;
  }
  // end vote  comment

  // start leaderboards

  async function getAllLeaderboards() {
    const response = await fetch(`${BASE_URL}/leaderboards`);
    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== "success") {
      throw new Error(message);
    }

    const {
      data: { leaderboards },
    } = responseJson;

    return leaderboards;
  }
  // end leaderboards
  return {
    putAccessToken,
    getAccessToken,
    getDetailThread,
    getAllThreads,
    createThread,
    getAllUsers,
    getOwnProfile,
    login,
    register,
    createComment,
    upVote,
    downVote,
    neutralVote,
    downVoteComment,
    upVoteComment,
    netralVoteComment,
    getAllLeaderboards,
  };
})();
