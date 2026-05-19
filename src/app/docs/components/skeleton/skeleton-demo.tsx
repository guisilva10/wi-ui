import { Skeleton } from "@/shared/ui/components/skeleton/skeleton";

export function SkeletonDemo() {
  return (
    <div className="flex items-center gap-4 p-8">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[160px]" />
      </div>
    </div>
  );
}

export function SkeletonCardDemo() {
  return (
    <div className="mx-auto max-w-sm p-8">
      <div className="border-border space-y-4 rounded-xl border p-6">
        <Skeleton className="h-40 w-full rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    </div>
  );
}
