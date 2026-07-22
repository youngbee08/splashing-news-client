import LatestNewsCard from "../../components/cards/LatestNewsCard";
import { usePostContext } from "../../hooks/UsePostContext";
import CardSkeleton from "../../components/skeletons/CardSkeleton";
import type { Post } from "../../types/generalTypes";
import { FiArrowLeft, FiInbox } from "react-icons/fi";
import { Link } from "react-router-dom";

const News = () => {
  const { postsData, isPostsLoading } = usePostContext();

  if (isPostsLoading) {
    return (
      <div className="space-y-10">
        <div className="border-b border-neutral-200 pb-4">
          <h1 className="text-3xl font-heading font-black text-neutral-900 tracking-tight">
            All News & Reports
          </h1>
          <p className="text-neutral-500 text-sm mt-1.5 font-medium">
            Comprehensive, real-time coverage of politics, business, health, and
            national infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardSkeleton variant="latest" />
          <CardSkeleton variant="latest" />
          <CardSkeleton variant="latest" />
        </div>
      </div>
    );
  }

  const posts: Post[] = Array.isArray(postsData?.data) ? postsData.data : [];

  return (
    <div className="space-y-10">
      <div className="border-b border-neutral-200 pb-4">
        <h1 className="text-3xl font-heading font-black text-neutral-900 tracking-tight">
          All News & Reports
        </h1>
        <p className="text-neutral-500 text-sm mt-1.5 font-medium">
          Comprehensive, real-time coverage of politics, business, health, and
          national infrastructure.
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <LatestNewsCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center max-w-2xl mx-auto my-8">
          <div className="w-16 h-16 rounded-2xl bg-red-50 text-[#dc2626] flex items-center justify-center mx-auto mb-4 border border-red-100 shadow-2xs">
            <FiInbox className="w-8 h-8" />
          </div>

          <h2 className="font-heading font-black text-xl sm:text-2xl text-neutral-900 mb-2">
            No posts Found
          </h2>

          <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto leading-relaxed mb-6 font-medium">
            We currently don't have any published posts. Check back soon or
            explore our latest news feeds.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-white border border-neutral-250 hover:bg-neutral-100 text-neutral-750 text-xs font-semibold px-4 py-2.5 rounded-lg transition-all shadow-2xs"
            >
              <FiArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;
