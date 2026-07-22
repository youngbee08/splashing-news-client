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
  author: { _id: string; fullname?: string; name?: string; email?: string };
  status: "draft" | "published";
  views: number;
  readingTime: string;
  likes: number;
  comments?: Comment[];
  commentsCount?: number;
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

export interface RecentPost {
  _id: string;
  id: string;
  title: string;
  slug: string;
  status: "published" | "draft";
  createdAt: string;
}

export interface DashboardMetrics {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalComments: number;
  totalCategories: number;
  totalViews: number;
  totalLikes: number;
  recentPosts: RecentPost[];
}

export interface UserContextType {
  logout: () => void;
  user: User | null;
  token: string;
  login: (token: string, user: User, metrics: DashboardMetrics) => void;
  isLoggedIn: boolean;
  refreshUser: (token: string) => void;
  // refreshUser: (token: string) => Promise<void>;
  loading: boolean;
  dashboardMetrics: DashboardMetrics;
}

export interface CreateCategoryInput {
  name: string;
  description?: string;
}

export interface CreatePostInput {
  title: string;
  content: string;
  category: string; // CATEGORY_ID
  status: "draft" | "published";
  featuredImage?: File | string;
  excerpt?: string;
}

export interface CommentInput {
  name: string;
  message: string;
  postId: string;
}

export interface Comment {
  _id: string;
  name: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface SiteSettings {
  siteName: string;
  socialLinks?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    [key: string]: string | undefined;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface PostQueryOptions {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  category?: string;
  status?: string;
}

export interface PaginatedPostsResponse {
  data: Post[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface PostContextType {
  categories: Category[] | undefined;
  isCategoriesLoading: boolean;
  categoriesError: unknown;

  postsData: PaginatedPostsResponse | undefined;
  isPostsLoading: boolean;
  postsError: unknown;
  postsParams: PostQueryOptions;
  setPostsParams: React.Dispatch<React.SetStateAction<PostQueryOptions>>;

  settings: SiteSettings | undefined;
  isSettingsLoading: boolean;
  settingsError: unknown;

  createCategory: (data: CreateCategoryInput) => Promise<Category>;
  isCreatingCategory: boolean;

  createPost: (data: CreatePostInput) => Promise<Post>;
  isCreatingPost: boolean;

  updatePost: (id: string, data: Partial<CreatePostInput>) => Promise<Post>;
  isUpdatingPost: boolean;

  deletePost: (id: string) => Promise<void>;
  isDeletingPost: boolean;

  likePost: (params: { id: string; action: "like" | "unlike" }) => void;
  isLikingPost: boolean;

  addComment: (data: CommentInput) => void;
  isAddingComment: boolean;

  uploadMedia: (file: File) => Promise<{ url: string }>;
  isUploadingMedia: boolean;

  updateSettings: (data: Partial<SiteSettings>) => Promise<SiteSettings>;
  isUpdatingSettings: boolean;
}

export interface PostProviderProps {
  children: React.ReactNode;
}

// export interface OtherNewsProps {
//   news_name: string;
//   news_desc: string;
//   news_slug: string;
// }
