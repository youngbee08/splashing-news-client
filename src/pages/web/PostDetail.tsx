import { useParams, Link } from "react-router-dom";
import { usePostContext } from "../../hooks/UsePostContext";
import type { Post } from "../../types/generalTypes";
import { toast } from "sonner";
import { FaHeart, FaRegHeart, FaShareAlt } from "react-icons/fa";
import { useState } from "react";

const PostDetail = () => {
  const [postLiked, setPostLiked] = useState(false);
  const { slug } = useParams<{ slug: string }>();
  const { postsData, likePost } = usePostContext();
  const postsList: Post[] = Array.isArray(postsData?.data)
    ? postsData.data
    : [];

  const post = postsList.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-heading font-bold text-neutral-800">
          Article Not Found
        </h2>
        <p className="text-neutral-500">
          The news story you are looking for does not exist or has been
          archived.
        </p>
        <Link
          to="/"
          className="inline-block bg-[#dc2626] hover:bg-[#b91c1c] text-white text-sm font-semibold px-6 py-2 rounded-md transition-colors shadow-sm"
        >
          Return Home
        </Link>
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

  const handleLikePost = ()=>{
    setPostLiked(true)
    likePost({ id: post._id, action: "like" });
  }

  const paragraphs = post.content.split("\n\n");

  return (
    <article className="max-w-3xl mx-auto space-y-8 relative">
      <div className="space-y-4">
        <Link
          to={`/${post.category?.slug || "news"}`}
          className="inline-block bg-[#dc2626]/10 text-[#dc2626] text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.75 rounded-sm hover:bg-[#dc2626]/20 transition-colors"
        >
          {post.category?.name ||
            (typeof post.category === "string" ? post.category : "General")}
        </Link>
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

      <div className="text-neutral-800 text-base sm:text-lg leading-relaxed font-body space-y-6">
        {paragraphs.map((pText: string, idx: number) => (
          <p key={idx} className="font-normal text-neutral-750">
            {pText}
          </p>
        ))}
      </div>

      <div className="flex items-center justify-between border-y border-neutral-150 py-4 my-8">
        {/* Like Button */}
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
          Share Article
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
