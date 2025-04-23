"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send } from "lucide-react"

interface OrderNotesProps {
  orderId: string
}

export function OrderNotes({ orderId }: OrderNotesProps) {
  const [note, setNote] = useState("")

  // Mẫu dữ liệu ghi chú
  const notes = [
    {
      id: 1,
      content: "Khách hàng yêu cầu giao hàng vào buổi chiều sau 5h.",
      timestamp: "15/03/2024 15:45",
      staff: {
        name: "Trần Thị B",
        avatar: "/placeholder-user.jpg",
        initials: "TB",
      },
    },
    {
      id: 2,
      content: "Đã liên hệ với khách hàng để xác nhận đơn hàng. Khách hàng xác nhận thông tin đơn hàng chính xác.",
      timestamp: "15/03/2024 16:30",
      staff: {
        name: "Lê Văn D",
        avatar: "/placeholder-user.jpg",
        initials: "LD",
      },
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Xử lý thêm ghi chú
    console.log("Thêm ghi chú:", note)
    setNote("")
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Ghi chú đơn hàng</CardTitle>
        <CardDescription>Ghi chú nội bộ về đơn hàng (chỉ hiển thị cho nhân viên)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-4">
          {notes.map((item) => (
            <div key={item.id} className="flex gap-3 p-3 bg-muted/50 rounded-lg">
              <Avatar className="h-8 w-8">
                <AvatarImage src={item.staff.avatar} alt={item.staff.name} />
                <AvatarFallback>{item.staff.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">{item.staff.name}</span>
                  <span className="text-xs text-muted-foreground">{item.timestamp}</span>
                </div>
                <p className="text-sm">{item.content}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            placeholder="Thêm ghi chú về đơn hàng..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="min-h-[80px]"
          />
          <Button type="submit" size="icon" className="h-10 w-10 shrink-0 self-end">
            <Send className="h-4 w-4" />
            <span className="sr-only">Gửi ghi chú</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

