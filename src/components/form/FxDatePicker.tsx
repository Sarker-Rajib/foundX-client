import { DatePicker } from "@nextui-org/react";
import { Controller, useFormContext } from "react-hook-form";

export const FxDatepicker = ({
  label,
  name,
}: {
  label: string;
  name: string;
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      render={({ field: { value, ...fields } }) => <DatePicker label={label} />}
    />
  );
};
