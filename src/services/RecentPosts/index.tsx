import { envConfig } from "@/src/config/envConfig";
// import { delay } from "@/src/utils/delay";

export const getRecentPosts = async () => {
  const fetchOptions = {
    next: {
      tags: ["posts"],
    }
  };

  const res = await fetch(`${envConfig.baseApi}/items?sortBy=-createdAt&limit=9`, fetchOptions);
  const data = await res.json();
  // console.log(data);

  return data;
};
