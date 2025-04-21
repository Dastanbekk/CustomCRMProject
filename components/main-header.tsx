"use client";

import { Bell, Search, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "./mode-toggle";
import { useLogOutMutation } from "@/request/mutation";

export function MainHeader() {
  const { setTheme, theme } = useTheme();
  const { mutate } = useLogOutMutation();

  return (
    <header className="sticky top-0 z-30 flex h-16  items-center gap-4 border-b bg-white dark:bg-zinc-900 px-6 shadow-sm">
      <SidebarTrigger className="lg:hidden" />

      <div className="w-full flex-1 md:w-auto md:flex-none">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Qidirish..."
              className="w-full rounded-lg bg-background pl-8 md:w-[240px] lg:w-[320px]"
            />
          </div>
        </form>
      </div>

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
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar>
                <AvatarImage
                  src="/placeholder.svg?height=32&width=32"
                  alt="User"
                />
                <AvatarFallback className="bg-[dodgerblue] text-white">
                  D
                </AvatarFallback>
              </Avatar>
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profilim</DropdownMenuItem>
            <DropdownMenuItem>So'zlamalar</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light Mode
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark Mode
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => mutate()}>Chiqish</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
