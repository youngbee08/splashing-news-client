import { FiTrash2, FiAlertTriangle } from "react-icons/fi";
import { usePostContext } from "../../hooks/UsePostContext";
import Modal from "./Modal";
import { toast } from "sonner";
import type { Post } from "../../types/generalTypes";

interface DeletePostModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
}

const DeletePostModal = ({ post, isOpen, onClose }: DeletePostModalProps) => {
  const { deletePost, isDeletingPost } = usePostContext();

  if (!isOpen || !post) return null;

  const handleDelete = async () => {
    try {
      await deletePost(post._id);
      toast.success("Post deleted successfully");
      onClose();
    } catch (err) {
      toast.error("Failed to delete post");
      console.error(err);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className="text-center py-2 px-1">
        {/* Warning Icon */}
        <div className="w-12 h-12 rounded-full bg-red-50 text-red-700 flex items-center justify-center mx-auto mb-4 border border-red-200">
          <FiAlertTriangle className="w-6 h-6" />
        </div>

        {/* Modal Heading */}
        <h3 className="font-serif font-black text-xl text-neutral-900 mb-2">
          Delete Post
        </h3>

        {/* Message */}
        <p className="text-xs text-neutral-600 leading-relaxed mb-6 max-w-sm mx-auto">
          Are you sure you want to delete{" "}
          <span className="font-bold text-neutral-900">"{post.title}"</span>? This
          action cannot be undone and will remove the post permanently.
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 pt-2 border-t border-neutral-150">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-neutral-250 rounded-lg text-neutral-700 hover:bg-neutral-100 font-semibold transition-colors cursor-pointer text-xs"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeletingPost}
            className="inline-flex items-center gap-2 px-5 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg font-semibold transition-all disabled:opacity-50 cursor-pointer shadow-xs text-xs"
          >
            <FiTrash2 className="w-4 h-4" />
            <span>{isDeletingPost ? "Deleting..." : "Delete Post"}</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeletePostModal;
