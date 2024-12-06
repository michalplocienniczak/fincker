"use client"
import {
  SidebarMenu,
  SidebarMenuItem,
  DropdownMenu,
  SidebarMenuButton,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components"
import { Link } from "@/i18n"
import { DropdownMenuGroup, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { BadgeCheck, ChevronsUpDown, CreditCard, LogOut } from "lucide-react"
import { Session } from "next-auth"
import { useTranslations } from "next-intl"
import React from "react"

type UserInformationDropdownProps = {
  session: Session | null
}

const UserInformationDropdown = ({ session }: UserInformationDropdownProps) => {
  const t = useTranslations("app.layout.sidebar.user-settings")

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
              <div className="whitespace-nowrap text-ellipsis max-w-full overflow-hidden">{session?.user?.email}</div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="end" sideOffset={4}>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                {t("account")}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                {t("billing")}
              </DropdownMenuItem>
              <Link href="/sign-out">
                <DropdownMenuItem className="text-destructive cursor-pointer">
                  <LogOut />
                  {t("signout")}
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export default UserInformationDropdown
