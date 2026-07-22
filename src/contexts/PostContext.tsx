import { useState } from "react";
import { PostContext } from "../hooks/UsePostContext";
import {
  useCategoriesQuery,
  useCreateCategoryMutation,
  usePostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useAddCommentMutation,
  useUploadMediaMutation,
  useSettingsQuery,
  useUpdateSettingsMutation,
} from "../hooks/usePostQueries";
import type {
  PostProviderProps,
  PostQueryOptions,
  CreateCategoryInput,
  CreatePostInput,
  CommentInput,
  SiteSettings,
} from "../types/generalTypes";

const PostProvider = ({ children }: PostProviderProps) => {
  const [postsParams, setPostsParams] = useState<PostQueryOptions>({
    page: 1,
    limit: 10,
    search: "",
    sort: "",
    category: "",
  });

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useCategoriesQuery();

  const {
    data: postsData,
    isLoading: isPostsLoading,
    error: postsError,
  } = usePostsQuery(postsParams);

  const {
    data: settings,
    isLoading: isSettingsLoading,
    error: settingsError,
  } = useSettingsQuery();

  const createCategoryMutation = useCreateCategoryMutation();
  const createPostMutation = useCreatePostMutation();
  const updatePostMutation = useUpdatePostMutation();
  const deletePostMutation = useDeletePostMutation();
  const likePostMutation = useLikePostMutation();
  const addCommentMutation = useAddCommentMutation();
  const uploadMediaMutation = useUploadMediaMutation();
  const updateSettingsMutation = useUpdateSettingsMutation();

  const value = {
    categories,
    isCategoriesLoading,
    categoriesError,

    postsData,
    isPostsLoading,
    postsError,
    postsParams,
    setPostsParams,

    settings,
    isSettingsLoading,
    settingsError,

    createCategory: (data: CreateCategoryInput) =>
      createCategoryMutation.mutateAsync(data),
    isCreatingCategory: createCategoryMutation.isPending,

    createPost: (data: CreatePostInput) => createPostMutation.mutateAsync(data),
    isCreatingPost: createPostMutation.isPending,

    updatePost: (id: string, data: Partial<CreatePostInput>) =>
      updatePostMutation.mutateAsync({ id, data }),
    isUpdatingPost: updatePostMutation.isPending,

    deletePost: (id: string) => deletePostMutation.mutateAsync(id),
    isDeletingPost: deletePostMutation.isPending,

    likePost: (params: { id: string; action: "like" | "unlike" }) =>
      likePostMutation.mutateAsync(params),
    isLikingPost: likePostMutation.isPending,

    addComment: (data: CommentInput) => addCommentMutation.mutateAsync(data),
    isAddingComment: addCommentMutation.isPending,

    uploadMedia: (file: File) => uploadMediaMutation.mutateAsync(file),
    isUploadingMedia: uploadMediaMutation.isPending,

    updateSettings: (data: Partial<SiteSettings>) =>
      updateSettingsMutation.mutateAsync(data),
    isUpdatingSettings: updateSettingsMutation.isPending,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export default PostProvider;
