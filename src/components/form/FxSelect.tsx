import { Select, SelectItem } from "@nextui-org/react";
import { IInput } from "@/src/types";
import { useFormContext } from "react-hook-form";

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
      errorMessage={errors[name] ? (errors[name]?.message as string) : ""}
      className="my-2"
      label={label}
      isDisabled={disabled}
    >
      {options.map((option) => (
        <SelectItem key={option.key}>{option.label}</SelectItem>
      ))}
    </Select>
  );
};

export default FxSelect;
