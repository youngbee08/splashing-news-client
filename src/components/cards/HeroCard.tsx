import { Link } from "react-router-dom";
import type { Post } from "../../types/generalTypes";

interface HeroCardProps {
  post: Post;
}

const HeroCard = ({ post }: HeroCardProps) => {
  const categoryName =
    typeof post.category === "object" && post.category !== null
      ? post.category.name
      : typeof post.category === "string"
      ? post.category
      : "General";

  return (
    <Link
      to={`/post/${post.slug}`}
      className="block group relative overflow-hidden rounded-lg shadow-xs border border-neutral-100 bg-neutral-900 h-[65vh] lg:h-[480px] cursor-pointer"
    >
      <img
        src={post.featuredImage}
        alt={post.title}
        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 ease-out opacity-85"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent"></div>

      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-col justify-end">
        <span className="inline-block bg-[#dc2626] text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.75 rounded-sm mb-3.5 w-max">
          {categoryName}
        </span>
        <h2 className="text-2xl sm:text-3.5xl font-bold font-heading text-white! leading-tight mb-3 group-hover:text-neutral-200 transition-colors">
          {post.title}
        </h2>
        <p className="text-neutral-300 text-xs sm:text-sm font-medium leading-relaxed max-w-2xl">
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
};

export default HeroCard;
