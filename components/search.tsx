"use client"

import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"

interface SearchProps {
  placeholder?: string
}

export function Search({ placeholder = "Tìm kiếm..." }: SearchProps) {
  return (
    <div className="relative w-full max-w-[300px]">
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input type="search" placeholder={placeholder} className="w-full pl-8 md:w-[300px] lg:w-[300px]" />
    </div>
  )
}

