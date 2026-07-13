import { allPosts } from "../../data";
import LatestNewsCard from "../../components/cards/LatestNewsCard";

const News = () => {
  return (
    <div className="space-y-10">
      <div className="border-b border-neutral-200 pb-4">
        <h1 className="text-3xl font-heading font-black text-neutral-900 tracking-tight">
          All News & Reports
        </h1>
        <p className="text-neutral-500 text-sm mt-1.5 font-medium">
          Comprehensive, real-time coverage of politics, business, health, and national infrastructure.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allPosts.map((post) => (
          <LatestNewsCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default News;
