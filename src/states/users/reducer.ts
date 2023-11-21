import { ActionType } from "./action";
export default function userReducer(users = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_USERS:
      return action.payload.users;
    default:
      return users;
  }
}

export function authUserReducer(authUser = null, action = {}) {
  const { payload, type } = action;
  switch (type) {
    case ActionType.SET_AUTH_USER:
      return payload.authUser;
    case ActionType.UNSET_AUTH_USER:
      return null;
    default:
      return authUser;
  }
}
