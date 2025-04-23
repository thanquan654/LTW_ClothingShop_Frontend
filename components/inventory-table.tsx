"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, MoreHorizontal, Plus, Minus } from "lucide-react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InventoryTable() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [pageSize, setPageSize] = useState("10")
  const [showImportDialog, setShowImportDialog] = useState(false)
  const [showExportDialog, setShowExportDialog] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [quantity, setQuantity] = useState("1")

  // Mẫu dữ liệu sản phẩm
  const products = [
    {
      id: "PRD-001",
      name: "Áo thun nam basic",
      image: "/placeholder.svg?height=80&width=80",
      sku: "AT-NAM-001",
      size: "L",
      color: "Đen",
      stock: 45,
      lowStockThreshold: 10,
      costPrice: 150000,
    },
    {
      id: "PRD-002",
      name: "Áo thun nam basic",
      image: "/placeholder.svg?height=80&width=80",
      sku: "AT-NAM-002",
      size: "M",
      color: "Trắng",
      stock: 32,
      lowStockThreshold: 10,
      costPrice: 150000,
    },
    {
      id: "PRD-003",
      name: "Áo thun nam basic",
      image: "/placeholder.svg?height=80&width=80",
      sku: "AT-NAM-003",
      size: "S",
      color: "Xanh",
      stock: 8,
      lowStockThreshold: 10,
      costPrice: 150000,
    },
    {
      id: "PRD-004",
      name: "Quần jean slim fit",
      image: "/placeholder.svg?height=80&width=80",
      sku: "QJ-NAM-001",
      size: "32",
      color: "Xanh đậm",
      stock: 25,
      lowStockThreshold: 8,
      costPrice: 350000,
    },
    {
      id: "PRD-005",
      name: "Quần jean slim fit",
      image: "/placeholder.svg?height=80&width=80",
      sku: "QJ-NAM-002",
      size: "30",
      color: "Xanh đậm",
      stock: 18,
      lowStockThreshold: 8,
      costPrice: 350000,
    },
    {
      id: "PRD-006",
      name: "Quần jean slim fit",
      image: "/placeholder.svg?height=80&width=80",
      sku: "QJ-NAM-003",
      size: "34",
      color: "Đen",
      stock: 0,
      lowStockThreshold: 8,
      costPrice: 350000,
    },
    {
      id: "PRD-007",
      name: "Áo khoác bomber",
      image: "/placeholder.svg?height=80&width=80",
      sku: "AK-NAM-001",
      size: "XL",
      color: "Xám",
      stock: 12,
      lowStockThreshold: 5,
      costPrice: 550000,
    },
    {
      id: "PRD-008",
      name: "Áo khoác bomber",
      image: "/placeholder.svg?height=80&width=80",
      sku: "AK-NAM-002",
      size: "L",
      color: "Đen",
      stock: 3,
      lowStockThreshold: 5,
      costPrice: 550000,
    },
    {
      id: "PRD-009",
      name: "Váy liền thân",
      image: "/placeholder.svg?height=80&width=80",
      sku: "VL-NU-001",
      size: "M",
      color: "Hồng",
      stock: 15,
      lowStockThreshold: 5,
      costPrice: 450000,
    },
    {
      id: "PRD-010",
      name: "Túi xách mini",
      image: "/placeholder.svg?height=80&width=80",
      sku: "TX-NU-001",
      size: "Nhỏ",
      color: "Đen",
      stock: 7,
      lowStockThreshold: 5,
      costPrice: 250000,
    },
  ]

  const toggleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(products.map((product) => product.id))
    }
  }

  const toggleSelectProduct = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId))
    } else {
      setSelectedProducts([...selectedProducts, productId])
    }
  }

  const getStockStatus = (stock: number, threshold: number) => {
    if (stock === 0) {
      return <Badge variant="destructive">Hết hàng</Badge>
    } else if (stock <= threshold) {
      return (
        <Badge variant="outline" className="bg-orange-100 text-orange-700 hover:bg-orange-100 hover:text-orange-700">
          Sắp hết
        </Badge>
      )
    } else {
      return (
        <Badge variant="outline" className="bg-green-100 text-green-700 hover:bg-green-100 hover:text-green-700">
          Còn hàng
        </Badge>
      )
    }
  }

  const handleImport = (product: any) => {
    setSelectedProduct(product)
    setShowImportDialog(true)
  }

  const handleExport = (product: any) => {
    setSelectedProduct(product)
    setShowExportDialog(true)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount).replace("₫", "đ")
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedProducts.length === products.length && products.length > 0}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className="w-[80px]">Hình ảnh</TableHead>
              <TableHead>Sản phẩm</TableHead>
              <TableHead className="hidden md:table-cell">Mã SKU</TableHead>
              <TableHead className="hidden md:table-cell">Kích thước</TableHead>
              <TableHead className="hidden md:table-cell">Màu sắc</TableHead>
              <TableHead className="text-center">Tồn kho</TableHead>
              <TableHead className="hidden lg:table-cell text-right">Giá vốn</TableHead>
              <TableHead className="w-[100px]">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedProducts.includes(product.id)}
                    onCheckedChange={() => toggleSelectProduct(product.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="h-16 w-16 relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  <a href={`/products/${product.id}`} className="text-primary hover:underline">
                    {product.name}
                  </a>
                  <div className="md:hidden mt-1 text-sm text-muted-foreground">
                    {product.sku} | {product.size} | {product.color}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{product.sku}</TableCell>
                <TableCell className="hidden md:table-cell">{product.size}</TableCell>
                <TableCell className="hidden md:table-cell">{product.color}</TableCell>
                <TableCell className="text-center">
                  <div className="flex flex-col items-center gap-1">
                    <span
                      className={`font-medium ${product.stock <= product.lowStockThreshold ? "text-orange-600" : ""} ${product.stock === 0 ? "text-red-600" : ""}`}
                    >
                      {product.stock}
                    </span>
                    {getStockStatus(product.stock, product.lowStockThreshold)}
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell text-right">{formatCurrency(product.costPrice)}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Mở menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleImport(product)}>
                          <Plus className="mr-2 h-4 w-4" />
                          <span>Nhập kho</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleExport(product)}>
                          <Minus className="mr-2 h-4 w-4" />
                          <span>Xuất kho</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Chỉnh sửa</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">Hiển thị</p>
          <Select value={pageSize} onValueChange={setPageSize}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">trên tổng số {products.length} sản phẩm</p>
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Dialog nhập kho */}
      <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Nhập kho sản phẩm</DialogTitle>
            <DialogDescription>Nhập số lượng sản phẩm cần thêm vào kho</DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 relative">
                  <Image
                    src={selectedProduct.image || "/placeholder.svg"}
                    alt={selectedProduct.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div>
                  <h4 className="font-medium">{selectedProduct.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedProduct.sku} | {selectedProduct.size} | {selectedProduct.color}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current-stock">Tồn kho hiện tại</Label>
                  <Input id="current-stock" value={selectedProduct.stock} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="import-quantity">Số lượng nhập thêm</Label>
                  <Input
                    id="import-quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="import-note">Ghi chú</Label>
                <Input id="import-note" placeholder="Nhập ghi chú về lô hàng nhập" />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowImportDialog(false)}>
              Hủy
            </Button>
            <Button onClick={() => setShowImportDialog(false)}>Xác nhận nhập kho</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog xuất kho */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Xuất kho sản phẩm</DialogTitle>
            <DialogDescription>Nhập số lượng sản phẩm cần xuất ra khỏi kho</DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 relative">
                  <Image
                    src={selectedProduct.image || "/placeholder.svg"}
                    alt={selectedProduct.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div>
                  <h4 className="font-medium">{selectedProduct.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedProduct.sku} | {selectedProduct.size} | {selectedProduct.color}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current-stock-export">Tồn kho hiện tại</Label>
                  <Input id="current-stock-export" value={selectedProduct.stock} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="export-quantity">Số lượng xuất</Label>
                  <Input
                    id="export-quantity"
                    type="number"
                    min="1"
                    max={selectedProduct.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="export-reason">Lý do xuất kho</Label>
                <Select defaultValue="order">
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn lý do xuất kho" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="order">Đơn hàng</SelectItem>
                    <SelectItem value="damage">Hàng hỏng</SelectItem>
                    <SelectItem value="return">Trả về nhà cung cấp</SelectItem>
                    <SelectItem value="other">Khác</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="export-note">Ghi chú</Label>
                <Input id="export-note" placeholder="Nhập ghi chú về lô hàng xuất" />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExportDialog(false)}>
              Hủy
            </Button>
            <Button onClick={() => setShowExportDialog(false)}>Xác nhận xuất kho</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

