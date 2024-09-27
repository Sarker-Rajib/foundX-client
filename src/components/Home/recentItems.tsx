import { getRecentPosts } from "@/src/services/RecentPosts";
import Image from "next/image";

export default async function RecentItems() {
  const { data: posts } = await getRecentPosts();

  return (
    <div>
      <h2>Recent Items</h2>
      {
        posts.map((item, i) => <div key={i}>
          <p>{item.title}</p>
          {
            item.images.map((url, i) => <Image width={400} height={400} key={i} src={url} alt="image" />)
          }
        </div>)
      }
    </div>
  );
};
