import { useFormContext } from "react-hook-form";
import type { Schema } from "@/forms/User/schema";
import type { InputType } from "@/types";

interface InputProps {
  id: keyof Schema;
  label: string;
  type: InputType;
  placeholder: string;
}

const Input = ({ id, label, type, placeholder }: InputProps) => {
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext<Schema>();

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        {...register(id, { onChange: () => trigger(id) })}
        placeholder={placeholder}
      />
      {errors[id] && <p>{errors[id].message}</p>}
    </div>
  );
};

export default Input;
