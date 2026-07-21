export const CategorySkeleton = () => {
  return (
    <div className="flex flex-wrap items-center gap-3 animate-pulse">
      <div className="h-8 bg-neutral-200 rounded-lg w-20"></div>
      <div className="h-8 bg-neutral-200 rounded-lg w-24"></div>
      <div className="h-8 bg-neutral-200 rounded-lg w-16"></div>
      <div className="h-8 bg-neutral-200 rounded-lg w-28"></div>
      <div className="h-8 bg-neutral-200 rounded-lg w-20"></div>
    </div>
  );
};

export default CategorySkeleton;
