"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface OrderFiltersProps {
  className?: string
}

export function OrderFilters({ className }: OrderFiltersProps) {
  const [dateFrom, setDateFrom] = useState<Date>()
  const [dateTo, setDateTo] = useState<Date>()

  return (
    <div className={className}>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Trạng thái đơn hàng</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="status-new" />
            <Label htmlFor="status-new">Mới</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="status-processing" />
            <Label htmlFor="status-processing">Đang xử lý</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="status-shipping" />
            <Label htmlFor="status-shipping">Đang giao</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="status-delivered" />
            <Label htmlFor="status-delivered">Đã giao</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="status-cancelled" />
            <Label htmlFor="status-cancelled">Đã hủy</Label>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Thời gian đặt hàng</h4>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label htmlFor="date-from">Từ ngày</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date-from"
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !dateFrom && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFrom ? format(dateFrom, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid gap-1">
            <Label htmlFor="date-to">Đến ngày</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date-to"
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !dateTo && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateTo ? format(dateTo, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Phương thức thanh toán</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="payment-cod" />
            <Label htmlFor="payment-cod">COD (Tiền mặt)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="payment-bank" />
            <Label htmlFor="payment-bank">Chuyển khoản</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="payment-card" />
            <Label htmlFor="payment-card">Thẻ tín dụng/ghi nợ</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="payment-ewallet" />
            <Label htmlFor="payment-ewallet">Ví điện tử</Label>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Phương thức vận chuyển</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="shipping-express" />
            <Label htmlFor="shipping-express">Giao hàng nhanh</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="shipping-standard" />
            <Label htmlFor="shipping-standard">Giao hàng tiêu chuẩn</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="shipping-economy" />
            <Label htmlFor="shipping-economy">Giao hàng tiết kiệm</Label>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex flex-col gap-2">
        <Button className="w-full">Áp dụng bộ lọc</Button>
        <Button variant="outline" className="w-full">
          Xóa bộ lọc
        </Button>
      </div>
    </div>
  )
}

