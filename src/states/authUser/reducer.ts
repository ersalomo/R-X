import { ActionType } from "./action";

export default function authUserReducer(authUser = null, action = {}) {
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
