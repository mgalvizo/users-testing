import UsersProvider from "@/context/Users/UsersContext";
import UserForm from "@/components/UserForm/UserForm";
import UserList from "@/components/UserList/UserList";

const App = () => {
  return (
    <UsersProvider>
      <main>
        <UserForm />
        <UserList />
      </main>
    </UsersProvider>
  );
};

export default App;
