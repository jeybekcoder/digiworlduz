// 📄 Fayl: digiworlduz/apps/admin-panel/components/ui/label.tsx
// 🎯 Maqsad: Accessible label komponenti — input, checkbox, radio, va boshqalar uchun

import * as React from "react"
import { cn } from "@/lib/utils"

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  )
})
Label.displayName = "Label"

export { Label }
