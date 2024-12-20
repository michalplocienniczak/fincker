"use client"
import React from "react"
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from ".."
import { SunIcon, MoonIcon, MonitorIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useTranslations } from "next-intl"

const ThemeToggle = () => {
  const { setTheme } = useTheme()
  const t = useTranslations("theme-toggle")

  const dropdownMenuItemStyles = `flex gap-2 cursor-pointer`
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")} className={dropdownMenuItemStyles}>
          <SunIcon /> {t("light")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className={dropdownMenuItemStyles}>
          <MoonIcon /> {t("dark")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className={dropdownMenuItemStyles}>
          <MonitorIcon /> {t("system")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ThemeToggle
