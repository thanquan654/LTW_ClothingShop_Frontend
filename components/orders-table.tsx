'use client'

import { useEffect, useState } from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import axios from 'axios'

type Order = {
	maDonHang: string
	maUser: string
	tongTien: number
	ngayDatHang: string
	trangThaiDonHang: string
	diaChi: string
}

const statusOptions = [
	'Chờ xác nhận',
	'Đang xử lý',
	'Đang giao hàng',
	'Đã giao',
	'Đã hủy',
]

export function OrdersTable({ orders: initialOrders }: { orders: Order[] }) {
	const [orders, setOrders] = useState(initialOrders)

	useEffect(() => {
		setOrders(initialOrders)
	}, [initialOrders])

	const getStatusBadge = (status: string) => {
		switch (status) {
			case 'Chờ xác nhận':
				return (
					<Badge className="bg-blue-100 text-blue-700">
						Chờ xác nhận
					</Badge>
				)
			case 'Đang xử lý':
				return (
					<Badge className="bg-orange-100 text-orange-700">
						Đang xử lý
					</Badge>
				)
			case 'Đang giao hàng':
				return (
					<Badge className="bg-purple-100 text-purple-700">
						Đang giao hàng
					</Badge>
				)
			case 'Đã giao':
				return (
					<Badge className="bg-green-100 text-green-700">
						Đã giao
					</Badge>
				)
			case 'Đã hủy':
				return <Badge className="bg-red-100 text-red-700">Đã hủy</Badge>
			default:
				return <Badge variant="outline">{status}</Badge>
		}
	}

	const handleStatusChange = async (maDonHang: string, newStatus: string) => {
		// Gọi API cập nhật trạng thái ở đây (ví dụ)
		axios.put(
			`https://localhost:7275/api/Order/${maDonHang}/change-status`,
			{
				newStatus: newStatus,
			},
		)

		// Cập nhật lại UI
		setOrders((prev) =>
			prev.map((order) =>
				order.maDonHang === maDonHang
					? { ...order, trangThaiDonHang: newStatus }
					: order,
			),
		)
	}

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[120px]">Mã đơn hàng</TableHead>
					<TableHead>Khách hàng</TableHead>
					<TableHead>Địa chỉ</TableHead>
					<TableHead>Ngày đặt</TableHead>
					<TableHead className="text-right">Tổng tiền</TableHead>
					<TableHead>Trạng thái</TableHead>
					<TableHead>Đổi trạng thái</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{orders.map((order) => (
					<TableRow key={order.maDonHang}>
						<TableCell>
							<a
								href={`/admin/orders/${order.maDonHang}`}
								className="text-primary hover:underline"
							>
								{order.maDonHang}
							</a>
						</TableCell>
						<TableCell>{order.maUser}</TableCell>
						<TableCell>{order.diaChi}</TableCell>
						<TableCell>
							{new Date(order.ngayDatHang).toLocaleString(
								'vi-VN',
							)}
						</TableCell>
						<TableCell className="text-right">
							{order.tongTien.toLocaleString()}₫
						</TableCell>
						<TableCell>
							{getStatusBadge(order.trangThaiDonHang)}
						</TableCell>
						<TableCell>
							<select
								className="border rounded px-2 py-1"
								value={order.trangThaiDonHang}
								onChange={(e) =>
									handleStatusChange(
										order.maDonHang,
										e.target.value,
									)
								}
							>
								{statusOptions.map((status) => (
									<option key={status} value={status}>
										{status}
									</option>
								))}
							</select>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
