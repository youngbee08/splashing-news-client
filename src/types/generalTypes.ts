export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: Category;
  author: string;
  status: "draft" | "published";
  views: number;
  readingTime: string;
  isFeatured: boolean;
  publishedAt: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TrendingArticle {
  id: string;
  category: string;
  title: string;
}

export interface NavItem {
  name: string;
  path: string;
  type: "web" | "cms";
  icon?: string;
  isBottom?: boolean;
}

export interface UserProviderProps {
  children: React.ReactNode;
}

export interface User {
  id: string;
  fullname: string;
  email: string;
  role: string;
}

export interface DashboardMetrics {
  total_posts: number;
  page_views: number;
  activity_level: string;
}

export interface UserContextType {
  logout: () => void;
  user: User | null;
  token: string;
  login: (token: string, user: User) => void;
  isLoggedIn: boolean;
  refreshUser: (token: string) => void;
  // refreshUser: (token: string) => Promise<void>;
  loading: boolean;
  dashboardMetrics: DashboardMetrics;
}
