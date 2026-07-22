import React, { useState } from "react";
import { FiUploadCloud, FiX } from "react-icons/fi";
import { usePostContext } from "../../hooks/UsePostContext";
import Modal from "./Modal";
import { toast } from "sonner";

interface AddPostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPostModal = ({ isOpen, onClose }: AddPostModalProps) => {
  const { categories, createPost, isCreatingPost, uploadMedia } = usePostContext();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("published");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  if (!isOpen) return null;

  const resetForm = () => {
    setTitle("");
    setCategory("");
    setStatus("published");
    setContent("");
    setImageUrl("");
    setImageUploading(false);
    setIsDragging(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleFileSelected = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }

    try {
      setImageUploading(true);
      const res = await uploadMedia(file);
      setImageUrl(res.url);
      toast.success("Image uploaded successfully");
    } catch (err) {
      toast.error("Failed to upload image");
      console.error(err);
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !category) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await createPost({
        title: title.trim(),
        content: content.trim(),
        category,
        status,
        featuredImage: imageUrl || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600",
      });

      toast.success("Post created successfully");
      handleClose();
    } catch (err) {
      toast.error("Failed to create post");
      console.error(err);
    }
  };

  return (
    <Modal onClose={handleClose}>
      <div className="max-h-[85vh] overflow-y-auto pr-1">
        {/* Header */}
        <div className="pb-4 mb-4 border-b border-neutral-150 flex items-center justify-between">
          <div>
            <h3 className="font-serif font-black text-xl text-neutral-900 tracking-tight">
              Create New Article
            </h3>
            <p className="text-xs text-neutral-500 font-medium mt-0.5">
              Fill in the article details below to publish or save as draft.
            </p>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          {/* Article Title */}
          <div>
            <label className="block text-neutral-600 font-bold uppercase tracking-wider mb-1.5 text-xs">
              Article Title <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-250 rounded-lg focus:outline-none focus:bg-white focus:border-neutral-400 focus:ring-2 focus:ring-blue-500/10 text-sm text-neutral-900 placeholder-neutral-400 transition-all"
              placeholder="e.g. National Health Reform: 2024 Policy Update"
            />
          </div>

          {/* Category & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-neutral-600 font-bold uppercase tracking-wider mb-1.5 text-xs">
                Category <span className="text-red-600">*</span>
              </label>
              <select
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-250 rounded-lg focus:outline-none focus:bg-white focus:border-neutral-400 text-sm text-neutral-800 cursor-pointer transition-all"
              >
                <option value="">Select a Category</option>
                {categories?.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-neutral-600 font-bold uppercase tracking-wider mb-1.5 text-xs">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "draft" | "published")}
                className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-250 rounded-lg focus:outline-none focus:bg-white focus:border-neutral-400 text-sm text-neutral-800 cursor-pointer transition-all"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          {/* Dotted Border Image Upload Input */}
          <div>
            <label className="block text-neutral-600 font-bold uppercase tracking-wider mb-1.5 text-xs">
              Featured Cover Image
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
                  : imageUrl
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

              {imageUrl ? (
                <div className="relative w-full flex flex-col items-center">
                  <div className="relative group/img overflow-hidden rounded-lg border border-neutral-200 max-h-48 w-full flex items-center justify-center bg-black/5">
                    <img
                      src={imageUrl}
                      alt="Featured Preview"
                      className="max-h-44 w-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center z-20">
                      <span className="text-white text-xs font-semibold bg-black/60 px-3 py-1.5 rounded-md backdrop-blur-xs">
                        Click or Drop to Replace Image
                      </span>
                    </div>
                  </div>
                </div>
              ) : imageUploading ? (
                <div className="py-4 flex flex-col items-center">
                  <div className="w-10 h-10 border-3 border-[#b91c1c] border-t-transparent rounded-full animate-spin mb-3" />
                  <p className="text-xs font-semibold text-neutral-700 animate-pulse">
                    Uploading image to server...
                  </p>
                </div>
              ) : (
                <div className="py-3 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-red-50 text-[#b91c1c] flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-red-100 transition-all">
                    <FiUploadCloud className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-semibold text-neutral-800 mb-1">
                    <span className="text-[#b91c1c] font-bold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-[10px] text-neutral-400">
                    PNG, JPG, WEBP or GIF (Max size 5MB)
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Content Body */}
          <div>
            <label className="block text-neutral-600 font-bold uppercase tracking-wider mb-1.5 text-xs">
              Article Content <span className="text-red-600">*</span>
            </label>
            <textarea
              required
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-250 rounded-lg focus:outline-none focus:bg-white focus:border-neutral-400 focus:ring-2 focus:ring-blue-500/10 text-sm text-neutral-900 placeholder-neutral-400 transition-all"
              placeholder="Write or paste your full news article content here..."
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-150">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border border-neutral-250 rounded-lg text-neutral-700 hover:bg-neutral-100 font-semibold transition-colors cursor-pointer text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreatingPost || imageUploading}
              className="px-5 py-2 bg-[#b91c1c] hover:bg-[#991b1b] text-white rounded-lg font-semibold transition-all disabled:opacity-50 cursor-pointer shadow-xs text-xs"
            >
              {isCreatingPost ? "Publishing..." : "Create Post"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddPostModal;
