import { theme } from "@/lib/theme";
import { HTMLAttributes, forwardRef, useEffect } from "react";
import { SunIcon, MoonIcon } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { cn } from "@/lib/utils";

export const DarkModeToggle = forwardRef<HTMLButtonElement, HTMLAttributes<HTMLButtonElement>>(({ className, ...props }, ref) => {
  const { theme: _theme, toggle } = theme.hooks.useTheme()
  const dark = _theme === 'dark'

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark])


  return (
    <button
      ref={ref}
      onClick={toggle}
      className={cn("text-cyan-500", className)}
    >
      {dark
        ? <SunIcon className="size-6" />
        : <MoonIcon className="size-6" />
      }
    </button>
  )
})
