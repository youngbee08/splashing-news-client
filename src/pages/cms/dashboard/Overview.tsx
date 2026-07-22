import { FiFileText, FiEye, FiZap, FiMoreVertical } from "react-icons/fi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdArrowOutward, MdEditDocument } from "react-icons/md";
import { LuHeartHandshake } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useUserContext } from "../../../hooks/UseUserContext";
import { usePostsQuery } from "../../../hooks/usePostQueries";

const Overview = () => {
  const { dashboardMetrics: contextMetrics } = useUserContext();
  const savedMetrics = localStorage.getItem("dashboardMetrics");
  const parsedMetrics = JSON.parse(savedMetrics ? savedMetrics : "");

  const dashboardMetrics = parsedMetrics || contextMetrics;
  const { data: recentPostsData, isLoading: isRecentLoading } = usePostsQuery({
    limit: 5,
  });

  const recentPosts = recentPostsData?.data || [];

  const stats = [
    {
      label: "Total Posts",
      value: dashboardMetrics.totalPosts?.toLocaleString() || 0,
      icon: <FiFileText className="w-2 h-2 sm:w-3 sm:h-3 text-primary" />,
      iconBg: "bg-red-50 text-[#b91c1c] border border-red-100/80",
      accentBorder: "border-t-2 border-t-red-600",
    },
    {
      label: "Total Views",
      value: dashboardMetrics.totalViews?.toLocaleString() || 0,
      icon: <FiEye className="w-2 h-2 sm:w-3 sm:h-3 text-sky-600" />,
      iconBg: "bg-sky-50 text-sky-600 border border-sky-100/80",
      accentBorder: "border-t-2 border-t-sky-600",
    },
    {
      label: "Categories",
      value: dashboardMetrics.totalCategories?.toLocaleString() || 0,
      icon: <FiZap className="w-2 h-2 sm:w-3 sm:h-3 text-amber-600" />,
      iconBg: "bg-amber-50 text-amber-600 border border-amber-100/80",
      accentBorder: "border-t-2 border-t-amber-600",
    },
    {
      label: "Published",
      value: dashboardMetrics.publishedPosts?.toLocaleString() || 0,
      icon: (
        <IoDocumentTextOutline className="w-2 h-2 sm:w-3 sm:h-3 text-emerald-600" />
      ),
      iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-100/80",
      accentBorder: "border-t-2 border-t-emerald-600",
    },
    {
      label: "Drafts",
      value: dashboardMetrics.draftPosts?.toLocaleString() || 0,
      icon: (
        <MdEditDocument className="w-2 h-2 sm:w-3 sm:h-3 text-purple-600" />
      ),
      iconBg: "bg-purple-50 text-purple-600 border border-purple-100/80",
      accentBorder: "border-t-2 border-t-purple-600",
    },
    {
      label: "Total Likes",
      value: dashboardMetrics.totalLikes?.toLocaleString() || 0,
      icon: (
        <LuHeartHandshake className="w-2 h-2 sm:w-3 sm:h-3 text-rose-600" />
      ),
      iconBg: "bg-rose-50 text-rose-600 border border-rose-100/80",
      accentBorder: "border-t-2 border-t-rose-600",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto pb-8">
      <div className="pb-6">
        <h1 className="font-serif font-black text-2xl text-neutral-900 tracking-tight leading-tight">
          Overview
        </h1>
        <p className="text-xs text-neutral-500 font-medium mt-1">
          Good day, Administrator. Here is your publication analytics breakdown.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-5 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`relative bg-white border border-neutral-200/70 rounded-lg p-4 sm:p-5 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-200 group ${stat.accentBorder}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-neutral-500 truncate">
                {stat.label}
              </span>

              <div
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${stat.iconBg}`}
              >
                {stat.icon}
              </div>
            </div>

            <div>
              <p className="font-serif font-black text-base sm:text-lg text-neutral-900">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-neutral-200/60 rounded-xl p-5 sm:p-6 shadow-2xs">
        <div className="flex items-center justify-between mb-5 border-b border-neutral-150 pb-4">
          <div>
            <h2 className="font-serif font-black text-lg text-neutral-900 tracking-tight">
              Recent Articles
            </h2>
            <p className="text-xs text-neutral-500 font-medium">
              Latest stories updated on Splashing News.
            </p>
          </div>
          <Link
            to="/admin/posts"
            className="text-xs font-semibold text-[#b91c1c] hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <span>
              <MdArrowOutward/>
            </span>
          </Link>
        </div>

        {isRecentLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 py-3 animate-pulse"
              >
                <div className="w-12 h-12 rounded-lg bg-neutral-200 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-neutral-200 rounded-md w-3/4" />
                  <div className="h-3 bg-neutral-200 rounded-md w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : recentPosts.length > 0 ? (
          <div className="divide-y divide-neutral-150">
            {recentPosts.map((post) => (
              <div
                key={post._id}
                className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0 group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg object-cover bg-neutral-100 shrink-0 border border-neutral-200"
                  />
                  <div className="min-w-0">
                    <Link
                      to={`/post/${post.slug}`}
                      className="text-xs sm:text-sm font-semibold text-neutral-900 truncate hover:text-[#b91c1c] transition-colors block"
                    >
                      {post.title}
                    </Link>
                    <span className="text-[10px] font-medium text-neutral-450 uppercase block mt-0.5">
                      {typeof post.category === "object"
                        ? post.category?.name
                        : post.category || "General"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full capitalize ${
                      post.status === "published"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {post.status}
                  </span>
                  <Link
                    to={`/post/${post.slug}`}
                    className="p-1.5 hover:bg-neutral-100 rounded-lg text-neutral-400 hover:text-neutral-700 transition-colors"
                  >
                    <FiMoreVertical className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-neutral-450">
            No recent posts found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Overview;
