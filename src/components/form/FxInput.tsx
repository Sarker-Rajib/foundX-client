"use client";
import { Input } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";

interface IProps {
  required?: boolean;
  type: string;
  name: string;
  label: string;
}

const FxInput = ({ required = false, type = "text", name, label }: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <Input
        {...register(name)}
        className="w-full mb-2"
        errorMessage={errors[name] ? (errors[name]?.message as string) : ""}
        isInvalid={!!errors[name]}
        required={required}
        type={type}
        label={label}
      />
    </div>
  );
};

export default FxInput;
