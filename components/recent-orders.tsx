import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentOrders() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Mã đơn</TableHead>
          <TableHead>Khách hàng</TableHead>
          <TableHead>Sản phẩm</TableHead>
          <TableHead className="text-right">Tổng tiền</TableHead>
          <TableHead className="text-right">Trạng thái</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">#4321</TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                <AvatarFallback>NT</AvatarFallback>
              </Avatar>
              <span>Nguyễn Thị B</span>
            </div>
          </TableCell>
          <TableCell>Áo thun, Quần jean</TableCell>
          <TableCell className="text-right">1.250.000đ</TableCell>
          <TableCell className="text-right">
            <Badge
              variant="outline"
              className="bg-orange-100 text-orange-700 hover:bg-orange-100 hover:text-orange-700"
            >
              Đang xử lý
            </Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">#4320</TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                <AvatarFallback>TH</AvatarFallback>
              </Avatar>
              <span>Trần Huy C</span>
            </div>
          </TableCell>
          <TableCell>Áo khoác, Mũ</TableCell>
          <TableCell className="text-right">2.100.000đ</TableCell>
          <TableCell className="text-right">
            <Badge variant="outline" className="bg-green-100 text-green-700 hover:bg-green-100 hover:text-green-700">
              Đã giao
            </Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">#4319</TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                <AvatarFallback>LM</AvatarFallback>
              </Avatar>
              <span>Lê Minh D</span>
            </div>
          </TableCell>
          <TableCell>Váy, Túi xách</TableCell>
          <TableCell className="text-right">1.850.000đ</TableCell>
          <TableCell className="text-right">
            <Badge variant="outline" className="bg-blue-100 text-blue-700 hover:bg-blue-100 hover:text-blue-700">
              Đang giao
            </Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">#4318</TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                <AvatarFallback>PH</AvatarFallback>
              </Avatar>
              <span>Phạm Hoàng E</span>
            </div>
          </TableCell>
          <TableCell>Giày, Tất</TableCell>
          <TableCell className="text-right">950.000đ</TableCell>
          <TableCell className="text-right">
            <Badge variant="outline" className="bg-green-100 text-green-700 hover:bg-green-100 hover:text-green-700">
              Đã giao
            </Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">#4317</TableCell>
          <TableCell>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                <AvatarFallback>VT</AvatarFallback>
              </Avatar>
              <span>Vũ Thị F</span>
            </div>
          </TableCell>
          <TableCell>Áo sơ mi, Quần tây</TableCell>
          <TableCell className="text-right">1.450.000đ</TableCell>
          <TableCell className="text-right">
            <Badge variant="outline" className="bg-red-100 text-red-700 hover:bg-red-100 hover:text-red-700">
              Đã hủy
            </Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

