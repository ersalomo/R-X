enum ActionType {
  ADD_THREAD = "ADD_THREAD",
  DELETE_THREAD = "DELETE_THREAD",
}

function addThreadActionCreator({ id, text }) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      id,
      text,
    },
  };
}

function deleteThreadActionCreator(id) {
  return {
    type: ActionType.DELETE_THREAD,
    payload: {
      id,
    },
  };
}

export { ActionType, addGoalActionCreator, deleteGoalActionCreator };
