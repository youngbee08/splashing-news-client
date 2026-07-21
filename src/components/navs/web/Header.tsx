import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { usePostContext } from "../../../hooks/UsePostContext";

const Header = () => {
  const { categories } = usePostContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const baseNavItems = [
    { name: "Home", path: "/" },
    { name: "News", path: "/news" },
  ];

  const categoryItems =
    Array.isArray(categories) && categories.length > 0
      ? categories
          .slice(0, 2)
          .filter((cat) => cat.isActive !== false)
          .map((cat) => ({
            name: cat.name,
            path: `/articles/${cat.slug || cat.name.toLowerCase()}`,
          }))
      : [
          { name: "Politics", path: "/politics" },
          { name: "Business", path: "/business" },
          { name: "Health", path: "/health" },
          { name: "Sports", path: "/sports" },
        ];

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
            {/* Search Input */}
            <div className="relative hidden sm:block">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <svg
                  className="h-4 w-4 text-neutral-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
              <input
                type="search"
                placeholder="Search splashing news..."
                className="pl-10 pr-4 py-1.5 w-56 sm:w-64 bg-neutral-50 border border-neutral-250 rounded-full text-xs font-medium text-neutral-800 placeholder-neutral-450 focus:outline-none focus:border-neutral-400 focus:bg-white focus:ring-1 focus:ring-neutral-400/20 transition-all"
              />
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="p-2 text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50 rounded-lg md:hidden transition-colors"
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

      {/* Mobile Menu, show/hide based on menu state. */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden border-t border-neutral-100 bg-white"
          id="mobile-menu"
        >
          <div className="px-4 pt-2 pb-4 space-y-1">
            {/* Mobile Search input */}
            <div className="relative mb-4 mt-1">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IoIosSearch />
              </span>
              <input
                type="search"
                placeholder="Search..."
                className="pl-9 pr-4 py-2 w-full bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-800 placeholder-neutral-500 focus:outline-none focus:border-neutral-400"
              />
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
