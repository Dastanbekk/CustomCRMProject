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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

  return (
    <header className="sticky top-0 z-30 flex h-16  items-center gap-4 border-b bg-white dark:bg-zinc-900 px-6 shadow-sm">
      <SidebarTrigger className="lg:hidden" />

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
                      src={user ? user?.image : userDefaultImg}
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
