import { ArrowDown, ArrowUp, TrendingDown, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PaymentMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="dark:bg-black dark:text-white dark:border-gray-800 bg-white text-black border-gray-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-gray-400">Total Revenue</CardTitle>
          <div className="flex items-center rounded-md bg-emerald-900/30 px-2 py-1 text-xs font-medium text-emerald-400">
            <ArrowUp className="mr-1 h-3 w-3" />
            +12.5%
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">$1,250.00</div>
          <div className="mt-4 flex items-center text-sm text-gray-400">
            <TrendingUp className="mr-1 h-4 w-4 text-emerald-400" />
            <span className="font-medium text-emerald-400">Trending up this month</span>
          </div>
          <CardDescription className="mt-1 text-gray-500">Visitors for the last 6 months</CardDescription>
        </CardContent>
      </Card>

      <Card className="dark:bg-black dark:text-white dark:border-gray-800 bg-white text-black border-gray-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-gray-400">New Customers</CardTitle>
          <div className="flex items-center rounded-md bg-red-900/30 px-2 py-1 text-xs font-medium text-red-400">
            <ArrowDown className="mr-1 h-3 w-3" />
            -20%
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">1,234</div>
          <div className="mt-4 flex items-center text-sm text-gray-400">
            <TrendingDown className="mr-1 h-4 w-4 text-red-400" />
            <span className="font-medium text-red-400">Down 20% this period</span>
          </div>
          <CardDescription className="mt-1 text-gray-500">Acquisition needs attention</CardDescription>
        </CardContent>
      </Card>

      <Card className="dark:bg-black dark:text-white dark:border-gray-800 bg-white text-black border-gray-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-gray-400">Active Accounts</CardTitle>
          <div className="flex items-center rounded-md bg-emerald-900/30 px-2 py-1 text-xs font-medium text-emerald-400">
            <ArrowUp className="mr-1 h-3 w-3" />
            +12.5%
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">45,678</div>
          <div className="mt-4 flex items-center text-sm text-gray-400">
            <TrendingUp className="mr-1 h-4 w-4 text-emerald-400" />
            <span className="font-medium text-emerald-400">Strong user retention</span>
          </div>
          <CardDescription className="mt-1 text-gray-500">Engagement exceed targets</CardDescription>
        </CardContent>
      </Card>
    </div>
  )
}