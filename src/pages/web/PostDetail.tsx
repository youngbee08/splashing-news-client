import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { allPosts } from "../../data";

interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
}

const PostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = allPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-heading font-bold text-neutral-800">Article Not Found</h2>
        <p className="text-neutral-500">The news story you are looking for does not exist or has been archived.</p>
        <Link to="/" className="inline-block bg-[#dc2626] hover:bg-[#b91c1c] text-white text-sm font-semibold px-6 py-2 rounded-md transition-colors shadow-sm">
          Return Home
        </Link>
      </div>
    );
  }

  // Interactive Likes State
  const [likes, setLikes] = useState(Math.floor(post.views / 15) + 12);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = () => {
    if (hasLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setHasLiked(!hasLiked);
  };

  // Interactive Comments State
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "comment-1",
      author: "Douglas Vance",
      text: "This is a critical piece of legislation that could define national infrastructure standards for decades. The focus on regional compliance audits was a necessary compromise.",
      date: "2 hours ago",
    },
    {
      id: "comment-2",
      author: "Evelyn Sterling",
      text: "Appreciate the depth of coverage here. Expanding telemedicine grants in rural areas is long overdue.",
      date: "1 hour ago",
    },
  ]);

  const [authorName, setAuthorName] = useState("");
  const [commentText, setCommentText] = useState("");

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) return;

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author: authorName,
      text: commentText,
      date: "Just now",
    };

    setComments([newComment, ...comments]);
    setAuthorName("");
    setCommentText("");
  };

  // Web Share API with Clipboard Fallback
  const [showToast, setShowToast] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      })
      .catch((err) => console.log("Error sharing:", err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  // Split content by newline to render proper paragraphs
  const paragraphs = post.content.split("\n\n");

  return (
    <article className="max-w-3xl mx-auto space-y-8 relative">
      
      {/* Toast Alert for Clipboard Share Link */}
      {showToast && (
        <div className="fixed bottom-5 right-5 bg-neutral-900 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-lg border border-neutral-800 z-50 animate-bounce flex items-center gap-2">
          <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Link copied to clipboard!
        </div>
      )}

      {/* Header Info */}
      <div className="space-y-4">
        <Link
          to={`/${post.category.slug}`}
          className="inline-block bg-[#dc2626]/10 text-[#dc2626] text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.75 rounded-sm hover:bg-[#dc2626]/20 transition-colors"
        >
          {post.category.name}
        </Link>
        <h1 className="text-3xl sm:text-4.5xl font-heading font-black text-neutral-900 leading-tight">
          {post.title}
        </h1>
        <p className="text-neutral-500 text-base leading-relaxed font-medium">
          {post.excerpt}
        </p>

        {/* Metadata Details */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-y border-neutral-150 py-3 mt-6 text-xs text-neutral-450 font-semibold">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-600 font-bold text-xs uppercase">
              {post.author.charAt(0)}
            </div>
            <div>
              <span className="text-neutral-800 block">{post.author}</span>
              <span className="font-medium text-[10px]">{post.readingTime}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span>Views: {post.views}</span>
            <span>Published: {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="overflow-hidden rounded-xl shadow-xs border border-neutral-100 aspect-[16/9] bg-neutral-50">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="text-neutral-800 text-base sm:text-lg leading-relaxed font-body space-y-6">
        {paragraphs.map((pText, idx) => (
          <p key={idx} className="font-normal text-neutral-750">
            {pText}
          </p>
        ))}
      </div>

      {/* Action Row: Like and Share */}
      <div className="flex items-center justify-between border-y border-neutral-150 py-4 my-8">
        
        {/* Like Button */}
        <button
          onClick={handleLike}
          type="button"
          className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold transition-all ${
            hasLiked
              ? "bg-red-50/50 border-red-200 text-[#dc2626]"
              : "bg-white border-neutral-200 text-neutral-650 hover:bg-neutral-50"
          }`}
        >
          {hasLiked ? (
            <svg className="h-5 w-5 fill-current text-[#dc2626]" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          )}
          <span>{likes} Likes</span>
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          type="button"
          className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 text-neutral-650 hover:bg-neutral-50 rounded-full text-sm font-semibold transition-all"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 10.742l4.622-2.311m0 0a3 3 0 10-2.671-1.857L6 8.89m6.914.01l-4.622 2.311m0 0a3 3 0 102.67 1.858L18 12.89" />
          </svg>
          Share Article
        </button>

      </div>

      {/* 5. Comments Section */}
      <div className="space-y-6 pt-4">
        <h3 className="text-xl font-heading font-extrabold text-neutral-900 border-b border-neutral-200 pb-2">
          Comments ({comments.length})
        </h3>

        {/* Submit Comment Form */}
        <form onSubmit={handleCommentSubmit} className="bg-neutral-50 border border-neutral-200 rounded-lg p-5 space-y-4">
          <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest">
            Join the conversation
          </h4>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              required
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full px-3.5 py-2 bg-white border border-neutral-250 rounded-md text-sm text-neutral-800 placeholder-neutral-450 focus:outline-none focus:border-neutral-450 transition-all shadow-xs"
            />
            <textarea
              placeholder="Write your comment..."
              required
              rows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
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

        {/* Comments Feed */}
        <div className="space-y-4 pt-2">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4 p-4 border border-neutral-200 rounded-lg bg-white shadow-2xs">
              <div className="h-8 w-8 rounded-full bg-red-50 flex items-center justify-center text-[#dc2626] font-bold text-xs uppercase shrink-0">
                {comment.author.charAt(0)}
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold text-neutral-850">{comment.author}</span>
                  <span className="text-[10px] text-neutral-400 font-medium">{comment.date}</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 leading-normal">
                  {comment.text}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

    </article>
  );
};

export default PostDetail;
