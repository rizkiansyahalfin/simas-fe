import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { type ButtonVariantProps, buttonVariants } from "./button-variants"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ComponentProps<"button">,
    ButtonVariantProps {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref}
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button }
export default Button
