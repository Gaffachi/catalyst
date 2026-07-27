"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const DropdownMenuContext = React.createContext<{
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
} | null>(null)

function DropdownMenu({ children, ...props }: React.ComponentProps<"div">) {
  const [open, setOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div ref={containerRef} className="relative inline-block text-left" {...props}>
        {children}
      </div>
    </DropdownMenuContext.Provider>
  )
}

interface DropdownMenuTriggerProps extends React.ComponentProps<"button"> {
  asChild?: boolean
}

function DropdownMenuTrigger({ className, onClick, ...props }: DropdownMenuTriggerProps) {
  const context = React.useContext(DropdownMenuContext)
  if (!context) throw new Error("DropdownMenuTrigger must be used within DropdownMenu")

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    context.setOpen(!context.open)
    onClick?.(e)
  }

  return (
    <button
      type="button"
      data-slot="dropdown-menu-trigger"
      className={cn("inline-flex items-center justify-center cursor-pointer", className)}
      onClick={handleClick}
      {...props}
    />
  )
}

interface DropdownMenuContentProps extends React.ComponentProps<"div"> {
  align?: "left" | "right"
}

function DropdownMenuContent({ className, align = "right", children, ...props }: DropdownMenuContentProps) {
  const context = React.useContext(DropdownMenuContext)
  if (!context) throw new Error("DropdownMenuContent must be used within DropdownMenu")
  if (!context.open) return null

  return (
    <div
      data-slot="dropdown-menu-content"
      className={cn(
        "absolute z-50 min-w-[12rem] overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-md mt-1.5 focus:outline-none animate-in fade-in-80 slide-in-from-top-1 duration-150",
        align === "right" ? "right-0" : "left-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function DropdownMenuItem({ className, onClick, ...props }: React.ComponentProps<"div">) {
  const context = React.useContext(DropdownMenuContext)

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    context?.setOpen(false)
    onClick?.(e)
  }

  return (
    <div
      role="menuitem"
      data-slot="dropdown-menu-item"
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-md px-2.5 py-2 text-sm outline-none transition-colors hover:bg-secondary hover:text-secondary-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      onClick={handleClick}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
}
