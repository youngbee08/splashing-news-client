import { Link } from "react-router-dom";
import type { Post } from "../../types/generalTypes";

interface PoliticsCardProps {
  post: Post;
}

const PoliticsCard = ({ post }: PoliticsCardProps) => {
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

      <div className="p-4 flex-grow flex flex-col gap-2 justify-center">
        <h3 className="font-heading font-bold text-sm sm:text-base text-neutral-900 leading-snug group-hover:text-[#dc2626] transition-colors line-clamp-2">
          {post.title}
        </h3>
        <h3 className="font-heading font-semibold text-sm sm:text-base text-neutral-600! leading-snug group-hover:text-[#dc2626] transition-colors line-clamp-2">
          {post.content}
        </h3>
      </div>
    </Link>
  );
};

export default PoliticsCard;
