"use client";

import type * as React from "react";

import { Building2, House, Pickaxe, PiggyBank, TicketIcon, Users } from "lucide-react";
import Link from "next/link";

import { NavMain } from "@/components/dashboard/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navMain1 = [
  { title: "خانه", url: "/", icon: House },
  { title: "بلیت‌های من", url: "/dashboard/tickets", icon: TicketIcon },
  { title: "اعتبار", url: "/dashboard/credit", icon: PiggyBank },
];

const navMain2 = [
  { title: "رویداد های من", url: "/dashboard/events", icon: Users },
  { title: "سازمان من", url: "/dashboard/organizations", icon: Building2 },
];

const navMain3 = [
  { title: "ایجاد سازمان", url: "/new-organization", icon: Pickaxe },
  { title: "ثبت رویداد", url: "/new-event", icon: Pickaxe },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar side="right" collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!">
              <Link href="/">
                <span className="text-base font-semibold">همگرد</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* First group */}
        <NavMain items={navMain1} />
        <div className="mt-1 border-t pt-2">
          <NavMain items={navMain2} />
        </div>
        <div className="mt-1 border-t pt-2">
          <NavMain items={navMain3} />
        </div>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}
