"use client";
import Link from "next/link";
import { ChevronRight, LogOut } from "lucide-react";

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
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useLogOutMutation } from "@/request/mutation";

export function DashboardSidebar() {
  const { mutate } = useLogOutMutation();
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
                    className={`h-10  ${
                      pathname == item.href
                        ? " bg-black hover:bg-black dark:bg-white  dark:hover:bg-white"
                        : "!py-3"
                    }`}
                  >
                    <Link
                      href={item.href}
                      className="flex text-zinc-400  mt-2 justify-between"
                    >
                      <div className="flex items-center">
                        <item.icon
                          className={`!h-7 !w-7  pr-2 ${
                            pathname == item.href
                              ? "text-white dark:text-black"
                              : "text-black dark:text-white"
                          }`}
                        />
                        <span
                          className={`ml-2 text-md  ${
                            pathname == item.href
                              ? "text-white dark:text-black"
                              : "text-black dark:text-white"
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                      {pathname == item.href && (
                        <ChevronRight
                          className={`h-5 w-5 ${
                            pathname == item.href
                              ? "text-white dark:text-black"
                              : "text-black dark:text-white"
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
              <SidebarMenuItem>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <SidebarMenuButton className="text-red-600 hover:text-white hover:bg-red-600">
                      <LogOut className="h-5 w-5 rotate-180" />
                      <span>Chiqish</span>
                    </SidebarMenuButton>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Platformadan chiqishni xohlaysizmi?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="cursor-pointer">
                        Yo'q
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => mutate()}
                        className="cursor-pointer bg-red-600 text-white hover:bg-red-500"
                      >
                        Xa
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
