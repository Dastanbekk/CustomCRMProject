"use client";
import { DashboardSidebar } from "@/components/layouts/sidebar";
import { MainHeader } from "@/components/layouts/main-header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { useLogOutMutation } from "@/request/mutation";
import { Loader2 } from "lucide-react";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const { isPending } = useLogOutMutation();
  if (isPending) {
    return (
      <div className="w-ful h-screen flex items-center justify-center">
        <Loader2 />
      </div>
    );
  }
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SidebarProvider>
        <div className="grid min-h-screen w-full lg:grid-cols-[auto_1fr]">
          <DashboardSidebar />
          <div className="flex flex-col">
            <MainHeader />
            {children}
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
