import { User } from "lucide-react";

export function MemberCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-5 sm:p-6 opacity-40 grayscale transition-all select-none bg-surface border border-hairline rounded-xl w-full h-full min-h-[220px]">
      <div className="flex items-start gap-4">
        <div className="h-14 w-14 shrink-0 rounded-full bg-surface-2/50 animate-pulse flex items-center justify-center">
           <User className="h-6 w-6 text-muted-foreground/30" />
        </div>
        <div className="flex w-full flex-col gap-2.5 mt-1">
          <div className="h-4 w-3/4 bg-surface-2/50 rounded animate-pulse" />
          <div className="h-3 w-1/2 bg-surface-2/50 rounded animate-pulse" />
        </div>
      </div>
      <div className="mt-2 space-y-2.5">
        <div className="h-3 w-full bg-surface-2/50 rounded animate-pulse" />
        <div className="h-3 w-5/6 bg-surface-2/50 rounded animate-pulse" />
      </div>
      <div className="mt-auto pt-4 flex gap-2">
         <div className="h-6 w-16 bg-surface-2/50 rounded-full animate-pulse" />
         <div className="h-6 w-20 bg-surface-2/50 rounded-full animate-pulse" />
      </div>
    </div>
  );
}

export function ProfilePageSkeleton() {
  return (
    <div className="container-page max-w-4xl py-8 sm:py-12 animate-pulse">
      <div className="h-4 w-32 bg-surface-2/50 rounded" />

      <div className="mt-6 grid gap-6 sm:mt-8 sm:grid-cols-[auto_1fr] sm:gap-8">
        <div className="h-32 w-32 rounded-full bg-surface-2/50" />
        <div className="flex flex-col gap-3 py-2">
          <div className="h-8 w-64 bg-surface-2/50 rounded" />
          <div className="h-5 w-40 bg-surface-2/50 rounded mt-1" />
          <div className="h-4 w-32 bg-surface-2/50 rounded" />
          
          <div className="mt-2 space-y-2">
            <div className="h-4 w-full max-w-xl bg-surface-2/50 rounded" />
            <div className="h-4 w-5/6 max-w-xl bg-surface-2/50 rounded" />
          </div>
          
          <div className="mt-4 flex gap-4">
            <div className="h-11 w-32 bg-surface-2/50 rounded-md" />
            <div className="h-11 w-24 bg-surface-2/50 rounded-md" />
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-8 sm:mt-14 sm:gap-10 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <div>
            <div className="h-3 w-16 bg-surface-2/50 rounded mb-4" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-surface-2/50 rounded" />
              <div className="h-4 w-full bg-surface-2/50 rounded" />
              <div className="h-4 w-4/5 bg-surface-2/50 rounded" />
            </div>
          </div>
          
          <div>
            <div className="h-3 w-16 bg-surface-2/50 rounded mb-4" />
            <div className="flex gap-2">
              <div className="h-6 w-20 bg-surface-2/50 rounded-full" />
              <div className="h-6 w-16 bg-surface-2/50 rounded-full" />
              <div className="h-6 w-24 bg-surface-2/50 rounded-full" />
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <div className="h-3 w-16 bg-surface-2/50 rounded mb-4" />
            <div className="flex flex-col gap-2">
              <div className="h-11 w-full bg-surface-2/50 rounded-md" />
              <div className="h-11 w-full bg-surface-2/50 rounded-md" />
              <div className="h-11 w-full bg-surface-2/50 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CategorySkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-4 flex items-baseline justify-between hairline-b pb-2">
        <div className="h-6 w-32 bg-surface-2/50 rounded" />
        <div className="h-4 w-8 bg-surface-2/50 rounded" />
      </div>
      <div className="flex flex-col gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between rounded-md px-3 py-2 bg-surface">
            <div className="h-4 w-3/4 bg-surface-2/50 rounded" />
            <div className="h-3 w-6 bg-surface-2/50 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
