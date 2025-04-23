"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

interface ProductFiltersProps {
  className?: string
}

export function ProductFilters({ className }: ProductFiltersProps) {
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
        <h4 className="text-sm font-medium">Trạng thái hiển thị</h4>
        <RadioGroup defaultValue="all">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="status-all" />
            <Label htmlFor="status-all">Tất cả</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="visible" id="status-visible" />
            <Label htmlFor="status-visible">Hiển thị</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="hidden" id="status-hidden" />
            <Label htmlFor="status-hidden">Ẩn</Label>
          </div>
        </RadioGroup>
      </div>

      <Separator className="my-4" />

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Thương hiệu</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="brand-all" />
            <Label htmlFor="brand-all">Tất cả</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="brand-haru" />
            <Label htmlFor="brand-haru">HARU</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="brand-nike" />
            <Label htmlFor="brand-nike">Nike</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="brand-adidas" />
            <Label htmlFor="brand-adidas">Adidas</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="brand-zara" />
            <Label htmlFor="brand-zara">Zara</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="brand-uniqlo" />
            <Label htmlFor="brand-uniqlo">Uniqlo</Label>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-medium py-2">Khoảng giá</AccordionTrigger>
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

        <AccordionItem value="stock">
          <AccordionTrigger className="text-sm font-medium py-2">Tình trạng kho</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
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

