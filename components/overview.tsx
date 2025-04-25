import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, ShoppingBag } from 'lucide-react'

type OverviewProps = {
	monthlyRevenue: number
	monthlyOrders: number
}

export function Overview({ monthlyRevenue, monthlyOrders }: OverviewProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
			<Card className="shadow-lg border-0 bg-gradient-to-br from-green-100 to-green-50">
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle className="text-lg font-semibold text-green-700">
						Doanh thu tháng này
					</CardTitle>
					<DollarSign className="w-8 h-8 text-green-500" />
				</CardHeader>
				<CardContent>
					<div className="text-3xl font-bold text-green-800">
						{monthlyRevenue.toLocaleString()}₫
					</div>
					<div className="text-sm text-green-600 mt-1">
						Tăng trưởng ổn định
					</div>
				</CardContent>
			</Card>
			<Card className="shadow-lg border-0 bg-gradient-to-br from-blue-100 to-blue-50">
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle className="text-lg font-semibold text-blue-700">
						Đơn hàng tháng này
					</CardTitle>
					<ShoppingBag className="w-8 h-8 text-blue-500" />
				</CardHeader>
				<CardContent>
					<div className="text-3xl font-bold text-blue-800">
						{monthlyOrders}
					</div>
					<div className="text-sm text-blue-600 mt-1">
						So với tháng trước: +5%
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
