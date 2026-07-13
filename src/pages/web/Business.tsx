import { allPosts } from "../../data";
import LatestNewsCard from "../../components/cards/LatestNewsCard";

const Business = () => {
  const posts = allPosts.filter((post) => post.category.slug === "business");

  return (
    <div className="space-y-10">
      <div className="border-b border-neutral-200 pb-4">
        <h1 className="text-3xl font-heading font-black text-neutral-900 tracking-tight flex items-center gap-3">
          <span className="block h-8 w-1 bg-[#dc2626]"></span>
          Business & Markets
        </h1>
        <p className="text-neutral-500 text-sm mt-1.5 font-medium">
          Insights on economic updates, financial market movements, tariffs, and corporate trade policies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <LatestNewsCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Business;
