"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { useState } from "react"

interface PromotionFiltersProps {
  className?: string
}

export function PromotionFilters({ className }: PromotionFiltersProps) {
  const [dateFrom, setDateFrom] = useState<Date>()
  const [dateTo, setDateTo] = useState<Date>()

  return (
    <div className={className}>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Trạng thái</h4>
        <RadioGroup defaultValue="all">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="status-all" />
            <Label htmlFor="status-all">Tất cả</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="active" id="status-active" />
            <Label htmlFor="status-active">Đang hoạt động</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="upcoming" id="status-upcoming" />
            <Label htmlFor="status-upcoming">Sắp diễn ra</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="expired" id="status-expired" />
            <Label htmlFor="status-expired">Đã kết thúc</Label>
          </div>
        </RadioGroup>
      </div>

      <Separator className="my-4" />

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Loại khuyến mãi</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="type-all" />
            <Label htmlFor="type-all">Tất cả</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="type-percentage" />
            <Label htmlFor="type-percentage">Giảm giá phần trăm</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="type-fixed" />
            <Label htmlFor="type-fixed">Giảm giá tiền mặt</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="type-shipping" />
            <Label htmlFor="type-shipping">Miễn phí vận chuyển</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="type-gift" />
            <Label htmlFor="type-gift">Tặng quà</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="type-buy-x-get-y" />
            <Label htmlFor="type-buy-x-get-y">Mua X tặng Y</Label>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Thời gian</h4>
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
        <h4 className="text-sm font-medium">Áp dụng cho</h4>
        <RadioGroup defaultValue="all">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="apply-all" />
            <Label htmlFor="apply-all">Tất cả</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="products" id="apply-products" />
            <Label htmlFor="apply-products">Sản phẩm cụ thể</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="categories" id="apply-categories" />
            <Label htmlFor="apply-categories">Danh mục sản phẩm</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="customers" id="apply-customers" />
            <Label htmlFor="apply-customers">Khách hàng cụ thể</Label>
          </div>
        </RadioGroup>
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

