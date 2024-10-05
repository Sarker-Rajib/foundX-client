"use client"

import FXForm from "@/src/components/form/FXForm";
import FxInput from "@/src/components/form/FxInput";
import { Card, CardHeader, CardBody, Button, Spinner } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod"
import { loginValidationSchema } from "@/src/schemas/login.schema";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useUserLogin } from "@/src/hooks/auth.hook";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/src/context/user.provider";
import { useEffect } from "react";

const LoginPage = () => {
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect')
  const router = useRouter()

  const { setIsLoading } = useUser();

  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();

  const onSubmit: SubmitHandler<FieldValues> = (data: any) => {
    handleUserLogin(data);
    setIsLoading(true);
  }

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push('/');
      }
    }
  }, [isPending, isSuccess, redirect, router]);

  return (
    <>
      {isPending ?
        <div className="h-screen fixed backdrop-blur-sm z-[999] inset-0 flex justify-center items-center">
          <Spinner size="lg" />
        </div>
        :
        <div className="min-h-screen flex items-center justify-center">
          <Card className="py-4 w-[375px] border-green-500 border">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
              <h4 className="font-bold text-large">Login</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <FXForm
                defaultValues={{
                  email: "abcd@email.com",
                  password: "123456"
                }}
                onSubmit={onSubmit} resolver={zodResolver(loginValidationSchema)}>
                <FxInput label="Email" type="email" name="email" />
                <FxInput label="Password" type="password" name="password" />
                <Button type="submit" className="w-full mt-4" >
                  Submit
                </Button>
              </FXForm>
            </CardBody>
          </Card>
        </div>
      }
    </>
  );
};

export default LoginPage;