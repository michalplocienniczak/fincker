import { SidebarProvider, AppSidebar } from "@/components"
import React from "react"

const AppLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <SidebarProvider>
      <AppSidebar /> <main className="w-full">{children}</main>
    </SidebarProvider>
  )
}

export default AppLayout
