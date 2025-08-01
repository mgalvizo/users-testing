import { UsersActions } from "../types";
import { USERS_INITIAL_STATE } from "../constants";
import type { UsersAction } from "../types";

const usersReducer = (state = USERS_INITIAL_STATE, action: UsersAction) => {
  switch (action.type) {
    case UsersActions.ADD:
      return [...state, action.payload];
    case UsersActions.DELETE:
      return state.filter((user) => user.id !== action.payload);
    case UsersActions.EDIT:
      return state.map((user) =>
        user.id === action.payload.id
          ? { ...user, ...action.payload.data }
          : user
      );
    default:
      return state;
  }
};

export { usersReducer };
