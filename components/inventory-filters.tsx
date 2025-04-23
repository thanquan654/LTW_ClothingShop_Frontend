"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

interface InventoryFiltersProps {
  className?: string
}

export function InventoryFilters({ className }: InventoryFiltersProps) {
  const [priceRange, setPriceRange] = useState<number[]>([0, 2000000])

  return (
    <div className={className}>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Danh mục sản phẩm</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="category-all" />
            <Label htmlFor="category-all">Tất cả</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="category-shirts" />
            <Label htmlFor="category-shirts">Áo</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="category-pants" />
            <Label htmlFor="category-pants">Quần</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="category-dresses" />
            <Label htmlFor="category-dresses">Váy</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="category-accessories" />
            <Label htmlFor="category-accessories">Phụ kiện</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="category-shoes" />
            <Label htmlFor="category-shoes">Giày dép</Label>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Trạng thái tồn kho</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="stock-all" />
            <Label htmlFor="stock-all">Tất cả</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="stock-in" />
            <Label htmlFor="stock-in">Còn hàng</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="stock-low" />
            <Label htmlFor="stock-low">Sắp hết hàng</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="stock-out" />
            <Label htmlFor="stock-out">Hết hàng</Label>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="size">
          <AccordionTrigger className="text-sm font-medium py-2">Kích thước</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="size-s" />
                <Label htmlFor="size-s">S</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="size-m" />
                <Label htmlFor="size-m">M</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="size-l" />
                <Label htmlFor="size-l">L</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="size-xl" />
                <Label htmlFor="size-xl">XL</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="size-xxl" />
                <Label htmlFor="size-xxl">XXL</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="color">
          <AccordionTrigger className="text-sm font-medium py-2">Màu sắc</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="color-black" />
                <Label htmlFor="color-black">Đen</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="color-white" />
                <Label htmlFor="color-white">Trắng</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="color-red" />
                <Label htmlFor="color-red">Đỏ</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="color-blue" />
                <Label htmlFor="color-blue">Xanh</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="color-green" />
                <Label htmlFor="color-green">Xanh lá</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="color-yellow" />
                <Label htmlFor="color-yellow">Vàng</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-medium py-2">Giá vốn</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <Slider
                defaultValue={[0, 2000000]}
                max={2000000}
                step={50000}
                value={priceRange}
                onValueChange={setPriceRange}
              />
              <div className="flex items-center justify-between">
                <div className="w-full max-w-[45%]">
                  <Label htmlFor="price-from" className="text-xs">
                    Từ
                  </Label>
                  <Input
                    id="price-from"
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                    className="h-8"
                  />
                </div>
                <span className="text-center">-</span>
                <div className="w-full max-w-[45%]">
                  <Label htmlFor="price-to" className="text-xs">
                    Đến
                  </Label>
                  <Input
                    id="price-to"
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                    className="h-8"
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

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

