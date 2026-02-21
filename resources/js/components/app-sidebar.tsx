import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "@inertiajs/react"
import AppLogo from "./app-logo"
import { usePage } from '@inertiajs/react'
import type { SharedData } from "@/types"
import { getMainNavItemsByRole } from "@/utils/navFactory"


export function AppSidebar() {
  const { auth } = usePage<SharedData>().props;
  const role = auth.user?.role;

  if (!role) return null;
  const mainNavItems = getMainNavItemsByRole(role)

  let link;

  if (role === 'admin') {
    link = '/dashboard'
  } else {
    link = '/client/dashboard'
  }

  console.log(auth.user?.role)
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={link} prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
