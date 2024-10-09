import { Select, SelectItem } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";

import { IInput } from "@/src/types";

interface IProps extends IInput {
  options: {
    key: string;
    label: string;
  }[];
}

const FxSelect = ({ options, name, label, disabled }: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Select
      {...register(name)}
      className="my-2"
      errorMessage={errors[name] ? (errors[name]?.message as string) : ""}
      isDisabled={disabled}
      label={label}
    >
      {options.map((option) => (
        <SelectItem key={option.key}>{option.label}</SelectItem>
      ))}
    </Select>
  );
};

export default FxSelect;
