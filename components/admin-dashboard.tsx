"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RevenueChart } from "@/components/charts/revenue-chart"
import { SalesChart } from "@/components/charts/sales-chart"
import { RecentOrders } from "@/components/recent-orders"
import { TopProducts } from "@/components/top-products"
import { Overview } from "@/components/overview"

export function AdminDashboard() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Tổng quan</TabsTrigger>
        <TabsTrigger value="analytics">Phân tích</TabsTrigger>
        <TabsTrigger value="reports">Báo cáo</TabsTrigger>
        <TabsTrigger value="notifications">Thông báo</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <Overview />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Doanh thu theo thời gian</CardTitle>
              <CardDescription>Biểu đồ doanh thu theo ngày trong tháng hiện tại</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <RevenueChart />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Phân tích bán hàng</CardTitle>
              <CardDescription>Phân bổ doanh thu theo danh mục sản phẩm</CardDescription>
            </CardHeader>
            <CardContent>
              <SalesChart />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Đơn hàng gần đây</CardTitle>
              <CardDescription>Danh sách 5 đơn hàng mới nhất trong hệ thống</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentOrders />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Sản phẩm bán chạy</CardTitle>
              <CardDescription>Top 5 sản phẩm bán chạy nhất trong tháng</CardDescription>
            </CardHeader>
            <CardContent>
              <TopProducts />
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="analytics" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Phân tích chi tiết</CardTitle>
            <CardDescription>Phân tích chi tiết về doanh thu, chi phí và lợi nhuận</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] flex items-center justify-center text-muted-foreground">
              Biểu đồ phân tích chi tiết sẽ hiển thị ở đây
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="reports" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Báo cáo</CardTitle>
            <CardDescription>Quản lý và tạo báo cáo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] flex items-center justify-center text-muted-foreground">
              Danh sách báo cáo sẽ hiển thị ở đây
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="notifications" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Thông báo</CardTitle>
            <CardDescription>Quản lý thông báo hệ thống</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] flex items-center justify-center text-muted-foreground">
              Danh sách thông báo sẽ hiển thị ở đây
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

