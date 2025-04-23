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
import { ChevronDown, Download, Upload, FileSpreadsheet, AlertTriangle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function InventoryActions() {
  const [showImportDialog, setShowImportDialog] = useState(false)
  const [showExportDialog, setShowExportDialog] = useState(false)
  const [showStockTakeDialog, setShowStockTakeDialog] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            Thao tác
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Quản lý kho hàng</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setShowImportDialog(true)}>
            <Upload className="mr-2 h-4 w-4" />
            <span>Nhập kho hàng loạt</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowExportDialog(true)}>
            <Download className="mr-2 h-4 w-4" />
            <span>Xuất kho hàng loạt</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowStockTakeDialog(true)}>
            <AlertTriangle className="mr-2 h-4 w-4" />
            <span>Kiểm kê kho hàng</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            <span>Xuất Excel</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog nhập kho hàng loạt */}
      <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Nhập kho hàng loạt</DialogTitle>
            <DialogDescription>Tải lên file Excel hoặc CSV chứa thông tin sản phẩm cần nhập kho</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="import-file">Tải lên file</Label>
              <Input id="import-file" type="file" accept=".xlsx,.xls,.csv" />
              <p className="text-xs text-muted-foreground mt-1">
                Hỗ trợ định dạng .xlsx, .xls, .csv. Tải về{" "}
                <a href="#" className="text-primary hover:underline">
                  mẫu file nhập kho
                </a>
                .
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="import-note-bulk">Ghi chú</Label>
              <Input id="import-note-bulk" placeholder="Nhập ghi chú về lô hàng nhập" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowImportDialog(false)}>
              Hủy
            </Button>
            <Button onClick={() => setShowImportDialog(false)}>Xác nhận nhập kho</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog xuất kho hàng loạt */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Xuất kho hàng loạt</DialogTitle>
            <DialogDescription>Tải lên file Excel hoặc CSV chứa thông tin sản phẩm cần xuất kho</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="export-file">Tải lên file</Label>
              <Input id="export-file" type="file" accept=".xlsx,.xls,.csv" />
              <p className="text-xs text-muted-foreground mt-1">
                Hỗ trợ định dạng .xlsx, .xls, .csv. Tải về{" "}
                <a href="#" className="text-primary hover:underline">
                  mẫu file xuất kho
                </a>
                .
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="export-reason-bulk">Lý do xuất kho</Label>
              <Input id="export-reason-bulk" placeholder="Nhập lý do xuất kho" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="export-note-bulk">Ghi chú</Label>
              <Input id="export-note-bulk" placeholder="Nhập ghi chú về lô hàng xuất" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExportDialog(false)}>
              Hủy
            </Button>
            <Button onClick={() => setShowExportDialog(false)}>Xác nhận xuất kho</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog kiểm kê kho hàng */}
      <Dialog open={showStockTakeDialog} onOpenChange={setShowStockTakeDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Kiểm kê kho hàng</DialogTitle>
            <DialogDescription>Tạo phiếu kiểm kê kho hàng mới</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="stock-take-name">Tên đợt kiểm kê</Label>
              <Input id="stock-take-name" placeholder="Nhập tên đợt kiểm kê" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock-take-date">Ngày kiểm kê</Label>
              <Input id="stock-take-date" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock-take-note">Ghi chú</Label>
              <Input id="stock-take-note" placeholder="Nhập ghi chú về đợt kiểm kê" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStockTakeDialog(false)}>
              Hủy
            </Button>
            <Button onClick={() => setShowStockTakeDialog(false)}>Tạo phiếu kiểm kê</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

