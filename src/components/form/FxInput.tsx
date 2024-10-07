"use client"
import { Input } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";

interface IProps {
  required?: boolean;
  type: string;
  name: string
  label: string
}

const FxInput = ({ required = false, type = "text", name, label }: IProps) => {

  const { register, formState: { errors } } = useFormContext()

  return (
    <>
      <label className="ms-2 pb-1 text-sm text-green-500">{label}</label>
      <Input
        className="w-full mb-2"
        type={type}
        required={required}
        errorMessage={errors[name] ? errors[name]?.message as string : ""}
        isInvalid={!!errors[name]}
        {...register(name)}
      />
    </>
  );
};

export default FxInput;