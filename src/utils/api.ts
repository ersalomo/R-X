import { ThreadRequest } from "../model/thread";
import { CommentReq, CommentRes, VoteCommentReq } from "../model/comment";
import { RegisterUser, UserLogin } from "../model/user";
import { BASE_URL } from "./ApiRoute";
import toast from "react-hot-toast";

export type VoteType = -1 | 1 | 0;

export const voteTypeValue: Record<string, VoteType> = {
  neutralVote: 0,
  upVote: 1,
  downVote: -1,
};

export const errorNotify = (msg: string) =>
  toast(msg, {
    duration: 2000,
  });

export const successNotify = (msg: string) =>
  toast.success(msg, {
    duration: 2000,
  });

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
      errorNotify(message);
      throw new Error(message);
    }
    successNotify("Your account registered");

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
      errorNotify(message);
      throw new Error(message);
    }
    successNotify("Success login");
    const {
      data: { token },
    } = responseJson;
    return token;
  }

  async function getOwnProfile() {
    const res = await _fetchWithAuth(`${BASE_URL}/users/me`);
    const responseJson = await res.json();
    const { status, message } = responseJson;
    if (status !== "success") throw new Error(message);

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
      errorNotify(message);
      throw new Error(message);
    }
    successNotify("Thread created successfully");
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
    const response = await fetch(`${BASE_URL}/threads/${id}`);
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
  async function createComment(commentReq: CommentReq): Promise<CommentRes> {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${commentReq.threadId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
        body: JSON.stringify({ content: commentReq.content }),
      },
    );

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== "success") {
      errorNotify(message);
      throw new Error(message);
    }
    successNotify("New comment created successfully");

    const {
      data: { comment },
    } = responseJson;

    const commentRes: CommentRes = comment;

    return commentRes;
  }
  // end comments
  // votes

  async function voteThread(threadId: string, voteType: VoteType) {
    const voteTypeUrl: Record<VoteType, string> = {
      "0": `${BASE_URL}/threads/${threadId}/neutral-vote`, //netral
      "-1": `${BASE_URL}/threads/${threadId}/down-vote`, //down-vote
      "1": `${BASE_URL}/threads/${threadId}/up-vote`, //up-vote
    };

    const response = await _fetchWithAuth(voteTypeUrl[voteType], {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== "success") {
      errorNotify(message);
      throw new Error(message);
    }
    successNotify("Thread is voted");
    const {
      data: { vote },
    } = responseJson;

    return vote;
  }

  // async function upVote(threadId: string, voteType: VoteType) {
  //   const voteTypeUrl: Record<VoteType, string> = {
  //     "0": `${BASE_URL}/threads/${threadId}/neutral-vote`, //netral
  //     "-1": `${BASE_URL}/threads/${threadId}/down-vote`, //down-vote
  //     "1": `${BASE_URL}/threads/${threadId}/up-vote`, //up-vote
  //   };

  //   const response = await _fetchWithAuth(
  //     `${BASE_URL}/threads/${threadId}/up-vote`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${getAccessToken()}`,
  //       },
  //     },
  //   );

  //   const responseJson = await response.json();

  //   const { status, message } = responseJson;

  //   if (status !== "success") {
  //     throw new Error(message);
  //   }
  //   const {
  //     data: { vote },
  //   } = responseJson;

  //   return vote;
  // }
  // async function downVote(threadId: string) {
  //   const response = await _fetchWithAuth(
  //     `${BASE_URL}/threads/${threadId}/down-vote`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${getAccessToken()}`,
  //       },
  //     },
  //   );

  //   const responseJson = await response.json();

  //   const { status, message } = responseJson;

  //   if (status !== "success") {
  //     throw new Error(message);
  //   }
  //   const {
  //     data: { vote },
  //   } = responseJson;

  //   return vote;
  // }
  // async function neutralVote(threadId: string) {
  //   const response = await _fetchWithAuth(
  //     `${BASE_URL}/threads/${threadId}/neutral-vote`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${getAccessToken()}`,
  //       },
  //     },
  //   );

  //   const responseJson = await response.json();

  //   const { status, message } = responseJson;

  //   if (status !== "success") {
  //     throw new Error(message);
  //   }
  //   const {
  //     data: { vote },
  //   } = responseJson;

  //   return vote;
  // }

  async function voteComment(req: VoteCommentReq) {
    const voteTypeUrl: Record<VoteType, string> = {
      "0": `${BASE_URL}/threads/${req.threadId}/comments/${req.commentId}/neutral-vote`, //netral
      "-1": `${BASE_URL}/threads/${req.threadId}/comments/${req.commentId}/down-vote`, //down-vote
      "1": `${BASE_URL}/threads/${req.threadId}/comments/${req.commentId}/up-vote`, //up-vote
    };

    const response = await _fetchWithAuth(voteTypeUrl[req.voteType], {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== "success") {
      errorNotify(message);
      throw new Error(message);
    }
    successNotify("Comment is voted");
    const {
      data: { vote },
    } = responseJson;

    return vote;
  }

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
    voteThread,
    createComment,
    // upVote,
    // downVote,
    // neutralVote,
    downVoteComment,
    upVoteComment,
    voteComment,
    netralVoteComment,
    getAllLeaderboards,
  };
})();
