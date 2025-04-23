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
import { Edit, MoreHorizontal, Trash2, Copy, Play, Pause } from "lucide-react"
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

interface PromotionsTableProps {
  selectedPromotions: string[]
  setSelectedPromotions: (promotions: string[]) => void
}

type PromotionStatus = "active" | "upcoming" | "expired"
type PromotionType = "percentage" | "fixed" | "shipping" | "gift" | "buy-x-get-y"

interface Promotion {
  id: string
  name: string
  code: string
  type: PromotionType
  value: string
  startDate: string
  endDate: string
  status: PromotionStatus
  applyTo: string
  minPurchase?: number
}

export function PromotionsTable({ selectedPromotions, setSelectedPromotions }: PromotionsTableProps) {
  const [pageSize, setPageSize] = useState("10")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [promotionToDelete, setPromotionToDelete] = useState<string | null>(null)

  // Mẫu dữ liệu khuyến mãi
  const promotions: Promotion[] = [
    {
      id: "PROMO-001",
      name: "Giảm giá mùa hè",
      code: "SUMMER2024",
      type: "percentage",
      value: "20%",
      startDate: "01/06/2024 00:00",
      endDate: "30/06/2024 23:59",
      status: "upcoming",
      applyTo: "Tất cả sản phẩm",
      minPurchase: 500000,
    },
    {
      id: "PROMO-002",
      name: "Khuyến mãi Black Friday",
      code: "BLACK24",
      type: "percentage",
      value: "50%",
      startDate: "29/11/2024 00:00",
      endDate: "01/12/2024 23:59",
      status: "upcoming",
      applyTo: "Danh mục: Áo, Quần",
    },
    {
      id: "PROMO-003",
      name: "Giảm 100K cho đơn hàng từ 500K",
      code: "SAVE100K",
      type: "fixed",
      value: "100.000đ",
      startDate: "15/03/2024 00:00",
      endDate: "15/04/2024 23:59",
      status: "active",
      applyTo: "Tất cả sản phẩm",
      minPurchase: 500000,
    },
    {
      id: "PROMO-004",
      name: "Miễn phí vận chuyển",
      code: "FREESHIP",
      type: "shipping",
      value: "Miễn phí",
      startDate: "01/03/2024 00:00",
      endDate: "31/03/2024 23:59",
      status: "active",
      applyTo: "Tất cả sản phẩm",
      minPurchase: 300000,
    },
    {
      id: "PROMO-005",
      name: "Tặng túi tote khi mua áo",
      code: "FREETOTE",
      type: "gift",
      value: "Túi tote",
      startDate: "01/02/2024 00:00",
      endDate: "28/02/2024 23:59",
      status: "expired",
      applyTo: "Danh mục: Áo",
    },
    {
      id: "PROMO-006",
      name: "Mua 2 tặng 1",
      code: "BUY2GET1",
      type: "buy-x-get-y",
      value: "Mua 2 tặng 1",
      startDate: "10/03/2024 00:00",
      endDate: "10/04/2024 23:59",
      status: "active",
      applyTo: "Danh mục: Phụ kiện",
    },
    {
      id: "PROMO-007",
      name: "Giảm 15% cho khách hàng VIP",
      code: "VIP15",
      type: "percentage",
      value: "15%",
      startDate: "01/01/2024 00:00",
      endDate: "31/12/2024 23:59",
      status: "active",
      applyTo: "Nhóm khách hàng: VIP",
    },
    {
      id: "PROMO-008",
      name: "Giảm 10% cho đơn hàng đầu tiên",
      code: "FIRST10",
      type: "percentage",
      value: "10%",
      startDate: "01/01/2024 00:00",
      endDate: "31/12/2024 23:59",
      status: "active",
      applyTo: "Khách hàng mới",
    },
    {
      id: "PROMO-009",
      name: "Giảm 30% cho sản phẩm hết mùa",
      code: "SEASON30",
      type: "percentage",
      value: "30%",
      startDate: "15/01/2024 00:00",
      endDate: "15/02/2024 23:59",
      status: "expired",
      applyTo: "Danh mục: Áo khoác, Áo len",
    },
    {
      id: "PROMO-010",
      name: "Giảm 200K cho đơn hàng từ 1 triệu",
      code: "SAVE200K",
      type: "fixed",
      value: "200.000đ",
      startDate: "01/04/2024 00:00",
      endDate: "30/04/2024 23:59",
      status: "upcoming",
      applyTo: "Tất cả sản phẩm",
      minPurchase: 1000000,
    },
  ]

  const toggleSelectAll = () => {
    if (selectedPromotions.length === promotions.length) {
      setSelectedPromotions([])
    } else {
      setSelectedPromotions(promotions.map((promotion) => promotion.id))
    }
  }

  const toggleSelectPromotion = (promotionId: string) => {
    if (selectedPromotions.includes(promotionId)) {
      setSelectedPromotions(selectedPromotions.filter((id) => id !== promotionId))
    } else {
      setSelectedPromotions([...selectedPromotions, promotionId])
    }
  }

  const handleDeleteClick = (promotionId: string) => {
    setPromotionToDelete(promotionId)
    setShowDeleteDialog(true)
  }

  const handleDeleteConfirm = () => {
    // Xử lý xóa khuyến mãi
    console.log("Xóa khuyến mãi:", promotionToDelete)
    setShowDeleteDialog(false)
    setPromotionToDelete(null)
  }

  const getStatusBadge = (status: PromotionStatus) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 hover:text-green-700">Đang hoạt động</Badge>
        )
      case "upcoming":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 hover:text-blue-700">Sắp diễn ra</Badge>
      case "expired":
        return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 hover:text-gray-700">Đã kết thúc</Badge>
      default:
        return <Badge>Không xác định</Badge>
    }
  }

  const getPromotionTypeBadge = (type: PromotionType) => {
    switch (type) {
      case "percentage":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-50 hover:text-purple-700">
            Giảm giá %
          </Badge>
        )
      case "fixed":
        return (
          <Badge variant="outline" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-700">
            Giảm tiền
          </Badge>
        )
      case "shipping":
        return (
          <Badge variant="outline" className="bg-teal-50 text-teal-700 hover:bg-teal-50 hover:text-teal-700">
            Miễn phí vận chuyển
          </Badge>
        )
      case "gift":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50 hover:text-amber-700">
            Tặng quà
          </Badge>
        )
      case "buy-x-get-y":
        return (
          <Badge variant="outline" className="bg-rose-50 text-rose-700 hover:bg-rose-50 hover:text-rose-700">
            Mua X tặng Y
          </Badge>
        )
      default:
        return <Badge variant="outline">Khác</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedPromotions.length === promotions.length && promotions.length > 0}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>Tên khuyến mãi</TableHead>
              <TableHead className="hidden md:table-cell">Loại</TableHead>
              <TableHead className="hidden md:table-cell">Giá trị</TableHead>
              <TableHead className="hidden lg:table-cell">Thời gian bắt đầu</TableHead>
              <TableHead className="hidden lg:table-cell">Thời gian kết thúc</TableHead>
              <TableHead className="text-center">Trạng thái</TableHead>
              <TableHead className="w-[100px]">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {promotions.map((promotion) => (
              <TableRow key={promotion.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedPromotions.includes(promotion.id)}
                    onCheckedChange={() => toggleSelectPromotion(promotion.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <a href={`/promotions/${promotion.id}`} className="text-primary hover:underline">
                    {promotion.name}
                  </a>
                  <div className="text-sm text-muted-foreground mt-1">Mã: {promotion.code}</div>
                  <div className="md:hidden text-xs text-muted-foreground mt-1">
                    {getPromotionTypeBadge(promotion.type)} | {promotion.value}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{getPromotionTypeBadge(promotion.type)}</TableCell>
                <TableCell className="hidden md:table-cell">{promotion.value}</TableCell>
                <TableCell className="hidden lg:table-cell">{promotion.startDate}</TableCell>
                <TableCell className="hidden lg:table-cell">{promotion.endDate}</TableCell>
                <TableCell className="text-center">{getStatusBadge(promotion.status)}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <a href={`/promotions/${promotion.id}`}>
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
                          <a href={`/promotions/${promotion.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Chỉnh sửa</span>
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          <span>Nhân bản</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {promotion.status === "active" ? (
                          <DropdownMenuItem>
                            <Pause className="mr-2 h-4 w-4" />
                            <span>Tạm dừng</span>
                          </DropdownMenuItem>
                        ) : promotion.status !== "expired" ? (
                          <DropdownMenuItem>
                            <Play className="mr-2 h-4 w-4" />
                            <span>Kích hoạt</span>
                          </DropdownMenuItem>
                        ) : null}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteClick(promotion.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Xóa khuyến mãi</span>
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
          <p className="text-sm text-muted-foreground">trên tổng số {promotions.length} khuyến mãi</p>
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

      {/* Dialog xác nhận xóa khuyến mãi */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa khuyến mãi</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa khuyến mãi này? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700 text-white">
              Xóa khuyến mãi
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

