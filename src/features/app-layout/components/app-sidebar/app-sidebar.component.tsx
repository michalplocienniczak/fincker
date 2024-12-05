import { Logo, Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components"
import React from "react"
import { UserInformationDropdown } from "./components"
import { auth } from "@/auth"

const AppSidebar = async () => {
  const session = await auth()
  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent />
      <SidebarFooter>
        <UserInformationDropdown session={session} />
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
