import api from "../services/axios";
import type {
  Category,
  CreateCategoryInput,
  Post,
  CreatePostInput,
  CommentInput,
  SiteSettings,
  PostQueryOptions,
  PaginatedPostsResponse,
} from "../types/generalTypes";

export const login = async (formData: { email: string; password: string }) => {
  const res = await api.post("/auth/login", formData);

  if (res.status === 200) {
    return res.data;
  }
};

export const getCategories = async (): Promise<Category[]> => {
  const res = await api.get("/categories");
  return res.data.data || res.data;
};

export const createCategory = async (
  data: CreateCategoryInput,
): Promise<Category> => {
  const res = await api.post("/categories", data);
  return res.data.data || res.data;
};

export const getPosts = async (
  params?: PostQueryOptions,
): Promise<PaginatedPostsResponse> => {
  const res = await api.get("/posts", { params });
  return res.data;
};

export const createPost = async (data: CreatePostInput): Promise<Post> => {
  const res = await api.post("/posts", data);
  return res.data.data || res.data;
};

export const likePost = async (
  id: string,
  action: "like" | "unlike",
) => {
  const res = await api.patch(`/posts/${id}/like`, { action });
  return res.data;
};

export const addComment = async (data: CommentInput) => {
  const res = await api.post("/comments", data);
  return res.data;
};

export const uploadMedia = async (file: File): Promise<{ url: string }> => {
  const formData = new FormData();
  formData.append("image", file);
  const res = await api.post("/media/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const getSettings = async (): Promise<SiteSettings> => {
  const res = await api.get("/settings");
  return res.data;
};

export const updateSettings = async (
  data: Partial<SiteSettings>,
): Promise<SiteSettings> => {
  const res = await api.patch("/settings", data);
  return res.data;
};

