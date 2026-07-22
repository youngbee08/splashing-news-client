import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { FiUploadCloud, FiCheck } from "react-icons/fi";
import { usePostContext } from "../../hooks/UsePostContext";
import Modal from "./Modal";
import { toast } from "sonner";
import type { Post } from "../../types/generalTypes";
import { getErrorMessage } from "../../services/axios";

interface EditPostModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
}

const validationSchema = yup.object({
  title: yup.string().required("Post title is required"),
  category: yup.string().required("Category is required"),
  status: yup
    .string()
    .oneOf(["published", "draft"])
    .required("Status is required"),
  content: yup.string().required("Post content is required"),
});

const EditPostModal = ({ post, isOpen, onClose }: EditPostModalProps) => {
  const { categories, updatePost, isUpdatingPost } = usePostContext();
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      status: "published" as "published" | "draft",
      content: "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      if (!post) return;
      try {
        await updatePost(post._id, {
          title: values.title.trim(),
          content: values.content.trim(),
          category: values.category,
          status: values.status,
          featuredImage: imageFile || imagePreview,
        });

        toast.success("Post updated successfully!");
        onClose();
      } catch (err) {
        toast.error(getErrorMessage(err, "Failed to update post"));
      }
    },
  });

  useEffect(() => {
    if (post) {
      const catId =
        typeof post.category === "object"
          ? post.category?._id
          : post.category || "";

      formik.setValues({
        title: post.title || "",
        category: catId || "",
        status: (post.status as "published" | "draft") || "published",
        content: post.content || "",
      });

      setImagePreview(post.featuredImage || "");
      setImageFile(null);
    }
  }, [post]);

  if (!isOpen || !post) return null;

  const handleFileSelected = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <Modal onClose={onClose}>
      <div className="max-h-[85vh] overflow-y-auto pr-1">
        {/* Header */}
        <div className="pb-4 mb-4 border-b border-neutral-150 flex items-center justify-between">
          <div>
            <h3 className="font-serif font-black text-xl text-neutral-900 tracking-tight">
              Edit Post
            </h3>
            <p className="text-xs text-neutral-500 font-medium mt-0.5">
              Update the details for "{post.title}".
            </p>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={formik.handleSubmit} className="space-y-5 text-xs">
          {/* Post Title */}
          <div>
            <label className="block text-neutral-600 font-bold uppercase tracking-wider mb-1.5 text-xs">
              Post Title <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-3 bg-neutral-50 border ${
                formik.touched.title && formik.errors.title
                  ? "border-red-500 focus:ring-red-100"
                  : "border-neutral-200 focus:border-neutral-400 focus:ring-2 focus:ring-blue-500/10"
              } rounded-lg text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none transition-all font-medium`}
              placeholder="Enter post title"
            />
            {formik.touched.title && formik.errors.title && (
              <span className="text-red-500 text-xs font-medium mt-1 block">
                {formik.errors.title}
              </span>
            )}
          </div>

          {/* Category & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-neutral-600 font-bold uppercase tracking-wider mb-1.5 text-xs">
                Category <span className="text-red-600">*</span>
              </label>
              <select
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-3 bg-neutral-50 border ${
                  formik.touched.category && formik.errors.category
                    ? "border-red-500 focus:ring-red-100"
                    : "border-neutral-200 focus:border-neutral-400"
                } rounded-lg text-sm text-neutral-800 focus:outline-none cursor-pointer transition-all font-medium`}
              >
                <option value="">Select a Category</option>
                {categories?.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {formik.touched.category && formik.errors.category && (
                <span className="text-red-500 text-xs font-medium mt-1 block">
                  {formik.errors.category}
                </span>
              )}
            </div>

            <div>
              <label className="block text-neutral-600 font-bold uppercase tracking-wider mb-1.5 text-xs">
                Status
              </label>
              <select
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-800 focus:outline-none focus:border-neutral-400 cursor-pointer transition-all font-medium"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          {/* Dotted Border Image Upload Dropzone */}
          <div>
            <label className="block text-neutral-600 font-bold uppercase tracking-wider mb-1.5 text-xs">
              Featured Image
            </label>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                const file = e.dataTransfer.files?.[0];
                if (file) handleFileSelected(file);
              }}
              className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-200 text-center flex flex-col items-center justify-center cursor-pointer group ${
                isDragging
                  ? "border-[#b91c1c] bg-red-50/40 scale-[0.99]"
                  : imagePreview
                    ? "border-neutral-300 bg-neutral-50/50"
                    : "border-neutral-300 hover:border-[#b91c1c] bg-neutral-50/50 hover:bg-neutral-100/50"
              }`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileSelected(file);
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />

              {imagePreview ? (
                <div className="relative w-full flex flex-col items-center">
                  <div className="relative group/img overflow-hidden rounded-lg border border-neutral-200 max-h-48 w-full flex items-center justify-center bg-black/5">
                    <img
                      src={imagePreview}
                      alt="Featured Preview"
                      className="max-h-44 w-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center z-20">
                      <span className="text-white text-xs font-semibold bg-black/60 px-3 py-1.5 rounded-md backdrop-blur-xs">
                        Click or Drop to Replace Image
                      </span>
                    </div>
                  </div>
                  {imageFile && (
                    <div className="flex items-center gap-1 text-[11px] text-green-700 font-semibold mt-2">
                      <FiCheck className="w-3.5 h-3.5" />
                      <span>New image selected</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-3 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-red-50 text-[#b91c1c] flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-red-100 transition-all">
                    <FiUploadCloud className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-semibold text-neutral-800 mb-1">
                    <span className="text-[#b91c1c] font-bold">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-[10px] text-neutral-400">
                    PNG, JPG, WEBP or GIF (Max 5MB)
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Content Body */}
          <div>
            <label className="block text-neutral-600 font-bold uppercase tracking-wider mb-1.5 text-xs">
              Post Content <span className="text-red-600">*</span>
            </label>
            <textarea
              rows={6}
              name="content"
              value={formik.values.content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-3 bg-neutral-50 border ${
                formik.touched.content && formik.errors.content
                  ? "border-red-500 focus:ring-red-100"
                  : "border-neutral-200 focus:border-neutral-400 focus:ring-2 focus:ring-blue-500/10"
              } rounded-lg text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none transition-all font-medium`}
              placeholder="Enter post content..."
            />
            {formik.touched.content && formik.errors.content && (
              <span className="text-red-500 text-xs font-medium mt-1 block">
                {formik.errors.content}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-150">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-neutral-250 rounded-lg text-neutral-700 hover:bg-neutral-100 font-semibold transition-colors cursor-pointer text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!formik.isValid || isUpdatingPost}
              className="px-5 py-2 bg-[#b91c1c] hover:bg-[#991b1b] text-white rounded-lg font-semibold transition-all disabled:opacity-50 cursor-pointer shadow-xs text-xs"
            >
              {isUpdatingPost ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditPostModal;
