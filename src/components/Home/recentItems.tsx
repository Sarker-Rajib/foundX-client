import MyCard from "../card";

import { getRecentPosts } from "@/src/services/RecentPosts";
import { IPost } from "@/src/types";

export default async function RecentItems() {
  const { data }: { data: IPost[] } = await getRecentPosts();

  return (
    <div>
      <h2>Recent Items</h2>
      <div className="grid grid-cols-3">
        {data.map((item, i: number) => (
          <MyCard key={i} post={item} />
        ))}
      </div>
    </div>
  );
}
