import { cn } from "@/lib/utils";
import React, { memo } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

const SectionContainer: React.FC<Props> = ({
  title,
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn("w-full space-y-4", className)} {...props}>
      {title && (
        <div className={cn("p-4 pb-0")}>
          <div className="w-fit rounded-md bg-muted p-1 text-muted-foreground">
            <h5 className="rounded-sm px-3 py-1.5 bg-background text-foreground shadow-sm">
              {title}
            </h5>
          </div>
        </div>
      )}

      {children}
    </div>
  );
};

export default memo(SectionContainer);
