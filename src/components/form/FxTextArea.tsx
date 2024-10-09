"use client";
import { Textarea } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";

interface IProps {
  required?: boolean;
  name: string;
  label: string;
}

const FxTextAtrea = ({ required = false, name, label }: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Textarea
        {...register(name)}
        className="w-full mb-2"
        errorMessage={errors[name] ? (errors[name]?.message as string) : ""}
        isInvalid={!!errors[name]}
        label={label}
        minRows={6}
        required={required}
      />
    </>
  );
};

export default FxTextAtrea;
