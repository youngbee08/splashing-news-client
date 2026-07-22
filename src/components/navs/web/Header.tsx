import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { FiX, FiLoader } from "react-icons/fi";
import { usePostContext } from "../../../hooks/UsePostContext";
import { usePostsQuery } from "../../../hooks/usePostQueries";

const Header = () => {
  const navigate = useNavigate();
  const { categories } = usePostContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Live Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  // Fetch search results from API when searchQuery is present
  const { data: searchResultsData, isLoading: isSearchLoading } = usePostsQuery(
    searchQuery.trim() ? { search: searchQuery.trim(), limit: 6 } : undefined,
  );

  const postsList = searchResultsData?.data || [];

  // Close search dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const insideDesktop = desktopSearchRef.current?.contains(target);
      const insideMobile = mobileSearchRef.current?.contains(target);

      if (!insideDesktop && !insideMobile) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectPost = (slug: string) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setIsMobileMenuOpen(false);
    navigate(`/post/${slug}`);
  };

  const baseNavItems = [
    { name: "Home", path: "/" },
    { name: "News", path: "/news" },
  ];

  const categoryItems =
    Array.isArray(categories) && categories.length > 0
      ? categories
          .slice(0, 4)
          .filter((cat) => cat.isActive !== false)
          .map((cat) => ({
            name: cat.name,
            path: `/articles/${cat.slug || cat.name.toLowerCase()}`,
          }))
      : [];

  const webNavItems = [...baseNavItems, ...categoryItems];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium tracking-wide transition-all duration-200 py-1.5 px-0.5 border-b-2 ${
      isActive
        ? "text-[#dc2626] border-[#dc2626] font-bold"
        : "text-neutral-650 border-transparent hover:text-[#dc2626] hover:border-neutral-350"
    }`;

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo and Nav links */}
          <div className="flex items-center gap-10">
            <Link
              to="/"
              className="font-heading font-black text-xl sm:text-2xl tracking-tight flex items-center hover:opacity-90 transition-opacity"
            >
              <span className="text-neutral-900">Splashing</span>
              <span className="text-[#dc2626] ml-1.5">News</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {webNavItems.map((link) => (
                <NavLink key={link.name} to={link.path} className={linkClass}>
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Search bar & Utility Icons */}
          <div className="flex items-center gap-4">
            {/* Desktop Search Input & Dropdown */}
            <div ref={desktopSearchRef} className="relative hidden sm:block">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                <IoIosSearch className="w-4 h-4" />
              </span>
              <input
                // type="search"
                placeholder="Search splashing news..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                className="pl-10 pr-8 py-1.5 w-56 sm:w-64 bg-neutral-50 border border-neutral-250 rounded-full text-xs font-medium text-neutral-800 placeholder-neutral-450 focus:outline-none focus:border-neutral-400 focus:bg-white focus:ring-1 focus:ring-neutral-400/20 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setIsSearchOpen(false);
                  }}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600 cursor-pointer"
                >
                  <FiX className="w-3.5 h-3.5" />
                </button>
              )}

              {isSearchOpen && searchQuery.trim().length > 0 && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-neutral-200 rounded-lg shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/60 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                    <span>Search Results</span>
                    {isSearchLoading && (
                      <FiLoader className="w-3.5 h-3.5 animate-spin text-[#dc2626]" />
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
                            <h4 className="text-xs font-semibold text-neutral-800 group-hover:text-[#dc2626] truncate leading-snug">
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

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="p-2 text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50 rounded-lg md:hidden transition-colors cursor-pointer"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden border-t border-neutral-100 bg-white"
          id="mobile-menu"
        >
          <div className="px-4 pt-2 pb-4 space-y-1">
            {/* Mobile Search Input & Live Results Dropdown */}
            <div ref={mobileSearchRef} className="relative mb-4 mt-1">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                <IoIosSearch className="w-4 h-4" />
              </span>
              <input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                className="pl-9 pr-8 py-2 w-full bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-800 placeholder-neutral-500 focus:outline-none focus:border-neutral-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setIsSearchOpen(false);
                  }}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600 cursor-pointer"
                >
                  <FiX className="w-4 h-4" />
                </button>
              )}

              {/* Mobile Search Dropdown */}
              {isSearchOpen && searchQuery.trim().length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-neutral-200 rounded-lg shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/60 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                    <span>Search Results</span>
                    {isSearchLoading && (
                      <FiLoader className="w-3.5 h-3.5 animate-spin text-[#dc2626]" />
                    )}
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-neutral-100">
                    {isSearchLoading ? (
                      <div className="p-4 space-y-3">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 animate-pulse"
                          >
                            <div className="w-10 h-10 rounded-md bg-neutral-200 shrink-0" />
                            <div className="space-y-1.5 flex-1">
                              <div className="h-3.5 bg-neutral-200 rounded-md w-3/4" />
                              <div className="h-2.5 bg-neutral-200 rounded-md w-1/3" />
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
                            <h4 className="text-xs font-semibold text-neutral-800 group-hover:text-[#dc2626] truncate leading-snug">
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

            {webNavItems.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? "text-[#dc2626] bg-red-50/50 font-semibold"
                      : "text-neutral-600 hover:text-[#dc2626] hover:bg-neutral-50"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
