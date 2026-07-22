import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUploadCloud, FiCheck } from "react-icons/fi";
import { usePostContext } from "../../../hooks/UsePostContext";
import { toast } from "sonner";

const AddPost = () => {
  const navigate = useNavigate();
  const { categories, createPost, isCreatingPost } = usePostContext();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("published");
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelected = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !category) {
      toast.error("Please fill in all required fields (Title, Category, and Content)");
      return;
    }

    try {
      await createPost({
        title: title.trim(),
        content: content.trim(),
        category,
        status,
        featuredImage: imageFile || imagePreview,
      });

      toast.success("Post created successfully!");
      navigate("/admin/posts");
    } catch (err) {
      toast.error("Failed to create post. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif font-black text-2xl text-neutral-900 tracking-tight leading-tight">
            Create New Post
          </h1>
          <p className="text-xs text-neutral-500 font-medium mt-1">
            Fill in the details below to publish a new news post to Splashing News.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col gap-6">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 font-body block mb-2">
              Post Title <span className="text-red-700">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Breakthrough Innovations Announced in Green Energy Tech"
              className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-neutral-400 focus:ring-2 focus:ring-blue-500/10 transition-all font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 font-body block mb-2">
                Category <span className="text-red-700">*</span>
              </label>
              <select
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-800 focus:outline-none focus:bg-white focus:border-neutral-400 cursor-pointer transition-all font-medium"
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
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 font-body block mb-2">
                Publish Status
              </label>
              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as "draft" | "published")
                }
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-800 focus:outline-none focus:bg-white focus:border-neutral-400 cursor-pointer transition-all font-medium"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          {/* Dotted Border Large Image Input */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 font-body block mb-2">
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
              className={`relative border-2 border-dashed rounded-xl p-8 sm:p-10 transition-all duration-200 text-center flex flex-col items-center justify-center cursor-pointer group ${
                isDragging
                  ? "border-[#b91c1c] bg-red-50/50 scale-[0.99]"
                  : imagePreview
                  ? "border-neutral-300 bg-neutral-50/30"
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
                  <div className="relative group/img overflow-hidden rounded-xl border border-neutral-200 max-h-64 w-full flex items-center justify-center bg-black/5">
                    <img
                      src={imagePreview}
                      alt="Featured post Preview"
                      className="max-h-60 w-full object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center z-20">
                      <span className="text-white text-xs font-semibold bg-black/60 px-4 py-2 rounded-lg backdrop-blur-xs">
                        Click or Drop to Replace Image
                      </span>
                    </div>
                  </div>
                  {imageFile && (
                    <div className="flex items-center gap-1.5 text-xs text-green-700 font-semibold mt-3">
                      <FiCheck className="w-4 h-4" />
                      <span>Image selected</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-4 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-red-50 text-[#b91c1c] flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-red-100 transition-all shadow-xs">
                    <FiUploadCloud className="w-7 h-7" />
                  </div>
                  <p className="text-sm font-semibold text-neutral-800 mb-1">
                    <span className="text-[#b91c1c] font-bold">
                      Click to upload image
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-xs text-neutral-400 max-w-xs">
                    SVG, PNG, JPG, WEBP or GIF (Recommended resolution 1200 x 630 px)
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Post Content */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 font-body block mb-2">
              Post Content <span className="text-red-700">*</span>
            </label>
            <textarea
              required
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write the full content of your post here..."
              className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:bg-white focus:border-neutral-400 focus:ring-2 focus:ring-blue-500/10 transition-all font-sans leading-relaxed"
            />
          </div>
        </div>

        {/* Form Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate("/admin/posts")}
            className="px-5 py-2.5 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-100 font-semibold transition-colors cursor-pointer text-xs"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isCreatingPost}
            className="px-6 py-2.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white rounded-lg font-semibold transition-all disabled:opacity-50 cursor-pointer shadow-xs text-xs"
          >
            {isCreatingPost ? "Creating post..." : "Create Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
