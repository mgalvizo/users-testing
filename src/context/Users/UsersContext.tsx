import { createContext, useReducer } from "react";
import { USERS_INITIAL_STATE, USERS_CONTEXT_DEFAULT_VALUE } from "./constants";
import { usersReducer } from "./reducer";
import { UsersActions } from "./types";
import type { User, UsersProviderProps } from "./types";

const UsersContext = createContext(USERS_CONTEXT_DEFAULT_VALUE);

const UsersProvider = ({ children }: UsersProviderProps) => {
  const [state, dispatch] = useReducer(usersReducer, USERS_INITIAL_STATE);

  const handleAddUser = (user: User) => {
    dispatch({ type: UsersActions.ADD, payload: user });
  };

  const handleDeleteUser = (id: string) => {
    dispatch({ type: UsersActions.DELETE, payload: id });
  };

  const handleEditUser = (id: string, data: Partial<User>) => {
    dispatch({ type: UsersActions.EDIT, payload: { id, data } });
  };

  const contextValue = {
    users: state,
    onAddUser: handleAddUser,
    onDeleteUser: handleDeleteUser,
    onEditUser: handleEditUser,
  };

  return (
    <UsersContext.Provider value={contextValue}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;

export { UsersContext };
