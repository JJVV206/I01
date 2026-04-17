import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_10px_32px_rgba(171,163,255,0.22)] hover:bg-primary/90 hover:shadow-[0_16px_40px_rgba(171,163,255,0.26)]",
        outline:
          "border border-white/10 bg-white/[0.02] text-white hover:border-white/15 hover:bg-white/[0.05]",
        ghost: "text-white/72 hover:bg-white/[0.05] hover:text-white",
        subtle:
          "border border-white/[0.06] bg-white/[0.03] text-white/88 hover:bg-white/[0.06]",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-10 px-4 text-[0.72rem] uppercase tracking-[0.16em]",
        lg: "h-14 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
