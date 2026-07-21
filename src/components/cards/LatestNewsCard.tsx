import { Link } from "react-router-dom";
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

  const authorName =
    typeof post.author === "object" && post.author !== null
      ? post.author.fullname || post.author.name || "Admin"
      : post.author || "Admin";

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
            {post.excerpt}
          </p>
        </div>
        
        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-450 border-t border-neutral-100 pt-4 mt-4">
          <span>By {authorName}</span>
          <span>•</span>
          <span>{post.readingTime}</span>
        </div>
      </div>
    </Link>
  );
};

export default LatestNewsCard;
