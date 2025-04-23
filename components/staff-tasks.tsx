import { Checkbox } from "@/components/ui/checkbox"

export function StaffTasks() {
  return (
    <div className="space-y-4">
      <div className="flex items-start space-x-4">
        <Checkbox id="task-1" />
        <div className="space-y-1 leading-none">
          <label
            htmlFor="task-1"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Kiểm tra hàng mới về
          </label>
          <p className="text-xs text-muted-foreground">Cập nhật kho hàng với 20 sản phẩm mới</p>
        </div>
      </div>
      <div className="flex items-start space-x-4">
        <Checkbox id="task-2" />
        <div className="space-y-1 leading-none">
          <label
            htmlFor="task-2"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Liên hệ khách hàng VIP
          </label>
          <p className="text-xs text-muted-foreground">Thông báo về chương trình khuyến mãi mới</p>
        </div>
      </div>
      <div className="flex items-start space-x-4">
        <Checkbox id="task-3" />
        <div className="space-y-1 leading-none">
          <label
            htmlFor="task-3"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Xử lý đơn hàng trả về
          </label>
          <p className="text-xs text-muted-foreground">3 đơn hàng cần xử lý trả về</p>
        </div>
      </div>
      <div className="flex items-start space-x-4">
        <Checkbox id="task-4" />
        <div className="space-y-1 leading-none">
          <label
            htmlFor="task-4"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Chuẩn bị báo cáo cuối ngày
          </label>
          <p className="text-xs text-muted-foreground">Tổng hợp doanh số và đơn hàng trong ngày</p>
        </div>
      </div>
      <div className="flex items-start space-x-4">
        <Checkbox id="task-5" />
        <div className="space-y-1 leading-none">
          <label
            htmlFor="task-5"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Sắp xếp khu vực trưng bày
          </label>
          <p className="text-xs text-muted-foreground">Cập nhật khu vực trưng bày với bộ sưu tập mới</p>
        </div>
      </div>
    </div>
  )
}

