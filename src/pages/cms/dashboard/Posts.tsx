import { useState, useMemo } from "react";
import { 
  FiSearch, 
  FiPlus, 
  FiEdit, 
  FiTrash2, 
  FiMoreVertical 
} from "react-icons/fi";
import { allPosts } from "../../../data";

const Posts = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Get unique categories for filtering
  const categories = useMemo(() => {
    const cats = allPosts.map(p => p.category.name);
    return ["all", ...Array.from(new Set(cats))];
  }, []);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchesSearch = 
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.category.name.toLowerCase().includes(search.toLowerCase());
      
      const matchesStatus = 
        statusFilter === "all" || post.status === statusFilter;
        
      const matchesCategory = 
        categoryFilter === "all" || post.category.name === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [search, statusFilter, categoryFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage) || 1;
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPosts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPosts, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const formatDate = (dateStr: string) => {
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
          onClick={() => console.log("Add new post")}
          className="flex items-center justify-center gap-2 bg-[#b91c1c] hover:bg-[#991b1b] text-white py-2 px-4 rounded-lg text-xs font-semibold shadow-xs transition-all duration-200 self-start sm:self-auto"
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
            {categories.filter(c => c !== "all").map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as any);
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
              {paginatedPosts.length > 0 ? (
                paginatedPosts.map((post) => (
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
                      <span className="font-medium text-neutral-650">{post.category.name}</span>
                    </td>
                    <td className="px-6 py-4 text-neutral-500 font-medium">
                      {post.author}
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
                      {post.views.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-neutral-500 font-medium">
                      {formatDate(post.publishedAt)}
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
                    No posts found matching the filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Pagination footer */}
        {filteredPosts.length > 0 && (
          <div className="border-t border-neutral-200/60 px-6 py-4 flex items-center justify-between text-2xs text-neutral-500 font-medium">
            <span>
              Showing {Math.min(filteredPosts.length, (currentPage - 1) * itemsPerPage + 1)}-
              {Math.min(filteredPosts.length, currentPage * itemsPerPage)} of {filteredPosts.length} posts
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
    </div>
  );
};

export default Posts;
