import React from "react";

import MyCard from "@/src/components/card";
import { getRecentPosts } from "@/src/services/RecentPosts";
import { IPost } from "@/src/types";

const RecentPostParallal = async () => {
  const { data }: { data: IPost[] } = await getRecentPosts();

  return (
    <div className="mx-auto max-w-[1280px] px-3">
      <h2 className="text-center text-xl py-2">Recent Items</h2>
      <div className="grid grid-cols-3 gap-4">
        {data.map((item, i: number) => (
          <MyCard key={i} post={item} />
        ))}
      </div>
    </div>
  );
};

export default RecentPostParallal;
