"use client";

import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";

import { DateToISo } from "@/src/utils/dateToISO";
import FxInput from "@/src/components/form/FxInput";
import FxSelect from "@/src/components/form/FxSelect";
import { allDistict } from '@bangladeshi/bangladesh-address'
import { useGetCategories } from "@/src/hooks/categories.hook";
import { ChangeEvent, useState } from "react";

// cities
const cityOptions = allDistict().sort().map((city: string) => (
  {
    key: city,
    label: city
  }
))

const CreatePost = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([])

  const {
    data: categories,
    isLoading: categoryLoading,
    isSuccess: categorySuccess
  } = useGetCategories();

  let categoriesOptions: { key: string, label: string }[] = []
  if (categories?.data && !categoryLoading) {
    categoriesOptions = categories?.data.map((item: any) => ({ key: item._id, label: item.name }))
  }

  const methods = useForm();
  const { control, handleSubmit } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const imagefile = e.target.files![0];
    setImageFiles((prev => [...prev, imagefile]))
  }

  console.log(imageFiles);


  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const postData = {
      ...data,
      questions: data.questions.map((que: { value: string }) => que.value),
      dateFound: DateToISo(data.dateFound),
    };

    console.log(postData);
  };

  const handleFieldAppend = () => {
    append({ name: "questions" });
  };

  return (
    <div className="p-2">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-2">
            <FxInput label="Title" name="title" type="text" />
            <FxInput label="Date" name="dateFound" type="date" />
            <FxInput label="Location" name="location" type="text" />
            <FxSelect options={cityOptions} name="city" label="City" />
            <FxSelect options={categoriesOptions} name="category" label="Category" disabled={!categorySuccess} />

            <div>
              <label
                htmlFor="image"
                className="cursor-pointer flex bg-slate-800 p-2 rounded-lg"
              >
                Upload Image
              </label>
              <input
                onChange={(e) => handleImageChange(e)}
                className="hidden"
                type="file"
                name="image" id="image"
              />
            </div>
          </div>

          <Divider className="my-3" />
          <div className="flex items-center justify-between">
            <h1>Owner Verification questions !</h1>
            <Button onClick={handleFieldAppend}>Add a Question !</Button>
          </div>
          {fields.map((field, i) => (
            <div key={field.id} className="border p-1 rounded mb-1">
              <FxInput
                label="Question"
                name={`questions.${i}.value`}
                type="text"
              />
              <Button onClick={() => remove(i)}>Remove</Button>
            </div>
          ))}

          <Button className="mt-4" type="submit">
            Post
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreatePost;
