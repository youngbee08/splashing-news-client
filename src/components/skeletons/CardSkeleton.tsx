interface CardSkeletonProps {
  variant?: "hero" | "sub-hero" | "latest" | "politics";
}

export const CardSkeleton = ({ variant = "latest" }: CardSkeletonProps) => {
  if (variant === "hero") {
    return (
      <div className="relative overflow-hidden rounded-lg shadow-xs border border-neutral-100 bg-neutral-200 aspect-[16/11] md:aspect-[16/10] lg:aspect-auto lg:h-[480px] w-full animate-pulse">
        <div className="absolute inset-0 bg-neutral-300"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-col justify-end space-y-4">
          <div className="h-4 bg-neutral-400 rounded-sm w-20"></div>
          <div className="h-8 bg-neutral-400 rounded-md w-3/4"></div>
          <div className="h-4 bg-neutral-400 rounded-md w-1/2"></div>
        </div>
      </div>
    );
  }

  if (variant === "sub-hero") {
    return (
      <div className="flex flex-col bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-xs w-full animate-pulse">
        <div className="relative aspect-[16/10] bg-neutral-200">
          <div className="absolute top-3 left-3 h-4 bg-neutral-300 rounded-sm w-16"></div>
        </div>
        <div className="p-4 flex-grow flex flex-col justify-between space-y-4">
          <div className="h-4 bg-neutral-200 rounded-md w-full"></div>
          <div className="h-3 bg-neutral-200 rounded-md w-1/3"></div>
        </div>
      </div>
    );
  }

  if (variant === "politics") {
    return (
      <div className="flex flex-col bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-xs w-full animate-pulse">
        <div className="aspect-[16/10] bg-neutral-200"></div>
        <div className="p-4 flex-grow flex flex-col justify-center">
          <div className="h-4 bg-neutral-200 rounded-md w-full"></div>
        </div>
      </div>
    );
  }

  // Default: latest news card skeleton
  return (
    <div className="flex flex-col bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-xs w-full animate-pulse">
      <div className="aspect-[16/10] bg-neutral-200"></div>
      <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div className="h-3 bg-neutral-300 rounded-md w-16"></div>
          <div className="h-4 bg-neutral-300 rounded-md w-full"></div>
          <div className="h-4 bg-neutral-300 rounded-md w-5/6"></div>
          <div className="h-3 bg-neutral-200 rounded-md w-full"></div>
          <div className="h-3 bg-neutral-200 rounded-md w-2/3"></div>
        </div>
        <div className="flex items-center gap-2 border-t border-neutral-100 pt-4 mt-4">
          <div className="h-3 bg-neutral-200 rounded-md w-1/3"></div>
          <div className="h-3 bg-neutral-200 rounded-md w-4"></div>
          <div className="h-3 bg-neutral-200 rounded-md w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
