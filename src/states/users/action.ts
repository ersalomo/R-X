import api from "../../utils/api";
import { User, UserLogin, RegisterUser } from "../../model/user";
import { hideLoading, showLoading } from "react-redux-loading-bar";

export const ActionType = {
  SET_AUTH_USER: "SET_AUTH_USER",
  UNSET_AUTH_USER: "UNSET_AUTH_USER",
  RECEIVE_USERS: "RECEIVE_USERS",
};

export function receiveUsersActionCreator(users = []) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: { users },
  };
}

export function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

export function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
}

export function asyncReceiveUsers() {
  return async (dispatch) => {
    const users = await getAllUsers();
    dispatch(receiveUsersActionCreator(users));
  };
}

export function asyncRegisterUser(user: RegisterUser): void {
  return async () => {
    showLoading();
    try {
      await api.register(user);
    } catch (err) {
      alert(err.message);
    }
    hideLoading();
  };
}

export function asyncUnsetAuthUser() {
  return async (dispatch) => {
    showLoading();
    dispatch(unsetAuthUserActionCreator());
    api.putAccessToken("");
    hideLoading();
  };
}

export function asyncSetAuthUser(user: UserLogin) {
  return async (dispatch) => {
    showLoading();
    try {
      const token: string = await api.login(user);
      api.putAccessToken(token);
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (err) {
      alert(err.message);
    }
    hideLoading();
  };
}

// function TodoList() {
//   const todos = useSelector((states) => states.todos);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(asyncReceiveTodos());
//   }, [dispatch]);

//   // ... another component code
// }
