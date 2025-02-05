import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/twClassesMerge";

export const buttonVariants = cva(
  "text-sm inline-flex px-8 py-[8.5px] rounded-[5px] gap-[12px] items-center justify-center whitespace-nowrap font-semibold transition-colors  disabled:pointer-events-none disabled:bg-black-25",
  {
    variants: {
      variant: {
        default:
          "border-2 border-transparent bg-primary text-white-base hover:bg-hover focus:border-primary/50",
        ghost:
          "bg-transparent focus:opacity-80 hover:opacity-65 text-black-100 text-md font-medium rounded-none",
      },
      size: {
        default: "h-10",
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
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant,
  size,
  icon,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
      {icon ? icon : null}
    </button>
  );
};
