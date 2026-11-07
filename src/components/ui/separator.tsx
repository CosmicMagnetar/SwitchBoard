import * as React from "react";
import { cn } from "@/lib/utils";

export interface SeparatorProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

const Separator = React.forwardRef<HTMLHRElement, SeparatorProps>(
  ({ className, orientation = "horizontal", decorative, ...props }, ref) => {
    return (
      <hr
        ref={ref}
        className={cn(
          "relative flex w-full shrink-0 [&>hr]:bg-border [&>hr:h-[1px]] [&>hr:mx-auto] [&>hr:w-full] [&>hr:my-auto] border-t border-border",
          orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
          className
        )}
        aria-orientation={orientation}
        {...(decorative ? { "aria-hidden": true } : {})}
        {...props}
      />
    );
  }
);
Separator.displayName = "Separator";

export { Separator };
