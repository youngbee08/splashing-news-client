import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiChevronDown,
  FiLogOut,
  FiX,
  FiLoader,
} from "react-icons/fi";
import { useUserContext } from "../../../hooks/UseUserContext";
import { usePostsQuery } from "../../../hooks/usePostQueries";

const TopNav = () => {
  const navigate = useNavigate();
  const { user, logout } = useUserContext();

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const { data: searchResultsData, isLoading: isSearchLoading } = usePostsQuery(
    searchQuery.trim() ? { search: searchQuery.trim(), limit: 6 } : undefined,
  );

  const postsList = searchResultsData?.data || [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectPost = (slug: string) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    navigate(`/post/${slug}`);
  };

  return (
    <header className="h-16 lg:h-20 flex items-center justify-between gap-3 px-4 sm:px-8 bg-white/80 backdrop-blur-md sticky top-0 z-30 flex-shrink-0 border-b border-neutral-100 lg:border-none">
      <div className="flex items-center gap-3 lg:hidden">
        <span className="font-serif font-black text-lg text-neutral-900 tracking-tight">
          Admin Console
        </span>
      </div>

      <div className="flex items-center justify-end lg:w-full gap-3 sm:gap-5">
        <div
          ref={searchContainerRef}
          className="hidden relative lg:flex-1 max-w-[200px] sm:max-w-xs md:w-80"
        >
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
              <FiSearch className="w-4 h-4" />
            </span>
            <input
              // type="search"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              className="w-full pl-9 pr-8 py-1.5 sm:py-2 bg-[#f0f4f9] border border-transparent rounded-lg text-xs sm:text-sm text-neutral-800 placeholder-neutral-450 focus:outline-none focus:bg-white focus:border-neutral-300 focus:ring-2 focus:ring-blue-500/10 transition-all duration-200"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setIsSearchOpen(false);
                }}
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-neutral-400 hover:text-neutral-600 cursor-pointer"
              >
                <FiX className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {isSearchOpen && searchQuery.trim().length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-neutral-200 rounded-lg shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/60 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                <span>Search Results</span>
                {isSearchLoading && (
                  <FiLoader className="w-3.5 h-3.5 animate-spin text-[#b91c1c]" />
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-neutral-100">
                {isSearchLoading ? (
                  <div className="p-4 space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 animate-pulse"
                      >
                        <div className="w-10 h-10 rounded-lg bg-neutral-200 shrink-0" />
                        <div className="space-y-1.5 flex-1">
                          <div className="h-3.5 bg-neutral-200 rounded-lg w-3/4" />
                          <div className="h-2.5 bg-neutral-200 rounded-lg w-1/3" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : postsList.length > 0 ? (
                  postsList.map((post) => (
                    <button
                      key={post._id}
                      onClick={() => handleSelectPost(post.slug)}
                      className="w-full flex items-center gap-3 p-3 hover:bg-neutral-50/80 text-left transition-colors cursor-pointer group"
                    >
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-10 h-10 rounded-lg object-cover flex-shrink-0 bg-neutral-100 border border-neutral-150"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-semibold text-neutral-800 group-hover:text-[#b91c1c] truncate leading-snug">
                          {post.title}
                        </h4>
                        <span className="text-[10px] text-neutral-450 uppercase font-medium mt-0.5 block truncate">
                          {typeof post.category === "object"
                            ? post.category?.name
                            : post.category || "General"}
                        </span>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-6 text-center text-xs text-neutral-450">
                    No articles found matching "{searchQuery}"
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="relative flex items-center pl-1 sm:pl-2">
          <button
            onClick={() => setIsProfileDropdownOpen((prev) => !prev)}
            className="flex items-center gap-1.5 p-1 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer focus:outline-none"
            aria-expanded={isProfileDropdownOpen}
            aria-label="User Profile Menu"
          >
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&fit=crop&q=60"
              alt="Administrator Avatar"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-gray-300 shadow-xs"
            />
            <FiChevronDown
              className={`w-4 h-4 text-neutral-500 transition-transform duration-200 ${
                isProfileDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isProfileDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsProfileDropdownOpen(false)}
              />

              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-neutral-200 rounded-lg shadow-lg py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 py-2 border-b border-neutral-100">
                  <p className="text-xs font-semibold text-neutral-900 truncate">
                    {user?.fullname || "Administrator"}
                  </p>
                  <p className="text-[10px] text-neutral-500 truncate">
                    {user?.email || "admin@splashingnews.ng"}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsProfileDropdownOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-red-700 hover:bg-red-50 transition-colors cursor-pointer text-left"
                >
                  <FiLogOut className="w-4 h-4 text-red-700" />
                  <span>Sign Out</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNav;
