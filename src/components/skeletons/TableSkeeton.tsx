export const PostsTableSkeleton = () => {
  return (
    <div className="overflow-x-auto animate-pulse">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-neutral-200/60 bg-neutral-50/50 text-xs font-semibold text-neutral-400 uppercase tracking-widest">
            <th className="px-6 py-4">Title</th>
            <th className="px-6 py-4">Category</th>
            <th className="px-6 py-4">Author</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Views</th>
            <th className="px-6 py-4">Published Date</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-neutral-200/60">
          {Array.from({ length: 6 }).map((_, index) => (
            <tr key={index}>
              {/* Title */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-neutral-200 flex-shrink-0" />
                  <div className="space-y-1.5 min-w-0">
                    <div className="h-4 w-44 sm:w-20 rounded bg-neutral-200" />
                    <div className="h-3 w-28 rounded bg-neutral-150" />
                  </div>
                </div>
              </td>

              {/* Category */}
              <td className="px-6 py-4">
                <div className="h-4 w-20 rounded bg-neutral-200" />
              </td>

              {/* Author */}
              <td className="px-6 py-4">
                <div className="h-4 w-24 rounded bg-neutral-200" />
              </td>

              {/* Status */}
              <td className="px-6 py-4">
                <div className="h-5 w-16 rounded-full bg-neutral-200" />
              </td>

              {/* Views */}
              <td className="px-6 py-4">
                <div className="h-4 w-12 rounded bg-neutral-200" />
              </td>

              {/* Date */}
              <td className="px-6 py-4">
                <div className="h-4 w-20 rounded bg-neutral-200" />
              </td>

              {/* Actions */}
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <div className="w-7 h-7 rounded-lg bg-neutral-200" />
                  <div className="w-7 h-7 rounded-lg bg-neutral-200" />
                  <div className="w-7 h-7 rounded-lg bg-neutral-200" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostsTableSkeleton;
