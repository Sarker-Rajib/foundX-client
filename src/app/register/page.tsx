"use client";

import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";

import FxInput from "@/src/components/form/FxInput";
import FXForm from "@/src/components/form/FXForm";
import { registerValidationSchema } from "@/src/schemas/register.shema";
import { useUserRegistration } from "@/src/hooks/auth.hook";

const Register = () => {
  const { mutate: handleUserRrgistration } = useUserRegistration();
  // const { mutate: handleUserRrgistration, isPending } = useUserRegistration();

  const onSubmit: SubmitHandler<FieldValues> = (data: any) => {
    const userData = {
      ...data,
      profilePhoto: "https://cdn-icons-png.flaticon.com/512/3607/3607444.png",
    };

    // console.log('from form', userData);
    handleUserRrgistration(userData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="py-4 w-[375px] border-green-500 border">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
          <h4 className="font-bold text-large">Register</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <FXForm
            defaultValues={{
              name: "Rajib Sarker",
              email: "abcd@email.com",
              mobileNumber: "12345678",
              password: "123456",
            }}
            resolver={zodResolver(registerValidationSchema)}
            onSubmit={onSubmit}
          >
            <FxInput label="Name" name="name" type="text" />
            <FxInput label="Email" name="email" type="email" />
            <FxInput label="Mobile Number" name="mobileNumber" type="text" />
            <FxInput label="Password" name="password" type="password" />
            <Button className="w-full mt-4" type="submit">
              Submit
            </Button>
          </FXForm>
        </CardBody>
      </Card>
    </div>
  );
};

export default Register;
