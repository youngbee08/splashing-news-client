import { NavLink, useNavigate } from "react-router-dom";
import navItems from "../../../utils/navItems";
import {
  FiGrid,
  FiFileText,
  FiFolder,
  FiImage,
  FiUsers,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
  FiPlus,
} from "react-icons/fi";
import { useUserContext } from "../../../hooks/UseUserContext";
import { TiDocumentAdd } from "react-icons/ti";

const getIcon = (iconName?: string) => {
  switch (iconName) {
    case "Dashboard":
      return <FiGrid className="w-4.5 h-4.5" />;
    case "Posts":
      return <FiFileText className="w-4.5 h-4.5" />;
    case "AddPost":
      return <TiDocumentAdd className="w-4.5 h-4.5" />;
    case "Categories":
      return <FiFolder className="w-4.5 h-4.5" />;
    case "Media":
      return <FiImage className="w-4.5 h-4.5" />;
    case "Users":
      return <FiUsers className="w-4.5 h-4.5" />;
    case "Settings":
      return <FiSettings className="w-4.5 h-4.5" />;
    case "Help":
      return <FiHelpCircle className="w-4.5 h-4.5" />;
    case "SignOut":
      return <FiLogOut className="w-4.5 h-4.5" />;
    default:
      return null;
  }
};

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const mainCmsItems = navItems.filter(
    (item) => item.type === "cms" && !item.isBottom,
  );
  const { logout } = useUserContext();

  const handleNavClick = () => {
    if (onClose) onClose();
  };

  return (
    <aside className="w-64 h-screen sticky top-0 flex flex-col justify-between bg-[#edf2f9]/70 border-r border-neutral-200/50 p-6 flex-shrink-0">
      <div>
        <div className="mb-8 px-2">
          <h1 className="font-serif font-black text-2xl text-neutral-900 tracking-tight leading-tight">
            Admin Console
          </h1>
          <p className="text-xs text-neutral-500 font-medium mt-1">
            Splashing News
          </p>
        </div>

        <nav className="space-y-1">
          {mainCmsItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#dbeafe] text-blue-900 shadow-xs font-semibold"
                    : "text-neutral-650 hover:bg-neutral-250/40 hover:text-neutral-900"
                }`
              }
            >
              {getIcon(item.icon)}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="space-y-3 pt-4">
        <button
          onClick={() => {
            navigate("/admin/add-post");
            handleNavClick();
          }}
          className="w-full flex items-center justify-center gap-2 bg-[#b91c1c] hover:bg-[#991b1b] text-white py-3 px-4 rounded-lg text-sm font-semibold shadow-xs hover:shadow-sm transition-all duration-250 cursor-pointer"
        >
          <FiPlus className="w-4.5 h-4.5" />
          <span>Create New Post</span>
        </button>

        <hr className="border-neutral-200 my-3" />

        <div className="space-y-0.5">
          <button
            onClick={() => {
              logout();
              handleNavClick();
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-neutral-650 hover:bg-neutral-250/40 hover:text-neutral-900 transition-all duration-200 cursor-pointer"
          >
            <FiLogOut className="w-4.5 h-4.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
