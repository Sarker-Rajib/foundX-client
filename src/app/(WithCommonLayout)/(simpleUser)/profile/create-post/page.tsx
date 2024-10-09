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
import { allDistict } from "@bangladeshi/bangladesh-address";
import { ChangeEvent, useState } from "react";

import { DateToISo } from "@/src/utils/dateToISO";
import FxInput from "@/src/components/form/FxInput";
import FxSelect from "@/src/components/form/FxSelect";
import { useGetCategories } from "@/src/hooks/categories.hook";
import FxTextAtrea from "@/src/components/form/FxTextArea";
import { useUser } from "@/src/context/user.provider";
import { useCreatePost } from "@/src/hooks/post.hook";

// cities
const cityOptions = allDistict()
  .sort()
  .map((city: string) => ({
    key: city,
    label: city,
  }));

const CreatePost = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);

  const { mutate: handleCreatePost } = useCreatePost();

  const { user } = useUser();

  const {
    data: categories,
    isLoading: categoryLoading,
    isSuccess: categorySuccess,
  } = useGetCategories();

  let categoriesOptions: { key: string; label: string }[] = [];

  if (categories?.data && !categoryLoading) {
    categoriesOptions = categories?.data.map((item: any) => ({
      key: item._id,
      label: item.name,
    }));
  }

  const methods = useForm();
  const { control, handleSubmit } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const iFile = e.target.files![0];

    setImageFiles((prev) => [...prev, iFile]);

    if (iFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(iFile);
    }
  };

  // handle form submit
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formdata = new FormData();

    const postData = {
      ...data,
      questions: data.questions.map((que: { value: string }) => que.value),
      dateFound: DateToISo(data.dateFound),
      user: user!._id,
    };

    formdata.append("data", JSON.stringify(postData));
    for (let image of imageFiles) {
      formdata.append("itemImage", image);
    }

    handleCreatePost(formdata);
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
            <FxSelect label="City" name="city" options={cityOptions} />
            <FxSelect
              disabled={!categorySuccess}
              label="Category"
              name="category"
              options={categoriesOptions}
            />

            <div>
              <label
                className="cursor-pointer flex bg-slate-800 p-2 rounded-lg"
                htmlFor="image"
              >
                Upload Image
              </label>
              <input
                className="hidden"
                id="image"
                name="image"
                type="file"
                onChange={(e) => handleImageChange(e)}
              />
              <div className="flex mt-2">
                {imagePreviews.length &&
                  imagePreviews.map((url, i) => (
                    <img key={i} alt="itemPhoto" src={url} width={60} />
                  ))}
              </div>
            </div>
          </div>

          <Divider className="my-3" />
          <FxTextAtrea label="Details" name="description" />

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
