import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

export function TopProducts() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Sản phẩm</TableHead>
          <TableHead className="text-right">Đã bán</TableHead>
          <TableHead>Tỷ lệ</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Áo thun basic</TableCell>
          <TableCell className="text-right">245</TableCell>
          <TableCell>
            <Progress value={85} className="h-2" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Quần jean slim fit</TableCell>
          <TableCell className="text-right">189</TableCell>
          <TableCell>
            <Progress value={65} className="h-2" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Áo khoác bomber</TableCell>
          <TableCell className="text-right">124</TableCell>
          <TableCell>
            <Progress value={45} className="h-2" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Váy liền thân</TableCell>
          <TableCell className="text-right">92</TableCell>
          <TableCell>
            <Progress value={35} className="h-2" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Túi xách mini</TableCell>
          <TableCell className="text-right">76</TableCell>
          <TableCell>
            <Progress value={25} className="h-2" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

