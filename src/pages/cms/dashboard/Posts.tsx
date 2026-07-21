import { useState, useEffect } from "react";
import { 
  FiSearch, 
  FiPlus, 
  FiEdit, 
  FiTrash2, 
  FiMoreVertical 
} from "react-icons/fi";
import { usePostContext } from "../../../hooks/UsePostContext";
import Modal from "../../../components/modals/Modal";
import { toast } from "sonner";
import CardSkeleton from "../../../components/skeletons/CardSkeleton";
import type { Post } from "../../../types/generalTypes";

const Posts = () => {
  const {
    postsData,
    isPostsLoading,
    categories,
    setPostsParams,
    createPost,
    isCreatingPost,
    uploadMedia,
  } = usePostContext();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Create Modal Form States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("");
  const [newPostStatus, setNewPostStatus] = useState<"draft" | "published">("published");
  const [imageUrl, setImageUrl] = useState("");
  const [imageUploading, setImageUploading] = useState(false);

  // Sync component filter states with Context query parameters
  useEffect(() => {
    setPostsParams((prev) => ({
      ...prev,
      page: currentPage,
      limit: itemsPerPage,
      search,
      category: categoryFilter === "all" ? "" : categoryFilter,
    }));
  }, [search, categoryFilter, currentPage, setPostsParams]);

  // Clientside status filter fallback (since status might not be filtered on the backend)
  const postsList: Post[] = Array.isArray(postsData?.data) ? postsData.data : [];

  const finalPosts = postsList.filter((post) => {
    return statusFilter === "all" || post.status === statusFilter;
  });

  const totalPages = postsData?.pagination.totalPages || 1;
  const totalCount = postsData?.pagination.total || postsList.length || 0;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setImageUploading(true);
      const res = await uploadMedia(file);
      setImageUrl(res.url);
      toast.success("Image uploaded successfully");
    } catch (err) {
      toast.error("Failed to upload image");
      console.error(err);
    } finally {
      setImageUploading(false);
    }
  };

  const handleCreatePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle || !newPostContent || !newPostCategory) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await createPost({
        title: newPostTitle,
        content: newPostContent,
        category: newPostCategory,
        status: newPostStatus,
        featuredImage: imageUrl || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600",
      });

      toast.success("Post created successfully");
      setIsCreateModalOpen(false);
      // Reset form
      setNewPostTitle("");
      setNewPostContent("");
      setNewPostCategory("");
      setNewPostStatus("published");
      setImageUrl("");
    } catch (err) {
      toast.error("Failed to create post");
      console.error(err);
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
      {/* Page Header */}
      <div className="pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif font-black text-2xl text-neutral-900 tracking-tight leading-tight">Posts</h1>
          <p className="text-xs text-neutral-500 font-medium mt-1">Manage your Splashing News published and draft articles here.</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-[#b91c1c] hover:bg-[#991b1b] text-white py-2 px-4 rounded-lg text-xs font-semibold shadow-xs transition-all duration-200 self-start sm:self-auto cursor-pointer"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add New Post</span>
        </button>
      </div>

      {/* Control bar */}
      <div className="bg-white border border-neutral-200/50 rounded-lg p-4 mb-6 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
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

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-white border border-neutral-200 rounded-lg text-xs font-medium px-3 py-2 text-neutral-700 focus:outline-none focus:border-neutral-400 cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories?.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as "all" | "published" | "draft");
              setCurrentPage(1);
            }}
            className="bg-white border border-neutral-200 rounded-lg text-xs font-medium px-3 py-2 text-neutral-700 focus:outline-none focus:border-neutral-400 cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white border border-neutral-200/50 rounded-lg shadow-xs overflow-hidden">
        {isPostsLoading ? (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
            <CardSkeleton variant="politics" />
            <CardSkeleton variant="politics" />
            <CardSkeleton variant="politics" />
            <CardSkeleton variant="politics" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-200/60 bg-neutral-50/50 text-2xs font-semibold text-neutral-400 uppercase tracking-widest">
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
                {finalPosts.length > 0 ? (
                  finalPosts.map((post) => (
                    <tr key={post._id} className="hover:bg-neutral-50/40 transition-colors duration-150">
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
                            <p className="text-3xs font-mono text-neutral-400 truncate max-w-xs">{post.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-neutral-650">
                          {typeof post.category === "object" ? post.category?.name : (post.category || "Uncategorized")}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-neutral-500 font-medium">
                        {typeof post.author === "object"
                          ? post.author?.fullname || post.author?.name || "Admin"
                          : post.author || "Admin"}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-2xs font-semibold px-2 py-0.5 rounded-full ${
                          post.status === "published" 
                            ? "bg-green-50 text-green-700" 
                            : "bg-red-50 text-red-700"
                        }`}>
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
                          <button className="p-1.5 hover:bg-neutral-100 rounded-lg text-neutral-500 hover:text-[#b91c1c] transition-colors" title="Edit Post">
                            <FiEdit className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1.5 hover:bg-neutral-100 rounded-lg text-neutral-500 hover:text-red-700 transition-colors" title="Delete Post">
                            <FiTrash2 className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1.5 hover:bg-neutral-100 rounded-lg text-neutral-400 hover:text-neutral-700 transition-colors">
                            <FiMoreVertical className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-neutral-450 font-medium">
                      No posts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Table Pagination footer */}
        {!isPostsLoading && totalCount > 0 && (
          <div className="border-t border-neutral-200/60 px-6 py-4 flex items-center justify-between text-2xs text-neutral-500 font-medium">
            <span>
              Showing {Math.min(totalCount, (currentPage - 1) * itemsPerPage + 1)}-
              {Math.min(totalCount, currentPage * itemsPerPage)} of {totalCount} posts
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-3 py-1.5 border border-neutral-250 rounded-lg hover:bg-neutral-50 hover:text-neutral-700 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-neutral-500 transition-colors cursor-pointer"
              >
                Previous
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-3 py-1.5 border border-neutral-250 rounded-lg hover:bg-neutral-50 hover:text-neutral-700 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-neutral-500 transition-colors cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create Post Modal */}
      {isCreateModalOpen && (
        <Modal onClose={() => setIsCreateModalOpen(false)}>
          <div className="max-h-[80vh] overflow-y-auto pr-2">
            <h3 className="font-serif font-black text-xl text-neutral-900 mb-4">Create New Post</h3>
            
            <form onSubmit={handleCreatePostSubmit} className="space-y-4 text-xs font-body">
              <div>
                <label className="block text-neutral-600 font-bold mb-1 uppercase tracking-wider">Title</label>
                <input
                  type="text"
                  required
                  value={newPostTitle}
                  onChange={e => setNewPostTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 text-sm"
                  placeholder="Enter post title"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-600 font-bold mb-1 uppercase tracking-wider">Category</label>
                  <select
                    required
                    value={newPostCategory}
                    onChange={e => setNewPostCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 text-sm cursor-pointer"
                  >
                    <option value="">Select a Category</option>
                    {categories?.map(cat => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-600 font-bold mb-1 uppercase tracking-wider">Status</label>
                  <select
                    value={newPostStatus}
                    onChange={e => setNewPostStatus(e.target.value as "draft" | "published")}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 text-sm cursor-pointer"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-neutral-600 font-bold mb-1 uppercase tracking-wider">Featured Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm cursor-pointer"
                />
                {imageUploading && <p className="text-neutral-500 mt-1 animate-pulse">Uploading image to Cloudinary...</p>}
                {imageUrl && <p className="text-green-600 mt-1">✓ Image uploaded successfully!</p>}
              </div>

              <div>
                <label className="block text-neutral-600 font-bold mb-1 uppercase tracking-wider">Content</label>
                <textarea
                  required
                  rows={5}
                  value={newPostContent}
                  onChange={e => setNewPostContent(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 text-sm"
                  placeholder="Enter post content..."
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 font-medium transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreatingPost || imageUploading}
                  className="px-4 py-2 bg-[#b91c1c] hover:bg-[#991b1b] text-white rounded-lg font-medium transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {isCreatingPost ? "Creating..." : "Create Post"}
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Posts;


