'use client'

import { useEffect, useState } from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Overview } from '@/components/overview'
import { RecentOrders } from '@/components/recent-orders'
import { TopProducts } from '@/components/top-products'

export function AdminDashboard() {
	const [data, setData] = useState<any>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch(
				'https://localhost:7275/api/Dashboard/overview',
			)
			const json = await res.json()
			setData(json)
			setLoading(false)
		}
		fetchData()
	}, [])

	if (loading)
		return <div className="text-center py-10 text-lg">Đang tải...</div>
	if (!data)
		return (
			<div className="text-center py-10 text-red-500">
				Lỗi tải dữ liệu
			</div>
		)

	return (
		<div className="bg-gradient-to-br from-gray-50 to-white min-h-screen rounded-xl p-4 md:p-8">
			<Tabs defaultValue="overview" className="space-y-4">
				<TabsList className="bg-white shadow rounded-lg mb-4">
					<TabsTrigger value="overview">Tổng quan</TabsTrigger>
					<TabsTrigger value="analytics">Phân tích</TabsTrigger>
					<TabsTrigger value="reports">Báo cáo</TabsTrigger>
					<TabsTrigger value="notifications">Thông báo</TabsTrigger>
				</TabsList>
				<TabsContent value="overview" className="space-y-6">
					<Overview
						monthlyRevenue={data.monthlyRevenue}
						monthlyOrders={data.monthlyOrders}
					/>
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
						<Card className="col-span-4 shadow-lg border-0 bg-white rounded-xl">
							<CardHeader>
								<CardTitle>Đơn hàng gần đây</CardTitle>
								<CardDescription>
									Danh sách 5 đơn hàng mới nhất trong hệ thống
								</CardDescription>
							</CardHeader>
							<CardContent>
								<RecentOrders orders={data.recentOrders} />
							</CardContent>
						</Card>
						<Card className="col-span-3 shadow-lg border-0 bg-white rounded-xl">
							<CardHeader>
								<CardTitle>Sản phẩm bán chạy</CardTitle>
								<CardDescription>
									Top 5 sản phẩm bán chạy nhất trong tháng
								</CardDescription>
							</CardHeader>
							<CardContent>
								<TopProducts
									products={data.bestSellingProducts}
								/>
							</CardContent>
						</Card>
					</div>
				</TabsContent>
				<TabsContent value="analytics" className="space-y-4">
					<Card className="shadow-lg border-0 bg-white rounded-xl">
						<CardHeader>
							<CardTitle>Phân tích chi tiết</CardTitle>
							<CardDescription>
								Phân tích chi tiết về doanh thu, chi phí và lợi
								nhuận
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="h-[400px] flex items-center justify-center text-muted-foreground">
								Biểu đồ phân tích chi tiết sẽ hiển thị ở đây
							</div>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="reports" className="space-y-4">
					<Card className="shadow-lg border-0 bg-white rounded-xl">
						<CardHeader>
							<CardTitle>Báo cáo</CardTitle>
							<CardDescription>
								Quản lý và tạo báo cáo
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="h-[400px] flex items-center justify-center text-muted-foreground">
								Danh sách báo cáo sẽ hiển thị ở đây
							</div>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="notifications" className="space-y-4">
					<Card className="shadow-lg border-0 bg-white rounded-xl">
						<CardHeader>
							<CardTitle>Thông báo</CardTitle>
							<CardDescription>
								Quản lý thông báo hệ thống
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="h-[400px] flex items-center justify-center text-muted-foreground">
								Danh sách thông báo sẽ hiển thị ở đây
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	)
}
