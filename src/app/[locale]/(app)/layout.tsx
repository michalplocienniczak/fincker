import { SidebarProvider } from "@/components"
import { AppSidebar } from "@/features/app-layout"
import React from "react"

const AppLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <SidebarProvider>
      <AppSidebar /> <main>{children}</main>
    </SidebarProvider>
  )
}

export default AppLayout
