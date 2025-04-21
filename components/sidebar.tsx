"use client";
import Link from "next/link";
import {
  BarChart3,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  Home,
  MessageSquare,
  ChevronRight,
  User,
  Group,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import logo from "@/public/CRM-logo/vector/default-monochrome-black.svg";
import logowhite from "@/public/CRM-logo/vector/default-monochrome-white.svg";
import Image from "next/image";

export function DashboardSidebar() {
  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/", isActive: true },
    { icon: User, label: "Menejerlar", href: "/sales" },
    { icon: User, label: "Adminstratorlar", href: "/customers" },
    { icon: Users, label: "O'quvchilar", href: "/products" },
    { icon: BarChart3, label: "Analitika", href: "/analytics" },
    { icon: Group, label: "Guruhlar", href: "/reports" },
    { icon: MessageSquare, label: "Messages", href: "/messages" },
  ];

  const bottomMenuItems = [
    { icon: Settings, label: "Sozlamalar", href: "/settings" },
    { icon: HelpCircle, label: "Yordam", href: "/help" },
    { icon: LogOut, label: "Chiqish", href: "/logout" },
  ];

  return (
    <Sidebar
      collapsible="icon"
      className="sidebar border-r border-gray-200 dark:border-zinc-800 !bg-white dark:bg-zinc-900"
    >
      <SidebarHeader className="flex h-16 items-start shadow-sm border-zinc-800 px-6">
        <div className="flex items-start gap-2 font-semibold">
          <Image
            src={logo}
            alt="dark-logo"
            className="!block dark:!hidden max-w-[120px]"
          />
          <Image
            src={logowhite}
            alt="light-logo"
            className="!hidden dark:!block max-w-[120px]"
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-zinc-400">
            Asosiy Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
                    className={item.isActive ? "bg-zinc-800" : ""}
                  >
                    <Link href={item.href} className="flex justify-between">
                      <div className="flex items-center">
                        <item.icon
                          className={`h-5 w-5 ${
                            item.isActive ? "text-blue-500" : ""
                          }`}
                        />
                        <span className="ml-2">{item.label}</span>
                      </div>
                      {item.isActive && <ChevronRight className="h-4 w-4" />}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t  border-gray-200 dark:border-zinc-800">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {bottomMenuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span className="ml-2">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
