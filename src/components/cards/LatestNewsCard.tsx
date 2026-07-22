import { Link } from "react-router-dom";
import { FiEye, FiMessageCircle, FiHeart } from "react-icons/fi";
import type { Post } from "../../types/generalTypes";

interface LatestNewsCardProps {
  post: Post;
}

const LatestNewsCard = ({ post }: LatestNewsCardProps) => {
  const categoryName =
    typeof post.category === "object" && post.category !== null
      ? post.category.name
      : typeof post.category === "string"
        ? post.category
        : "General";

  const commentsCount = Array.isArray(post.comments)
    ? post.comments.length
    : 0;

  return (
    <Link
      to={`/post/${post.slug}`}
      className="group flex flex-col bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-xs cursor-pointer hover:shadow-md transition-shadow duration-300"
    >
      <div className="relative overflow-hidden aspect-[16/10] bg-neutral-100">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300 ease-out"
          loading="lazy"
        />
      </div>

      <div className="p-5 flex-grow flex flex-col justify-between">
        <div className="space-y-2">
          <span className="text-[10px] font-bold text-[#dc2626] uppercase tracking-widest block">
            {categoryName}
          </span>
          <h3 className="font-heading font-bold text-base sm:text-lg text-neutral-900 leading-snug group-hover:text-[#dc2626] transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
            {post.content}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2 text-xs font-semibold text-neutral-450 border-t border-neutral-100 pt-4 mt-4">
          <span className="truncate">By Splashing News</span>
          <div className="flex items-center gap-3 shrink-0 text-neutral-500 font-medium">
            <span className="flex items-center gap-1" title="Views">
              <FiEye className="w-3.5 h-3.5" />
              <span>{post.views || 0}</span>
            </span>
            <span className="flex items-center gap-1" title="Comments">
              <FiMessageCircle className="w-3.5 h-3.5" />
              <span>{commentsCount}</span>
            </span>
            <span className="flex items-center gap-1" title="Likes">
              <FiHeart className="w-3.5 h-3.5 text-[#dc2626]" />
              <span>{post.likes || 0}</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LatestNewsCard;
