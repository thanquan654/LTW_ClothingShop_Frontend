"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { OrderStatus } from "@/types"

interface OrderDetailsProps {
  orderId: string
}

export function OrderDetails({ orderId }: OrderDetailsProps) {
  // Mẫu dữ liệu đơn hàng
  const orderData = {
    id: orderId,
    date: "15/03/2024 14:30",
    status: "processing" as OrderStatus,
    paymentMethod: "COD (Tiền mặt khi nhận hàng)",
    shippingMethod: "Giao hàng nhanh",
    staff: {
      id: "STF-001",
      name: "Trần Thị B",
      avatar: "/placeholder-user.jpg",
      initials: "TB",
    },
  }

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 hover:text-blue-700">Mới</Badge>
      case "processing":
        return (
          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 hover:text-orange-700">Đang xử lý</Badge>
        )
      case "shipping":
        return (
          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 hover:text-purple-700">Đang giao</Badge>
        )
      case "delivered":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 hover:text-green-700">Đã giao</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 hover:text-red-700">Đã hủy</Badge>
      default:
        return <Badge>Không xác định</Badge>
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Thông tin đơn hàng</CardTitle>
        <CardDescription>Chi tiết về đơn hàng và trạng thái hiện tại</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Mã đơn hàng</Label>
              <div className="font-medium">{orderData.id}</div>
            </div>

            <div className="space-y-2">
              <Label>Ngày đặt hàng</Label>
              <div className="font-medium">{orderData.date}</div>
            </div>

            <div className="space-y-2">
              <Label>Trạng thái đơn hàng</Label>
              <div className="flex items-center gap-2">
                <Select defaultValue={orderData.status}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">Mới</SelectItem>
                    <SelectItem value="processing">Đang xử lý</SelectItem>
                    <SelectItem value="shipping">Đang giao</SelectItem>
                    <SelectItem value="delivered">Đã giao</SelectItem>
                    <SelectItem value="cancelled">Đã hủy</SelectItem>
                  </SelectContent>
                </Select>
                {getStatusBadge(orderData.status)}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Phương thức thanh toán</Label>
              <div className="font-medium">{orderData.paymentMethod}</div>
            </div>

            <div className="space-y-2">
              <Label>Phương thức vận chuyển</Label>
              <div className="font-medium">{orderData.shippingMethod}</div>
            </div>

            <div className="space-y-2">
              <Label>Nhân viên xử lý</Label>
              <Select defaultValue={orderData.staff.id}>
                <SelectTrigger className="w-full">
                  <SelectValue>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={orderData.staff.avatar} alt={orderData.staff.name} />
                        <AvatarFallback>{orderData.staff.initials}</AvatarFallback>
                      </Avatar>
                      <span>{orderData.staff.name}</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="STF-001">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder-user.jpg" alt="Trần Thị B" />
                        <AvatarFallback>TB</AvatarFallback>
                      </Avatar>
                      <span>Trần Thị B</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="STF-002">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder-user.jpg" alt="Lê Văn D" />
                        <AvatarFallback>LD</AvatarFallback>
                      </Avatar>
                      <span>Lê Văn D</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="STF-003">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder-user.jpg" alt="Nguyễn Văn F" />
                        <AvatarFallback>NF</AvatarFallback>
                      </Avatar>
                      <span>Nguyễn Văn F</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

