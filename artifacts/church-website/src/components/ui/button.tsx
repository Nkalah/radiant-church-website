import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0" +
" hover-elevate active-elevate-2",
  {
    variants: {
      variant: {
        default:
          "border border-afm-gold bg-afm-gold text-afm-navy shadow-sm hover:bg-afm-gold/90",
        destructive:
          "border border-afm-red bg-afm-red text-afm-white shadow-sm hover:bg-afm-red/90",
        outline:
          "border border-afm-navy/20 bg-transparent text-afm-navy shadow-xs hover:bg-afm-off-white",
        secondary:
          "border border-afm-navy bg-afm-navy text-afm-white hover:bg-afm-navy/90",
        ghost: "border border-transparent text-afm-navy hover:bg-afm-off-white",
        link: "text-afm-navy underline-offset-4 hover:underline",
      },
      size: {
        // @replit changed sizes
        default: "min-h-9 px-4 py-2",
        sm: "min-h-9 rounded-full px-4 text-xs",
        lg: "min-h-12 rounded-full px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
