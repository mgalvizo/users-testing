import type { ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
}

// Plural
enum UsersActions {
  ADD = "ADD",
  DELETE = "DELETE",
  EDIT = "EDIT",
}

type AddUserAction = {
  type: UsersActions.ADD;
  payload: User;
};

type DeleteUserAction = {
  type: UsersActions.DELETE;
  payload: string;
};

type EditUserAction = {
  type: UsersActions.EDIT;
  payload: { id: string; data: Partial<User> };
};

// Singular
type UsersAction = AddUserAction | DeleteUserAction | EditUserAction;

interface UsersContextDefaultValue {
  users: User[];
  onAddUser: (user: User) => void;
  onDeleteUser: (id: string) => void;
  onEditUser: (id: string, data: Partial<User>) => void;
}

interface UsersProviderProps {
  children?: ReactNode;
}

export { UsersActions };

export type {
  User,
  AddUserAction,
  DeleteUserAction,
  EditUserAction,
  UsersAction,
  UsersContextDefaultValue,
  UsersProviderProps,
};
