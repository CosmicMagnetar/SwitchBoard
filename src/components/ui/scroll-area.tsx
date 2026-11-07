import * as React from "react";
import { cn } from "@/lib/utils";

export interface ScrollAreaProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("relative overflow-hidden rounded-xl", className)}
      {...props}
    >
      <div className="relative overflow-y-auto h-full pr-2">{children}</div>
    </div>
  )
);
ScrollArea.displayName = "ScrollArea";

const ScrollAreaScrollbar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute right-0 top-0 bottom-0 w-1.5 bg-transparent",
      className
    )}
    {...props}
  />
));
ScrollAreaScrollbar.displayName = "ScrollAreaScrollbar";

const ScrollAreaThumb = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute right-0 top-0 bottom-0 w-1.5 rounded-full bg-border shadow-sm",
      className
    )}
    {...props}
  />
));
ScrollAreaThumb.displayName = "ScrollAreaThumb";

export { ScrollArea, ScrollAreaScrollbar, ScrollAreaThumb };
