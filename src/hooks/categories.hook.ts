import { useQuery } from "@tanstack/react-query";

import { getCategories } from "../services/Categories";

export const useGetCategories = () => {
  return useQuery({
    queryKey: [],
    queryFn: async () => await getCategories(),
  });
};
