import LatestNewsCard from "../../components/cards/LatestNewsCard";
import { usePostContext } from "../../hooks/UsePostContext";
import type { Post } from "../../types/generalTypes";

const Politics = () => {
  const { postsData } = usePostContext();
  const rawPosts: Post[] = Array.isArray(postsData?.data) ? postsData.data : [];

  const posts = rawPosts.filter((post) => {
    const catSlug = typeof post.category === "object" ? post.category?.slug : post.category;
    const catName = typeof post.category === "object" ? post.category?.name?.toLowerCase() : String(post.category || "").toLowerCase();
    return catSlug === "politics" || catName === "politics";
  });

  return (
    <div className="space-y-10">
      <div className="border-b border-neutral-200 pb-4">
        <h1 className="text-3xl font-heading font-black text-neutral-900 tracking-tight flex items-center gap-3">
          <span className="block h-8 w-1 bg-[#dc2626]"></span>
          Politics & Policy
        </h1>
        <p className="text-neutral-500 text-sm mt-1.5 font-medium">
          Authoritative reporting on legislation, election campaigns, and government regulations.
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

export default Politics;
