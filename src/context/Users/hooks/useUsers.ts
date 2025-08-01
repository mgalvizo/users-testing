import { useContext } from "react";
import { UsersContext } from "../UsersContext";

const useUsers = () => {
  const usersContext = useContext(UsersContext);

  if (usersContext === null) {
    throw new Error("Attempting to access Users context outside provider");
  }

  return usersContext;
};

export { useUsers };
