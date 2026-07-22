import { useParams, Link, useNavigate } from "react-router-dom";
import { usePostContext } from "../../hooks/UsePostContext";
import { usePostBySlugQuery } from "../../hooks/usePostQueries";
import { toast } from "sonner";
import { FaHeart, FaRegHeart, FaShareAlt } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { PostDetailSkeleton } from "../../components/skeletons/CardSkeleton";

const PostDetail = () => {
  const navigate = useNavigate();
  const [postLiked, setPostLiked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { slug } = useParams<{ slug: string }>();
  const { likePost } = usePostContext();
  const { data: post, isLoading: isPostLoading } = usePostBySlugQuery(slug);

  if (isPostLoading) {
    return <PostDetailSkeleton />;
  }

  if (!post) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-heading font-bold text-neutral-800">
          Post Not Found
        </h2>
        <p className="text-neutral-500">
          The news story you are looking for does not exist or has been
          archived.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate(-1)}
            type="button"
            className="inline-flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-sm font-semibold px-5 py-2 rounded-md transition-colors shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
          <Link
            to="/"
            className="inline-block bg-[#dc2626] hover:bg-[#b91c1c] text-white text-sm font-semibold px-6 py-2 rounded-md transition-colors shadow-2xs"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
        .catch((err) => console.log("Error sharing:", err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.info("Link copied to clipboard!");
    }
  };

  const handleLikePost = () => {
    setPostLiked(true);
    likePost({ id: post._id, action: "like" });
  };

  const formatContentIntoParagraphs = (content?: string): string[] => {
    if (!content) return [];

    const normalized = content
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n\n")
      .replace(/<p[^>]*>/gi, "");

    const initialBlocks = normalized
      .split(/\n+/)
      .map((block) => block.trim())
      .filter(Boolean);

    const resultParagraphs: string[] = [];

    for (const block of initialBlocks) {
      if (block.length > 350) {
        const sentences = block.match(/[^.!?]+[.!?]+(?=\s|$)/g) || [block];
        let currentPara = "";

        for (const sentence of sentences) {
          if ((currentPara + sentence).length > 300 && currentPara.length > 0) {
            resultParagraphs.push(currentPara.trim());
            currentPara = sentence;
          } else {
            currentPara = currentPara ? `${currentPara} ${sentence}` : sentence;
          }
        }
        if (currentPara.trim()) {
          resultParagraphs.push(currentPara.trim());
        }
      } else {
        resultParagraphs.push(block);
      }
    }

    return resultParagraphs.length > 0 ? resultParagraphs : [content];
  };

  const paragraphs = formatContentIntoParagraphs(post.content);

  return (
    <article className="max-w-3xl mx-auto space-y-8 relative">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => navigate(-1)}
            type="button"
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-neutral-500" />
            <span>Back</span>
          </button>

          <Link
            to={`/${post.category?.slug || "news"}`}
            className="inline-block bg-[#dc2626]/10 text-[#dc2626] text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-sm hover:bg-[#dc2626]/20 transition-colors"
          >
            {post.category?.name ||
              (typeof post.category === "string" ? post.category : "General")}
          </Link>
        </div>
        <h1 className="text-3xl sm:text-4.5xl font-heading font-black text-neutral-900 leading-tight">
          {post.title}
        </h1>
        <p className="text-neutral-500 text-base leading-relaxed font-medium">
          {post.excerpt}
        </p>
      </div>

      <div className="overflow-hidden rounded-xl shadow-xs border border-neutral-100 aspect-[16/9] bg-neutral-50">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative">
        <div className="text-neutral-800 text-base sm:text-lg leading-relaxed font-body space-y-6">
          {(isExpanded ? paragraphs : paragraphs.slice(0, 2)).map(
            (pText: string, idx: number) => (
              <p key={idx} className="font-normal text-neutral-750">
                {pText}
              </p>
            )
          )}
        </div>

        {!isExpanded && paragraphs.length > 2 && (
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
        )}
      </div>

      {paragraphs.length > 2 && (
        <div className="flex justify-center pt-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            type="button"
            className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold px-6 py-2.5 rounded-full transition-all shadow-sm hover:shadow-md cursor-pointer active:scale-95"
          >
            <span>{isExpanded ? "Show Less" : "View More"}</span>
            <FiChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      )}

      <div className="flex items-center justify-between border-y border-neutral-150 py-4 my-8">
        <button
          onClick={handleLikePost}
          type="button"
          className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold transition-all ${
            postLiked
              ? "bg-red-50/50 border-red-200 text-[#dc2626]"
              : "bg-white border-neutral-200 text-neutral-650 hover:bg-neutral-50"
          }`}
        >
          {postLiked ? <FaHeart /> : <FaRegHeart />}
          <span>{post.likes} Likes</span>
        </button>

        <button
          onClick={handleShare}
          type="button"
          className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 text-neutral-650 hover:bg-neutral-50 rounded-full text-sm font-semibold transition-all"
        >
          <FaShareAlt />
          Share Post
        </button>
      </div>

      {post.comments && (
        <div className="space-y-6 pt-4">
          <h3 className="text-xl font-heading font-extrabold text-neutral-900 border-b border-neutral-200 pb-2">
            Comments ({post.comments.length})
          </h3>

          <form
            onSubmit={() => {}}
            className="bg-neutral-50 border border-neutral-200 rounded-lg p-5 space-y-4"
          >
            <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest">
              Join the conversation
            </h4>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                required
                value={""}
                // onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-3.5 py-2 bg-white border border-neutral-250 rounded-md text-sm text-neutral-800 placeholder-neutral-450 focus:outline-none focus:border-neutral-450 transition-all shadow-xs"
              />
              <textarea
                placeholder="Write your comment..."
                required
                rows={3}
                value={""}
                // onChange={(e) => setCommentText(e.target.value)}
                className="w-full px-3.5 py-2 bg-white border border-neutral-250 rounded-md text-sm text-neutral-800 placeholder-neutral-450 focus:outline-none focus:border-neutral-450 transition-all shadow-xs"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs font-semibold px-5 py-2.5 rounded-md transition-colors shadow-sm"
            >
              Post Comment
            </button>
          </form>

          <div className="space-y-4 pt-2">
            {post.comments.map((comment) => (
              <div
                key={comment._id}
                className="flex gap-4 p-4 border border-neutral-200 rounded-lg bg-white shadow-2xs"
              >
                <div className="h-8 w-8 rounded-full bg-red-50 flex items-center justify-center text-[#dc2626] font-bold text-xs uppercase shrink-0">
                  {comment.name.charAt(0)}
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-bold text-neutral-850">
                      {comment.name}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-medium">
                      {comment.createdAt}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-normal">
                    {comment.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

export default PostDetail;
