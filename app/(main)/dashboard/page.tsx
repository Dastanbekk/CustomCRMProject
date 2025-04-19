"use client"

import { DashboardSidebar } from "@/components/sidebar"
import { MainHeader } from "@/components/main-header"
import { MainContent } from "@/components/main-content"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ThemeProvider } from "@/components/theme-provider"

export default function Dashboard() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SidebarProvider>
        <div className="grid min-h-screen w-full lg:grid-cols-[auto_1fr]">
          <DashboardSidebar />
          <div className="flex flex-col">
            <MainHeader />
            <MainContent />
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  )
}
