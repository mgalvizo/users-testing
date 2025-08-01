import type { User, UsersContextDefaultValue } from "../types";

const USERS_INITIAL_STATE: User[] = [];

const USERS_CONTEXT_DEFAULT_VALUE: UsersContextDefaultValue = {
  users: [],
  onAddUser: () => {},
  onDeleteUser: () => {},
  onEditUser: () => {},
};

export { USERS_INITIAL_STATE, USERS_CONTEXT_DEFAULT_VALUE };
