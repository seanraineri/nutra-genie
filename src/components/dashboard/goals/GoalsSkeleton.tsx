import { Skeleton } from "@/components/ui/skeleton";

export const GoalsSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((index) => (
        <div key={index} className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <div className="flex justify-between text-sm">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-12" />
          </div>
          <Skeleton className="h-2 w-full" />
        </div>
      ))}
    </div>
  );
};