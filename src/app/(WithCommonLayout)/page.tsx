import HomeLanding from "@/src/components/Home/landing";
import RecentItems from "@/src/components/Home/recentItems";

export default function Home() {
  return (
    <section className="py-8 md:py-10 max-w-[1280px] mx-auto p-3">
      <HomeLanding />
      <RecentItems />
    </section>
  );
}
