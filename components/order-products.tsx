import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

interface OrderProductsProps {
  orderId: string
}

export function OrderProducts({ orderId }: OrderProductsProps) {
  // Mẫu dữ liệu sản phẩm trong đơn hàng
  const products = [
    {
      id: "PRD-001",
      name: "Áo thun nam basic",
      image: "/placeholder.svg?height=80&width=80",
      size: "L",
      color: "Đen",
      quantity: 2,
      price: 250000,
      total: 500000,
    },
    {
      id: "PRD-002",
      name: "Quần jean slim fit",
      image: "/placeholder.svg?height=80&width=80",
      size: "32",
      color: "Xanh đậm",
      quantity: 1,
      price: 650000,
      total: 650000,
    },
    {
      id: "PRD-003",
      name: "Áo khoác bomber",
      image: "/placeholder.svg?height=80&width=80",
      size: "XL",
      color: "Xám",
      quantity: 1,
      price: 850000,
      total: 850000,
    },
  ]

  // Tính toán tổng tiền
  const subtotal = products.reduce((sum, product) => sum + product.total, 0)
  const shippingFee = 30000
  const discount = 200000
  const total = subtotal + shippingFee - discount

  // Format tiền tệ
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount).replace("₫", "đ")
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Sản phẩm trong đơn hàng</CardTitle>
        <CardDescription>Danh sách sản phẩm và thông tin thanh toán</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Hình ảnh</TableHead>
                <TableHead>Sản phẩm</TableHead>
                <TableHead className="hidden md:table-cell">Kích thước</TableHead>
                <TableHead className="hidden md:table-cell">Màu sắc</TableHead>
                <TableHead className="text-center">Số lượng</TableHead>
                <TableHead className="text-right">Đơn giá</TableHead>
                <TableHead className="text-right">Thành tiền</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="h-20 w-20 relative">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    <a href={`/products/${product.id}`} className="hover:underline text-primary">
                      {product.name}
                    </a>
                    <div className="md:hidden mt-1 text-sm text-muted-foreground">
                      {product.size} / {product.color}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{product.size}</TableCell>
                  <TableCell className="hidden md:table-cell">{product.color}</TableCell>
                  <TableCell className="text-center">{product.quantity}</TableCell>
                  <TableCell className="text-right">{formatCurrency(product.price)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(product.total)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tổng tiền hàng:</span>
            <span className="font-medium">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Phí vận chuyển:</span>
            <span className="font-medium">{formatCurrency(shippingFee)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Giảm giá (Mã: SUMMER2024):</span>
            <span className="font-medium text-red-500">-{formatCurrency(discount)}</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="font-semibold text-lg">Tổng thanh toán:</span>
            <span className="font-bold text-lg">{formatCurrency(total)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

