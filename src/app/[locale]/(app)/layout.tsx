import React from "react"

const AppLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return <div>AppLayout {children}</div>
}

export default AppLayout
