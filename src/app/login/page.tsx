"use client";

import { Card, CardHeader, CardBody, Button, Spinner } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import FXForm from "@/src/components/form/FXForm";
import FxInput from "@/src/components/form/FxInput";
import { loginValidationSchema } from "@/src/schemas/login.schema";
import { useUserLogin } from "@/src/hooks/auth.hook";
import { useUser } from "@/src/context/user.provider";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const router = useRouter();

  const { setIsLoading } = useUser();

  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();

  const onSubmit: SubmitHandler<FieldValues> = (data: any) => {
    handleUserLogin(data);
    setIsLoading(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isPending, isSuccess, redirect, router]);

  return (
    <>
      {isPending ? (
        <div className="h-screen fixed backdrop-blur-sm z-[999] inset-0 flex justify-center items-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <Card className="py-4 w-[375px] border-green-500 border">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
              <h4 className="font-bold text-large">Login</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <FXForm
                defaultValues={{
                  email: "abcd@email.com",
                  password: "123456",
                }}
                resolver={zodResolver(loginValidationSchema)}
                onSubmit={onSubmit}
              >
                <FxInput label="Email" name="email" type="email" />
                <FxInput label="Password" name="password" type="password" />
                <Button className="w-full mt-4" type="submit">
                  Submit
                </Button>
              </FXForm>
            </CardBody>
          </Card>
        </div>
      )}
    </>
  );
};

export default LoginPage;
