import { useUsers } from "@/context/Users/hooks/useUsers";

const UserList = () => {
  const { users } = useUsers();

  const renderedUsers = users.map(({ id, name, email }) => {
    return (
      <tr key={id}>
        <td>{name}</td>
        <td>{email}</td>
      </tr>
    );
  });

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody data-testid="users">{renderedUsers}</tbody>
      </table>
    </>
  );
};

export default UserList;
