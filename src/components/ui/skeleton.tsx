"use client";

import { cn } from "@/lib/utils";

export function SkeletonText({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-secondary", className)}
      style={style}
    />
  );
}

export function SkeletonAvatar({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-pulse rounded-full bg-secondary w-8 h-8", className)}
    />
  );
}

export function SkeletonTableRow({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 p-4 border-b border-border/50", className)}>
      <SkeletonAvatar />
      <div className="flex-1 space-y-2">
        <SkeletonText style={{ width: "60%", height: "16px" }} />
        <SkeletonText style={{ width: "100%", height: "14px" }} />
      </div>
      <SkeletonText style={{ width: "20%", height: "16px" }} />
      <SkeletonText style={{ width: "15%", height: "16px" }} />
    </div>
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-pulse rounded-xl bg-secondary h-48 w-full", className)}
    />
  );
}

export function SkeletonStats({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse rounded-xl bg-secondary h-32 w-full", className)}
    />
  );
}

export function LoadingSkeletonPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <SkeletonText className="text-2xl font-bold w-48" />
          <SkeletonText className="text-sm mt-1 w-64" />
        </div>
        <SkeletonAvatar className="w-10 h-10" />
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <SkeletonStats key={i} />
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <SkeletonText key={i} className="px-4 py-2 w-20" />
            ))}
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <SkeletonTableRow key={i} />
            ))}
          </div>
        </div>
        <div>
          <SkeletonCard />
        </div>
      </div>
    </div>
  );
}
