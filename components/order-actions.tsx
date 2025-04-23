import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Printer, FileText, Truck, AlertTriangle, CheckCircle } from "lucide-react"

interface OrderActionsProps {
  orderId: string
}

export function OrderActions({ orderId }: OrderActionsProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Hành động</CardTitle>
        <CardDescription>Các thao tác có thể thực hiện với đơn hàng</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Button className="w-full justify-start" variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            In đơn hàng
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Xuất hóa đơn
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <Truck className="mr-2 h-4 w-4" />
            Cập nhật vận chuyển
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <CheckCircle className="mr-2 h-4 w-4" />
            Đánh dấu hoàn thành
          </Button>
          <Button
            className="w-full justify-start"
            variant="outline"
            className="text-red-500 hover:text-red-500 hover:bg-red-50"
          >
            <AlertTriangle className="mr-2 h-4 w-4" />
            Hủy đơn hàng
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

