"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Play, Pause, Copy, Trash2 } from "lucide-react"
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
import { useState } from "react"

interface PromotionBulkActionsProps {
  selectedPromotions: string[]
}

export function PromotionBulkActions({ selectedPromotions }: PromotionBulkActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleBulkDelete = () => {
    setShowDeleteDialog(true)
  }

  const handleDeleteConfirm = () => {
    // Xử lý xóa khuyến mãi hàng loạt
    console.log("Xóa khuyến mãi hàng loạt:", selectedPromotions)
    setShowDeleteDialog(false)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Hành động ({selectedPromotions.length})
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Hành động hàng loạt</DropdownMenuLabel>
          <DropdownMenuItem>
            <Play className="mr-2 h-4 w-4" />
            <span>Kích hoạt khuyến mãi</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Pause className="mr-2 h-4 w-4" />
            <span>Tạm dừng khuyến mãi</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Copy className="mr-2 h-4 w-4" />
            <span>Nhân bản khuyến mãi</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600" onClick={handleBulkDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Xóa khuyến mãi</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog xác nhận xóa khuyến mãi hàng loạt */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa khuyến mãi</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa {selectedPromotions.length} khuyến mãi đã chọn? Hành động này không thể hoàn
              tác.
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
    </>
  )
}

