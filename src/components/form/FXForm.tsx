"use client"
import { ReactNode } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"

interface IProps {
  children: ReactNode;
  onSubmit: SubmitHandler<any>;
  defaultValues?: Record<string, any>;
  resolver?: any;
}

interface formConfig {
  defaultValues?: Record<string, any>;
  resolver?: any;
}

export default function FXForm({ children, onSubmit, defaultValues, resolver }: IProps) {

  const formConfig: formConfig = {}

  if (!!defaultValues) {
    formConfig["defaultValues"] = defaultValues
  }

  if (!!resolver) {
    formConfig["resolver"] = resolver
  }
  // const { handleSubmit, register, formState } = useForm()
  const methods = useForm(formConfig)
  const submitHandler = methods.handleSubmit;


  return (
    <FormProvider {...methods}>
      <form onSubmit={submitHandler(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  )
}