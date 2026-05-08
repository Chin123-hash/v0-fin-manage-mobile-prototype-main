import * as React from "react"
import { TouchableOpacity, Text, type TouchableOpacityProps } from "react-native"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "flex-row items-center justify-center rounded-md",
  {
    variants: {
      variant: {
        default: "bg-[#00f5d4]", // teal accent
        destructive: "bg-[#ff006e]", // error status
        outline: "border border-[#4d3b6e] bg-transparent",
        secondary: "bg-[#2d1b4e]", // secondary background
        ghost: "bg-transparent",
        link: "bg-transparent",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 px-3 rounded-md",
        lg: "h-14 px-8 rounded-md",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const textVariants = cva(
  "font-medium text-center",
  {
    variants: {
      variant: {
        default: "text-[#1a0a2e] font-bold", // dark background primary
        destructive: "text-white font-bold",
        outline: "text-white",
        secondary: "text-white",
        ghost: "text-white",
        link: "text-[#00f5d4] underline",
      },
      size: {
        default: "text-base",
        sm: "text-sm",
        lg: "text-lg",
        icon: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends TouchableOpacityProps,
    VariantProps<typeof buttonVariants> {
  textClassName?: string
  children: React.ReactNode
}

const Button = React.forwardRef<React.ElementRef<typeof TouchableOpacity>, ButtonProps>(
  ({ className, textClassName, variant, size, children, ...props }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        activeOpacity={0.8}
        {...props}
      >
        {typeof children === "string" ? (
          <Text className={cn(textVariants({ variant, size }), textClassName)}>
            {children}
          </Text>
        ) : (
          children
        )}
      </TouchableOpacity>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants, textVariants }