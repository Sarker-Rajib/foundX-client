'use client'

import FxInput from "@/src/components/form/FxInput";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/react";
import { FieldValues, FormProvider, SubmitHandler, useFieldArray, useForm } from "react-hook-form";

const CreatePost = () => {
  const methods = useForm();
  const { control, handleSubmit } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions'
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const postData = {
      ...data,
      questions: data.questions.map((que: { value: string }) => que.value)
    }
    console.log(postData);
  }

  const handleFieldAppend = () => {
    append({ name: 'questions' })
  };

  return (
    <div className="p-2">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FxInput name="title" label="Title" type="text" />

          <Divider className="my-3" />
          <div className="flex items-center justify-between">
            <h1>Owner Verification questions !</h1>
            <Button onClick={handleFieldAppend}>Add a Question !</Button>
          </div>
          {
            fields.map((field, i) => (
              <div key={field.id} className="border p-1 rounded mb-1">
                <FxInput name={`questions.${i}.value`} type="text" label="Question" />
                <Button onClick={() => remove(i)}>Remove</Button>
              </div>
            ))
          }


          <Button type="submit" className="mt-4">
            Post
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreatePost;