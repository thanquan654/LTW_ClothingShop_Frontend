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
import { Edit, MoreHorizontal, Trash2, Eye, EyeOff, Copy } from "lucide-react"
import Image from "next/image"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ProductsTableProps {
  selectedProducts: string[]
  setSelectedProducts: (products: string[]) => void
}

export function ProductsTable({ selectedProducts, setSelectedProducts }: ProductsTableProps) {
  const [pageSize, setPageSize] = useState("10")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)

  // Mẫu dữ liệu sản phẩm
  const products = [
    {
      id: "PRD-001",
      name: "Áo thun nam basic",
      image: "/placeholder.svg?height=80&width=80",
      sku: "AT-NAM-001",
      category: "Áo",
      price: 250000,
      status: "visible",
      stock: 45,
      brand: "HARU",
    },
    {
      id: "PRD-002",
      name: "Quần jean slim fit",
      image: "/placeholder.svg?height=80&width=80",
      sku: "QJ-NAM-001",
      category: "Quần",
      price: 650000,
      status: "visible",
      stock: 25,
      brand: "HARU",
    },
    {
      id: "PRD-003",
      name: "Áo khoác bomber",
      image: "/placeholder.svg?height=80&width=80",
      sku: "AK-NAM-001",
      category: "Áo",
      price: 850000,
      status: "visible",
      stock: 12,
      brand: "Zara",
    },
    {
      id: "PRD-004",
      name: "Váy liền thân",
      image: "/placeholder.svg?height=80&width=80",
      sku: "VL-NU-001",
      category: "Váy",
      price: 450000,
      status: "visible",
      stock: 15,
      brand: "HARU",
    },
    {
      id: "PRD-005",
      name: "Túi xách mini",
      image: "/placeholder.svg?height=80&width=80",
      sku: "TX-NU-001",
      category: "Phụ kiện",
      price: 350000,
      status: "visible",
      stock: 7,
      brand: "Zara",
    },
    {
      id: "PRD-006",
      name: "Giày thể thao nam",
      image: "/placeholder.svg?height=80&width=80",
      sku: "GT-NAM-001",
      category: "Giày dép",
      price: 750000,
      status: "visible",
      stock: 20,
      brand: "Nike",
    },
    {
      id: "PRD-007",
      name: "Áo sơ mi nữ",
      image: "/placeholder.svg?height=80&width=80",
      sku: "AS-NU-001",
      category: "Áo",
      price: 350000,
      status: "hidden",
      stock: 18,
      brand: "HARU",
    },
    {
      id: "PRD-008",
      name: "Quần short nam",
      image: "/placeholder.svg?height=80&width=80",
      sku: "QS-NAM-001",
      category: "Quần",
      price: 280000,
      status: "visible",
      stock: 30,
      brand: "Adidas",
    },
    {
      id: "PRD-009",
      name: "Áo polo nam",
      image: "/placeholder.svg?height=80&width=80",
      sku: "AP-NAM-001",
      category: "Áo",
      price: 320000,
      status: "hidden",
      stock: 0,
      brand: "Uniqlo",
    },
    {
      id: "PRD-010",
      name: "Đầm maxi nữ",
      image: "/placeholder.svg?height=80&width=80",
      sku: "DM-NU-001",
      category: "Váy",
      price: 550000,
      status: "visible",
      stock: 10,
      brand: "Zara",
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

  const handleDeleteClick = (productId: string) => {
    setProductToDelete(productId)
    setShowDeleteDialog(true)
  }

  const handleDeleteConfirm = () => {
    // Xử lý xóa sản phẩm
    console.log("Xóa sản phẩm:", productToDelete)
    setShowDeleteDialog(false)
    setProductToDelete(null)
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
              <TableHead className="hidden md:table-cell">Danh mục</TableHead>
              <TableHead className="hidden md:table-cell">Thương hiệu</TableHead>
              <TableHead className="text-right">Giá bán</TableHead>
              <TableHead className="hidden md:table-cell text-center">Trạng thái</TableHead>
              <TableHead className="hidden lg:table-cell text-center">Tồn kho</TableHead>
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
                  <div className="text-sm text-muted-foreground mt-1">SKU: {product.sku}</div>
                  <div className="md:hidden text-sm text-muted-foreground mt-1">
                    {product.category} | {product.brand}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{product.category}</TableCell>
                <TableCell className="hidden md:table-cell">{product.brand}</TableCell>
                <TableCell className="text-right">{formatCurrency(product.price)}</TableCell>
                <TableCell className="hidden md:table-cell text-center">
                  {product.status === "visible" ? (
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-700 hover:bg-green-100 hover:text-green-700"
                    >
                      <Eye className="mr-1 h-3 w-3" />
                      Hiển thị
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="bg-gray-100 text-gray-700 hover:bg-gray-100 hover:text-gray-700"
                    >
                      <EyeOff className="mr-1 h-3 w-3" />
                      Ẩn
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="hidden lg:table-cell text-center">
                  <span className={`${product.stock === 0 ? "text-red-600 font-medium" : ""}`}>{product.stock}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <a href={`/products/${product.id}`}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Chỉnh sửa</span>
                      </a>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Mở menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <a href={`/products/${product.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Chỉnh sửa</span>
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          <span>Nhân bản</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {product.status === "visible" ? (
                          <DropdownMenuItem>
                            <EyeOff className="mr-2 h-4 w-4" />
                            <span>Ẩn sản phẩm</span>
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Hiển thị sản phẩm</span>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteClick(product.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Xóa sản phẩm</span>
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

      {/* Dialog xác nhận xóa sản phẩm */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa sản phẩm</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa sản phẩm này? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700 text-white">
              Xóa sản phẩm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

