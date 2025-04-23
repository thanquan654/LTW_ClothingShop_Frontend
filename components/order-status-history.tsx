import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { OrderStatus } from "@/types"

interface OrderStatusHistoryProps {
  orderId: string
}

export function OrderStatusHistory({ orderId }: OrderStatusHistoryProps) {
  // Mẫu dữ liệu lịch sử trạng thái
  const statusHistory = [
    {
      id: 1,
      status: "new" as OrderStatus,
      timestamp: "15/03/2024 14:30",
      staff: {
        name: "Hệ thống",
        avatar: "/placeholder-user.jpg",
        initials: "SYS",
      },
      note: "Đơn hàng mới được tạo",
    },
    {
      id: 2,
      status: "processing" as OrderStatus,
      timestamp: "15/03/2024 15:45",
      staff: {
        name: "Trần Thị B",
        avatar: "/placeholder-user.jpg",
        initials: "TB",
      },
      note: "Đơn hàng đã được xác nhận và đang được xử lý",
    },
    {
      id: 3,
      status: "shipping" as OrderStatus,
      timestamp: "16/03/2024 09:15",
      staff: {
        name: "Lê Văn D",
        avatar: "/placeholder-user.jpg",
        initials: "LD",
      },
      note: "Đơn hàng đã được giao cho đơn vị vận chuyển",
    },
  ]

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
        <CardTitle>Lịch sử trạng thái</CardTitle>
        <CardDescription>Các thay đổi trạng thái của đơn hàng</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-[1px] before:bg-border">
          {statusHistory.map((item, index) => (
            <div key={item.id} className="relative flex gap-4">
              <div className="absolute left-0 top-1 flex items-center justify-center w-10 h-10 rounded-full bg-background border border-border z-10">
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    index === 0 ? "bg-blue-500" : index === statusHistory.length - 1 ? "bg-purple-500" : "bg-orange-500"
                  }`}
                ></div>
              </div>

              <div className="flex-1 ml-12 bg-card rounded-lg border p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusBadge(item.status)}
                    <span className="text-sm text-muted-foreground">{item.timestamp}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{item.staff.name}</span>
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={item.staff.avatar} alt={item.staff.name} />
                      <AvatarFallback>{item.staff.initials}</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
                <p className="text-sm">{item.note}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

