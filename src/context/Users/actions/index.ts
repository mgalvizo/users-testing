import { UsersActions } from "../types";
import type {
  User,
  AddUserAction,
  DeleteUserAction,
  EditUserAction,
} from "../types";

const addCourseAction = (user: User): AddUserAction => {
  return {
    type: UsersActions.ADD,
    payload: user,
  };
};

const deleteCourseAction = (id: string): DeleteUserAction => {
  return { type: UsersActions.DELETE, payload: id };
};

const editCourseAction = (id: string, data: Partial<User>): EditUserAction => {
  return { type: UsersActions.EDIT, payload: { id, data } };
};

export { addCourseAction, deleteCourseAction, editCourseAction };
