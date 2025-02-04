import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/twClassesMerge";

export const buttonVariants = cva(
  "text-sm inline-flex px-8 py-[8.5px] rounded-[5px] gap-[10px] items-center justify-center whitespace-nowrap font-semibold transition-colors  disabled:pointer-events-none disabled:bg-black-25",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white-base hover:bg-hover focus:bg-primary focus:border-2 focus:border-primary focus:border-opacity-50",
        ghost:
          "bg-transparent focus:opacity-80 hover:opacity-65 text-black-100 text-md font-medium",
        underline:
          "focus:opacity-80 hover:opacity-65 text-red-100 underline-offset-4 underline text-md font-medium",
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
      {icon && <span className="ml-[12px]">{icon}</span>}
    </button>
  );
};
