import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const progressVariants = cva(
  "relative w-full overflow-hidden rounded-full",
  {
    variants: {
      variant: {
        default: "bg-muted h-3",
        glow: "bg-muted shadow-inner h-3",
        slim: "bg-muted h-2",
        timer: "bg-muted/50 h-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const progressIndicatorVariants = cva(
  "h-full w-full flex-1 rounded-full",
  {
    variants: {
      variant: {
        default: "bg-primary transition-all duration-500 ease-out",
        glow: "bg-gradient-to-r from-primary to-blue-500 shadow-lg shadow-primary/50 transition-all duration-500 ease-out",
        warning: "bg-secondary transition-all duration-300",
        danger: "bg-destructive transition-all duration-300",
        success: "bg-green-500 transition-all duration-300",
        timer: "bg-primary transition-all duration-100 ease-linear",
        timerWarning: "bg-secondary transition-all duration-100 ease-linear",
        timerDanger: "bg-destructive transition-all duration-100 ease-linear animate-pulse",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  indicatorVariant?: VariantProps<typeof progressIndicatorVariants>["variant"];
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, variant, indicatorVariant = "default", ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(progressVariants({ variant, className }))}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(progressIndicatorVariants({ variant: indicatorVariant }))}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
