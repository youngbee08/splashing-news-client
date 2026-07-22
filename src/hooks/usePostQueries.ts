import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCategories,
  createCategory,
  getPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  likePost,
  addComment,
  uploadMedia,
  getSettings,
  updateSettings,
} from "../utils/apiUtility";
import type {
  CreateCategoryInput,
  CreatePostInput,
  CommentInput,
  SiteSettings,
  PostQueryOptions,
} from "../types/generalTypes";

export const useCategoriesQuery = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCategoryInput) => createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const usePostsQuery = (params?: PostQueryOptions) => {
  return useQuery({
    queryKey: ["posts", params],
    queryFn: () => getPosts(params),
  });
};

export const usePostBySlugQuery = (slug?: string) => {
  return useQuery({
    queryKey: ["post", slug],
    queryFn: () => getPostBySlug(slug!),
    enabled: !!slug,
  });
};

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePostInput) => createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreatePostInput> }) =>
      updatePost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useLikePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, action }: { id: string; action: "like" | "unlike" }) =>
      likePost(id, action),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", variables.id] });
    },
  });
};

export const useAddCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CommentInput) => addComment(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["post", variables.postId] });
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });
    },
  });
};

export const useUploadMediaMutation = () => {
  return useMutation({
    mutationFn: (file: File) => uploadMedia(file),
  });
};

export const useSettingsQuery = () => {
  return useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
};

export const useUpdateSettingsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<SiteSettings>) => updateSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });
};
