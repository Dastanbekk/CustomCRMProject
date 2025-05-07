"use client";

import { Bell, Search, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "./mode-toggle";
import { useLogOutMutation } from "@/request/mutation";
import { UserType } from "@/@types";
import Cookies from "js-cookie";
import Image from "next/image";
import userDefaultImg from "@/public/user.svg";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

export function MainHeader() {
  const { mutate } = useLogOutMutation();
  const [user, setUser] = useState<UserType | null>(null);
  const router = useRouter();
  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    }
  }, []);
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean);

  return (
    <header className="sticky top-0 z-30 flex h-16  items-center gap-4 border-b bg-white dark:bg-zinc-900 px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div>
          {" "}
          <Breadcrumb>
            <BreadcrumbList>
              {pathParts[0] === "dashboard" && pathParts.length === 1 ? null : (
                <>
                  {pathParts.map((part, index) => {
                    const href = "/" + pathParts.slice(0, index + 1).join("/");
                    const isLast = index === pathParts.length - 1;
                    return (
                      <React.Fragment key={index}>
                        <BreadcrumbItem className="capitalize">
                          {isLast ? (
                            <BreadcrumbPage>
                              {decodeURIComponent(part)}
                            </BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink href={href}>
                              {decodeURIComponent(part)}
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                        {!isLast && <BreadcrumbSeparator />}
                      </React.Fragment>
                    );
                  })}
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="w-full flex-1 md:w-auto md:flex-none"></div>

      <div className="flex items-center gap-4 ml-auto">
        <ModeToggle />
        <Button variant="outline" size="icon" className="rounded-full relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
            3
          </span>
          <span className="sr-only">Notifications</span>
        </Button>

        <div className="flex flex-col justify-end">
          <h3 className="text-sm">
            {user?.first_name} {user?.last_name}
          </h3>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center justify-end cursor-pointer gap-1">
                  <div
                    className={`w-[10px] h-[10px] rounded-full ${
                      user?.status?.toLowerCase() == "faol"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  ></div>
                  <p className="text-end text-[12px] capitalize">
                    {user?.role}
                  </p>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{user?.status}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full cursor-pointer"
            >
              <Avatar>
                <AvatarImage
                  src="/placeholder.svg?height=32&width=32"
                  alt="User"
                />
                <AvatarFallback className="bg-black  dark:text-black dark:bg-white text-white">
                  <div className="bg-gray-200 rounded-full">
                    <Image
                      src={
                        user
                          ? user?.image
                            ? user?.image
                            : userDefaultImg
                          : userDefaultImg
                      }
                      alt="default-user-img"
                      loading="lazy"
                      width={100}
                      height={100}
                      className="rounded-full object-cover"
                    />
                  </div>
                </AvatarFallback>
              </Avatar>
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => router.push("/dashboard/profile")}
              className="cursor-pointer"
            >
              Profilim
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => mutate()}
            >
              Chiqish
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
