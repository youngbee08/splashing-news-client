import type { NavItem } from "../types/generalTypes";

const navItems: NavItem[] = [
  // Web Nav Items
  { name: "Home", path: "/", type: "web" },
  { name: "News", path: "/news", type: "web" },
  { name: "Politics", path: "/politics", type: "web" },
  { name: "Business", path: "/business", type: "web" },
  { name: "Health", path: "/health", type: "web" },
  { name: "Sports", path: "/sports", type: "web" },

  // CMS Nav Items
  { name: "Dashboard", path: "/admin/overview", type: "cms", icon: "Dashboard" },
  { name: "Posts", path: "/admin/posts", type: "cms", icon: "Posts" },
  { name: "Add Post", path: "/admin/add-post", type: "cms", icon: "AddPost" },
];

export default navItems;