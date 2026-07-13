import { Link } from "react-router-dom";
import type { Post } from "../../types/generalTypes";

interface SubHeroCardProps {
  post: Post;
}

const SubHeroCard = ({ post }: SubHeroCardProps) => {
  return (
    <Link
      to={`/post/${post.slug}`}
      className="group flex flex-col bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-xs cursor-pointer hover:shadow-md transition-all duration-300"
    >
      <div className="relative overflow-hidden aspect-[16/10] bg-neutral-100">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300 ease-out"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 bg-[#dc2626] text-white text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-sm shadow-xs">
          {post.category.name}
        </span>
      </div>
      
      <div className="p-4 flex-grow flex flex-col justify-between">
        <h3 className="font-heading font-bold text-sm sm:text-base text-neutral-900 leading-snug group-hover:text-[#dc2626] transition-colors line-clamp-2">
          {post.title}
        </h3>
        <span className="text-[10px] font-bold text-neutral-450 uppercase mt-3 block tracking-wide">
          {post.publishedAt}
        </span>
      </div>
    </Link>
  );
};

export default SubHeroCard;
