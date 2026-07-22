import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiPlus,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";
import { usePostContext } from "../../../hooks/UsePostContext";
import type { Post } from "../../../types/generalTypes";
import { PostsTableSkeleton } from "../../../components/skeletons/TableSkeeton";
import EditPostModal from "../../../components/modals/EditPostModal";
import DeletePostModal from "../../../components/modals/DeletePostModal";

const Posts = () => {
  const navigate = useNavigate();
  const { postsData, isPostsLoading, categories, setPostsParams } =
    usePostContext();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "published" | "drafts"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [selectedEditPost, setSelectedEditPost] = useState<Post | null>(null);
  const [selectedDeletePost, setSelectedDeletePost] = useState<Post | null>(null);

  useEffect(() => {
    setPostsParams((prev) => ({
      ...prev,
      page: currentPage,
      limit: itemsPerPage,
      search,
      category: categoryFilter === "all" ? "" : categoryFilter,
      status: statusFilter,
    }));
  }, [search, categoryFilter, currentPage, setPostsParams, statusFilter]);

  const postsList: Post[] = Array.isArray(postsData?.data)
    ? postsData.data
    : [];

  const totalPages = postsData?.pagination.totalPages || 1;
  const totalCount = postsData?.pagination.total || postsList.length || 0;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif font-black text-2xl text-neutral-900 tracking-tight leading-tight">
            Posts
          </h1>
          <p className="text-xs text-neutral-500 font-medium mt-1">
            Manage your Splashing News published and draft articles here.
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/add-post")}
          className="flex items-center justify-center gap-2 bg-[#b91c1c] hover:bg-[#991b1b] text-white py-2 px-4 rounded-lg text-xs font-semibold shadow-xs transition-all duration-200 self-start sm:self-auto cursor-pointer"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add New Post</span>
        </button>
      </div>

      <div className="bg-white border border-neutral-200/50 rounded-lg p-4 mb-6 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
            <FiSearch className="w-4 h-4" />
          </span>
          <input
            type="search"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-800 placeholder-neutral-450 focus:outline-none focus:bg-white focus:border-neutral-400 transition-all duration-200"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-white border border-neutral-200 rounded-lg text-xs font-medium px-3 py-2 text-neutral-700 focus:outline-none focus:border-neutral-400 cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories?.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as "all" | "published" | "drafts");
              setCurrentPage(1);
            }}
            className="bg-white border border-neutral-200 rounded-lg text-xs font-medium px-3 py-2 text-neutral-700 focus:outline-none focus:border-neutral-400 cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="drafts">Drafts</option>
          </select>
        </div>
      </div>

      <div className="bg-white border border-neutral-200/50 rounded-lg shadow-xs overflow-hidden">
        {isPostsLoading ? (
          <PostsTableSkeleton />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-200/60 bg-neutral-50/50 text-xs! text-neutral-400 uppercase">
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Author</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Views</th>
                  <th className="px-6 py-4">Published Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200/60 text-xs text-neutral-700">
                {postsList.length > 0 ? (
                  postsList.map((post) => (
                    <tr
                      key={post._id}
                      className="hover:bg-neutral-50/40 transition-colors duration-150"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="w-10 h-10 rounded-lg object-cover bg-neutral-100 flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <h4 className="font-semibold text-neutral-900 truncate hover:text-[#b91c1c] cursor-pointer transition-colors max-w-xs md:max-w-sm">
                              {post.title}
                            </h4>
                            <p className="text-3xs font-mono text-neutral-400 truncate max-w-xs">
                              {post.slug}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-neutral-650">
                          {typeof post.category === "object"
                            ? post.category?.name
                            : post.category || "Uncategorized"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-neutral-500 font-medium">
                        {typeof post.author === "object"
                          ? post.author?.fullname ||
                            post.author?.name ||
                            "Admin"
                          : post.author || "Admin"}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-2xs font-semibold px-2 py-0.5 rounded-full capitalize ${
                            post.status === "published"
                              ? "bg-green-50 text-green-700"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          {post.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono font-medium text-neutral-500">
                        {post.views?.toLocaleString() || 0}
                      </td>
                      <td className="px-6 py-4 text-neutral-500 font-medium">
                        {formatDate(post.publishedAt || post.createdAt)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedEditPost(post)}
                            className="p-1.5 hover:bg-neutral-100 rounded-lg text-neutral-500 hover:text-[#b91c1c] transition-colors cursor-pointer"
                            title="Edit Post"
                          >
                            <FiEdit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setSelectedDeletePost(post)}
                            className="p-1.5 hover:bg-neutral-100 rounded-lg text-neutral-500 hover:text-red-700 transition-colors cursor-pointer"
                            title="Delete Post"
                          >
                            <FiTrash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-12 text-center text-neutral-450 font-medium"
                    >
                      No posts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {!isPostsLoading && totalCount > 0 && (
          <div className="border-t border-neutral-200/60 px-6 py-4 flex items-center justify-between text-xs text-neutral-500 font-medium">
            <span>
              Showing{" "}
              {Math.min(totalCount, (currentPage - 1) * itemsPerPage + 1)}-
              {Math.min(totalCount, currentPage * itemsPerPage)} of {totalCount}{" "}
              posts
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-3 py-1.5 border border-neutral-250 rounded-lg hover:bg-neutral-50 hover:text-neutral-700 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-neutral-500 transition-colors cursor-pointer text-xs"
              >
                Previous
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-3 py-1.5 border border-neutral-250 rounded-lg hover:bg-neutral-50 hover:text-neutral-700 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-neutral-500 transition-colors cursor-pointer text-xs"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      <EditPostModal
        post={selectedEditPost}
        isOpen={!!selectedEditPost}
        onClose={() => setSelectedEditPost(null)}
      />

      <DeletePostModal
        post={selectedDeletePost}
        isOpen={!!selectedDeletePost}
        onClose={() => setSelectedDeletePost(null)}
      />
    </div>
  );
};

export default Posts;
