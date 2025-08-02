// import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, defaultSchema } from "@/forms/User/schema";
import type { Schema } from "@/forms/User/schema";
import { useUsers } from "@/context/Users/hooks/useUsers";
import Input from "@/components/Input/Input";

const UserForm = () => {
  const { onAddUser } = useUsers();

  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: defaultSchema,
  });

  const {
    handleSubmit,
    formState: {
      isValid,
      // errors
    },
    reset,
  } = methods;

  const onSubmit = async (data: Schema) => {
    if (isValid) {
      // console.log(data);
      const { name, email } = data;

      const newUser = {
        id: uuidv4(),
        name,
        email,
      };

      onAddUser(newUser);
    }

    reset();
    return;
  };

  // useEffect(() => {
  //   console.log("ERRORS", errors);
  // }, [errors]);

  return (
    <>
      <h2>Users Form</h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} aria-label="User Form">
          <Input
            id="name"
            label="Enter Name"
            type="text"
            placeholder="John Doe"
          />
          <Input
            id="email"
            label="Enter Email"
            type="email"
            placeholder="john_doe@mail.com"
          />
          <button type="submit">Add User</button>
        </form>
      </FormProvider>
    </>
  );
};

export default UserForm;
