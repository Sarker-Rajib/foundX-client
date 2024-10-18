import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { createPost } from "../services/post";
import { useRouter } from "next/navigation";

export const useCreatePost = () => {
  const router = useRouter()
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (postData) => await createPost(postData),
    onSuccess: () => {
      toast.success("Post Creation Success");
      router.push('/');
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};
