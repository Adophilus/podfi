import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

namespace Section {
  export const Container = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) =>
    <section
      className={cn("w-full font-futuraMd text-black px-10 xl:px-20 py-6 absolute dark:text-white", className)}
      {...props}
      ref={ref}
    />
  )
}

export { Section }
