import { FiSearch, FiBell } from "react-icons/fi";

const TopNav = () => {
  return (
    <header className="h-20 flex items-center justify-end gap-5 px-8 bg-white/80 backdrop-blur-md sticky top-0 z-30 flex-shrink-0">
      {/* Search Input Box */}
      <div className="relative w-72">
        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
          <FiSearch className="w-4 h-4" />
        </span>
        <input
          type="search"
          placeholder="Search resources..."
          className="w-full pl-10 pr-4 py-2 bg-[#f0f4f9] border border-transparent rounded-lg text-sm text-neutral-800 placeholder-neutral-450 focus:outline-none focus:bg-neutral-100/90 focus:border-neutral-300 focus:ring-2 focus:ring-blue-500/10 transition-all duration-200"
        />
      </div>

      {/* Notifications Button */}
      <button className="relative p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors duration-200">
        <FiBell className="w-5 h-5" />
        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#dc2626] rounded-full ring-2 ring-white"></span>
      </button>

      {/* User Avatar & Profile */}
      <div className="flex items-center gap-3 pl-2">
        <button className="flex items-center hover:opacity-90 transition-opacity">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&fit=crop&q=60"
            alt="Administrator Avatar"
            className="w-9 h-9 rounded-full object-cover border border-neutral-200 shadow-xs"
          />
        </button>
      </div>
    </header>
  );
};

export default TopNav;

