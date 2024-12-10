import React from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Separator,
  SidebarTrigger,
} from "../ui"
import { Link } from "@/i18n"

type DynamicBreadcrumbsProps = {
  breadcrumbs: {
    label: string
    href?: string
  }[]
}

const DynamicBreadcrumbs = ({ breadcrumbs }: DynamicBreadcrumbsProps) => {
  return (
    <div className="flex items-center">
      <SidebarTrigger className="-ml-1 text-muted-foreground" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map(({ href, label }, index) => (
            <>
              <BreadcrumbItem key={href}>
                {href ? (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}

export default DynamicBreadcrumbs
