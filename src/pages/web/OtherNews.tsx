import { usePostContext } from "../../hooks/UsePostContext";
import type { Post } from "../../types/generalTypes";
import LatestNewsCard from "../../components/cards/LatestNewsCard";
import CardSkeleton from "../../components/skeletons/CardSkeleton";
import { useParams, Link } from "react-router-dom";
import { FiInbox, FiArrowLeft } from "react-icons/fi";

const OtherNews = () => {
  const { postsData, isPostsLoading } = usePostContext();
  const { cat } = useParams<{ cat: string }>();

  const rawPosts: Post[] = Array.isArray(postsData?.data) ? postsData.data : [];

  const categoryTitle = cat
    ? cat.charAt(0).toUpperCase() + cat.slice(1)
    : "General News";

  const posts = rawPosts.filter((post) => {
    if (!cat) return true;
    const catSlug =
      typeof post.category === "object" ? post.category?.slug : post.category;
    const catName =
      typeof post.category === "object" ? post.category?.name : post.category;
    const target = cat.toLowerCase();
    return (
      catSlug?.toLowerCase() === target || catName?.toLowerCase() === target
    );
  });

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-12">
      <div className="border-b border-neutral-200 pb-4">
        <h1 className="text-3xl font-heading font-black text-neutral-900 tracking-tight flex items-center gap-3">
          <span className="block h-8 w-1 bg-[#dc2626]"></span>
          {categoryTitle}
        </h1>
        <p className="text-neutral-500 text-sm mt-1.5 font-medium">
          Explore the latest stories, breaking updates, and editorial posts in{" "}
          <span className="font-semibold text-neutral-800">{categoryTitle}</span>.
        </p>
      </div>

      {isPostsLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <CardSkeleton key={idx} variant="latest" />
          ))}
        </div>
      ) : posts.length > 0 ? (
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
            No posts Found in {categoryTitle}
          </h2>

          <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto leading-relaxed mb-6 font-medium">
            We currently don't have any published posts in this category.
            Check back soon or explore our latest news feeds.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/news"
              className="inline-flex items-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition-all shadow-xs"
            >
              <span>Explore All News</span>
            </Link>

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

export default OtherNews;
