import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react"

interface CustomerDetailsProps {
  orderId: string
}

export function CustomerDetails({ orderId }: CustomerDetailsProps) {
  // Mẫu dữ liệu khách hàng
  const customerData = {
    id: "CUS-1234",
    name: "Nguyễn Văn A",
    phone: "0912 345 678",
    email: "nguyenvana@example.com",
    avatar: "/placeholder-user.jpg",
    initials: "NA",
    address: {
      street: "123 Đường Lê Lợi",
      ward: "Phường Bến Nghé",
      district: "Quận 1",
      city: "TP. Hồ Chí Minh",
      country: "Việt Nam",
    },
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Thông tin khách hàng</CardTitle>
        <CardDescription>Chi tiết về khách hàng và địa chỉ giao hàng</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={customerData.avatar} alt={customerData.name} />
            <AvatarFallback>{customerData.initials}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{customerData.name}</h3>
            <p className="text-sm text-muted-foreground">Mã KH: {customerData.id}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{customerData.phone}</span>
          </div>

          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{customerData.email}</span>
          </div>

          <div className="flex gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground mt-1 shrink-0" />
            <span>
              {customerData.address.street}, {customerData.address.ward}, {customerData.address.district},{" "}
              {customerData.address.city}, {customerData.address.country}
            </span>
          </div>
        </div>

        <Button variant="outline" size="sm" className="w-full mt-4" asChild>
          <a href={`/customers/${customerData.id}`}>
            Xem hồ sơ khách hàng
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}

