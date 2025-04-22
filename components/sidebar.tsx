"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

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
import { bottomMenuItems, menuItems } from "@/utils";
import { usePathname } from "next/navigation";

export function DashboardSidebar() {
  const pathname = usePathname();
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
          <SidebarGroupLabel className=" text-zinc-700 text-md">
            Asosiy Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    className={`h-10  ${pathname == item.href ? " bg-accent " : " !py-3"}`}
                  >
                    <Link
                      href={item.href}
                      className="flex text-zinc-400  mt-2 justify-between"
                    >
                      <div className="flex items-center">
                        <item.icon
                          className={`h-6 w-6  ${
                            pathname == item.href ? "text-gray-400" : ""
                          }`}
                        />
                        <span
                          className={`ml-2 text-md  ${
                            pathname == item.href ? "text-gray-400" : ""
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                      {pathname == item.href && (
                        <ChevronRight
                          className={`h-5 w-5 ${
                            pathname == item.href ? "text-gray-400" : ""
                          }`}
                        />
                      )}
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
