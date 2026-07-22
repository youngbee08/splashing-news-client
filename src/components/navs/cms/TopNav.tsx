import { useState } from "react";
import { FiSearch, FiChevronDown, FiLogOut } from "react-icons/fi";
import { useUserContext } from "../../../hooks/UseUserContext";

const TopNav = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { user, logout } = useUserContext();

  return (
    <header className="h-16 lg:h-20 flex items-center justify-between gap-3 px-4 sm:px-8 bg-white/80 backdrop-blur-md sticky top-0 z-30 flex-shrink-0 border-b border-neutral-100 lg:border-none">
      <div className="flex items-center gap-3 lg:hidden">
        <span className="font-serif font-black text-lg text-neutral-900 tracking-tight">
          Admin Console
        </span>
      </div>

      <div className="flex items-center justify-end lg:w-full gap-3 sm:gap-5">
        <div className="hidden lg:flex relative w-full max-w-[200px] sm:max-w-xs md:w-72">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
            <FiSearch className="w-4 h-4" />
          </span>
          <input
            type="search"
            placeholder="Search..."
            className="w-full pl-9 pr-3 py-1.5 sm:py-2 bg-[#f0f4f9] border border-transparent rounded-lg text-xs sm:text-sm text-neutral-800 placeholder-neutral-450 focus:outline-none focus:bg-white focus:border-neutral-300 focus:ring-2 focus:ring-blue-500/10 transition-all duration-200"
          />
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
