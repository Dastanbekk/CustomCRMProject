import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  DollarSign,
  ShoppingCart,
  Users,
  ArrowUp,
  ArrowDown,
  Package,
  TrendingUp,
  PieChart,
  Bell,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function MainContent() {
  return (
    <div className="flex-1 space-y-6 overflow-y-auto p-6 pt-6 ">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back, your sales dashboard overview.
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <div className="flex justify-between items-center">
          <TabsList className="bg-muted/60">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <div className="hidden md:flex gap-2">
            <Badge
              variant="outline"
              className="bg-blue-500/10 text-blue-500 border-blue-500/20 dark:bg-blue-500/20 dark:border-blue-500/30"
            >
              Today
            </Badge>
            <Badge variant="outline" className="bg-background">
              This Week
            </Badge>
            <Badge variant="outline" className="bg-background">
              This Month
            </Badge>
          </div>
        </div>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-blue-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <div className="flex items-center pt-1">
                  <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                  <p className="text-xs text-green-500">
                    +20.1% from last month
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <ShoppingCart className="h-4 w-4 text-purple-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2,350</div>
                <div className="flex items-center pt-1">
                  <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                  <p className="text-xs text-green-500">
                    +10.5% from last month
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Customers
                </CardTitle>
                <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Users className="h-4 w-4 text-green-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <div className="flex items-center pt-1">
                  <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                  <p className="text-xs text-green-500">
                    +3.2% from last month
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Conversion Rate
                </CardTitle>
                <div className="h-8 w-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-orange-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24.5%</div>
                <div className="flex items-center pt-1">
                  <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                  <p className="text-xs text-red-500">-1.2% from last month</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Sales</CardTitle>
                    <CardDescription>
                      You made 265 sales this month.
                    </CardDescription>
                  </div>
                  <Badge className="bg-blue-500 hover:bg-blue-600">
                    View All
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    {
                      name: "Olivia Martin",
                      email: "olivia@example.com",
                      amount: "$1,999.00",
                      status: "Success",
                    },
                    {
                      name: "Jackson Lee",
                      email: "jackson@example.com",
                      amount: "$1,459.00",
                      status: "Processing",
                    },
                    {
                      name: "Isabella Nguyen",
                      email: "isabella@example.com",
                      amount: "$1,289.00",
                      status: "Success",
                    },
                    {
                      name: "William Kim",
                      email: "will@example.com",
                      amount: "$799.00",
                      status: "Pending",
                    },
                    {
                      name: "Sofia Davis",
                      email: "sofia@example.com",
                      amount: "$2,499.00",
                      status: "Success",
                    },
                  ].map((sale, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-9 w-9">
                          <AvatarImage
                            src={`/placeholder.svg?height=36&width=36&text=${sale.name.charAt(
                              0
                            )}`}
                            alt={sale.name}
                          />
                          <AvatarFallback>{sale.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {sale.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {sale.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={
                            sale.status === "Success"
                              ? "default"
                              : sale.status === "Processing"
                              ? "outline"
                              : "secondary"
                          }
                          className={
                            sale.status === "Success"
                              ? "bg-green-500"
                              : sale.status === "Processing"
                              ? "border-blue-500 text-blue-500"
                              : "bg-muted"
                          }
                        >
                          {sale.status}
                        </Badge>
                        <div className="font-medium">{sale.amount}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Inventory Status</CardTitle>
                <CardDescription>
                  Current stock levels for top products.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    {
                      name: "Wireless Earbuds",
                      stock: 124,
                      status: "In Stock",
                      category: "Electronics",
                    },
                    {
                      name: "Smart Watch",
                      stock: 56,
                      status: "Low Stock",
                      category: "Electronics",
                    },
                    {
                      name: "Bluetooth Speaker",
                      stock: 38,
                      status: "Low Stock",
                      category: "Audio",
                    },
                    {
                      name: "Laptop Sleeve",
                      stock: 0,
                      status: "Out of Stock",
                      category: "Accessories",
                    },
                    {
                      name: "USB-C Cable",
                      stock: 290,
                      status: "In Stock",
                      category: "Accessories",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-9 w-9 rounded-md bg-muted flex items-center justify-center">
                          <Package className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {item.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.category}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={
                            item.status === "In Stock"
                              ? "default"
                              : item.status === "Low Stock"
                              ? "outline"
                              : "secondary"
                          }
                          className={
                            item.status === "In Stock"
                              ? "bg-green-500"
                              : item.status === "Low Stock"
                              ? "border-orange-500 text-orange-500"
                              : "bg-red-500 text-white"
                          }
                        >
                          {item.status}
                        </Badge>
                        <div className="font-medium w-12 text-right">
                          {item.stock}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                View your sales analytics data here.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground/60" />
                <p className="mt-2 text-lg font-medium">
                  Analytics charts will appear here
                </p>
                <p className="text-sm text-muted-foreground">
                  Connect your data source to view analytics
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>
                View and download your sales reports.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <PieChart className="mx-auto h-12 w-12 text-muted-foreground/60" />
                <p className="mt-2 text-lg font-medium">
                  Reports will appear here
                </p>
                <p className="text-sm text-muted-foreground">
                  Generate reports to view your data
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>View your recent notifications.</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <Bell className="mx-auto h-12 w-12 text-muted-foreground/60" />
                <p className="mt-2 text-lg font-medium">No new notifications</p>
                <p className="text-sm text-muted-foreground">
                  You're all caught up!
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
