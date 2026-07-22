import { NavLink } from "react-router-dom";
import { FiGrid, FiFileText, FiPlus } from "react-icons/fi";

const BottomBar = () => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white/90 backdrop-blur-xl border-t border-neutral-200/80 px-6 py-2.5 flex items-center justify-around shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      {/* Overview Link */}
      <NavLink
        to="/admin/overview"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all duration-200 ${
            isActive
              ? "text-primary font-semibold scale-105"
              : "text-neutral-500 hover:text-neutral-900"
          }`
        }
      >
        <FiGrid className="w-5.5 h-5.5" />
        <span className="text-[10px] font-medium tracking-tight">Overview</span>
      </NavLink>

      {/* Create New Post Action CTA Pill */}
      <NavLink
        to="/admin/add-post"
        className="flex items-center justify-center w-12 h-12 bg-gradient-to-tr from-[#b91c1c] to-red-600 text-white rounded-full shadow-md shadow-red-900/20 active:scale-95 transition-all duration-200 cursor-pointer -mt-5 border-2 border-white"
        aria-label="Create New Post"
      >
        <FiPlus className="w-6 h-6" />
      </NavLink>

      {/* Posts Link */}
      <NavLink
        to="/admin/posts"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all duration-200 ${
            isActive
              ? "text-primary font-semibold scale-105"
              : "text-neutral-500 hover:text-neutral-900"
          }`
        }
      >
        <FiFileText className="w-5.5 h-5.5" />
        <span className="text-[10px] font-medium tracking-tight">Posts</span>
      </NavLink>
    </nav>
  );
};

export default BottomBar;
