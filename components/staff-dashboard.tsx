"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RevenueChart } from "@/components/charts/revenue-chart"
import { RecentOrders } from "@/components/recent-orders"
import { StaffOverview } from "@/components/staff-overview"
import { StaffTasks } from "@/components/staff-tasks"

export function StaffDashboard() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Tổng quan</TabsTrigger>
        <TabsTrigger value="tasks">Nhiệm vụ</TabsTrigger>
        <TabsTrigger value="orders">Đơn hàng</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <StaffOverview />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Doanh số bán hàng</CardTitle>
              <CardDescription>Doanh số bán hàng của bạn trong tháng này</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <RevenueChart />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Nhiệm vụ hôm nay</CardTitle>
              <CardDescription>Danh sách nhiệm vụ cần hoàn thành</CardDescription>
            </CardHeader>
            <CardContent>
              <StaffTasks />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Đơn hàng cần xử lý</CardTitle>
            <CardDescription>Danh sách đơn hàng đang chờ xử lý</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentOrders />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="tasks" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Quản lý nhiệm vụ</CardTitle>
            <CardDescription>Danh sách tất cả nhiệm vụ của bạn</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] flex items-center justify-center text-muted-foreground">
              Danh sách nhiệm vụ đầy đủ sẽ hiển thị ở đây
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="orders" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Quản lý đơn hàng</CardTitle>
            <CardDescription>Danh sách tất cả đơn hàng</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] flex items-center justify-center text-muted-foreground">
              Danh sách đơn hàng đầy đủ sẽ hiển thị ở đây
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

