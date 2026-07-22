import axios from "axios";
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

export const logoutApi = async () => {
  const res = await api.post("/auth/logout", );
  return res.data;
};

export const refreshTokenApi = async () => {
  const res = await axios.get("/auth/refresh");
  return res.data;
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

export const getPostBySlug = async (slug: string): Promise<Post> => {
  const res = await api.get(`/posts/${slug}`);
  return res.data.data || res.data;
};

export const createPost = async (data: CreatePostInput): Promise<Post> => {
  if (data.featuredImage instanceof File) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("category", data.category);
    if (data.status) formData.append("status", data.status);
    formData.append("featuredImage", data.featuredImage);
    const res = await api.post("/posts", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.data || res.data;
  }
  const res = await api.post("/posts", data);
  return res.data.data || res.data;
};

export const updatePost = async (
  id: string,
  data: Partial<CreatePostInput>
): Promise<Post> => {
  if (data.featuredImage instanceof File) {
    const formData = new FormData();
    if (data.title !== undefined) formData.append("title", data.title);
    if (data.content !== undefined) formData.append("content", data.content);
    if (data.category !== undefined) formData.append("category", data.category);
    if (data.status !== undefined) formData.append("status", data.status);
    formData.append("featuredImage", data.featuredImage);
    const res = await api.patch(`/posts/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.data || res.data;
  }
  const res = await api.patch(`/posts/${id}`, data);
  return res.data.data || res.data;
};

export const deletePost = async (id: string): Promise<void> => {
  const res = await api.delete(`/posts/${id}`);
  return res.data;
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

