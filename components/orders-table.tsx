'use client'

import { useState } from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Eye, MoreHorizontal, Printer } from 'lucide-react'
import type { OrderStatus } from '@/types'

interface OrdersTableProps {
	selectedOrders: string[]
	setSelectedOrders: (orders: string[]) => void
}

// Mẫu dữ liệu đơn hàng
const orders = [
	{
		id: 'ORD-5321',
		customer: {
			name: 'Nguyễn Văn A',
			avatar: '/placeholder-user.jpg',
			initials: 'NA',
		},
		date: '15/03/2024',
		total: '1.250.000đ',
		status: 'processing' as OrderStatus,
		staff: {
			name: 'Trần Thị B',
			avatar: '/placeholder-user.jpg',
			initials: 'TB',
		},
	},
	{
		id: 'ORD-5320',
		customer: {
			name: 'Trần Văn C',
			avatar: '/placeholder-user.jpg',
			initials: 'TC',
		},
		date: '14/03/2024',
		total: '850.000đ',
		status: 'delivered' as OrderStatus,
		staff: {
			name: 'Lê Văn D',
			avatar: '/placeholder-user.jpg',
			initials: 'LD',
		},
	},
	{
		id: 'ORD-5319',
		customer: {
			name: 'Phạm Thị E',
			avatar: '/placeholder-user.jpg',
			initials: 'PE',
		},
		date: '14/03/2024',
		total: '2.100.000đ',
		status: 'new' as OrderStatus,
		staff: {
			name: 'Nguyễn Văn F',
			avatar: '/placeholder-user.jpg',
			initials: 'NF',
		},
	},
	{
		id: 'ORD-5318',
		customer: {
			name: 'Hoàng Văn G',
			avatar: '/placeholder-user.jpg',
			initials: 'HG',
		},
		date: '13/03/2024',
		total: '1.750.000đ',
		status: 'shipping' as OrderStatus,
		staff: {
			name: 'Trần Thị B',
			avatar: '/placeholder-user.jpg',
			initials: 'TB',
		},
	},
	{
		id: 'ORD-5317',
		customer: {
			name: 'Lê Thị H',
			avatar: '/placeholder-user.jpg',
			initials: 'LH',
		},
		date: '13/03/2024',
		total: '950.000đ',
		status: 'cancelled' as OrderStatus,
		staff: {
			name: 'Lê Văn D',
			avatar: '/placeholder-user.jpg',
			initials: 'LD',
		},
	},
	{
		id: 'ORD-5316',
		customer: {
			name: 'Vũ Văn I',
			avatar: '/placeholder-user.jpg',
			initials: 'VI',
		},
		date: '12/03/2024',
		total: '1.450.000đ',
		status: 'delivered' as OrderStatus,
		staff: {
			name: 'Nguyễn Văn F',
			avatar: '/placeholder-user.jpg',
			initials: 'NF',
		},
	},
	{
		id: 'ORD-5315',
		customer: {
			name: 'Đặng Thị K',
			avatar: '/placeholder-user.jpg',
			initials: 'DK',
		},
		date: '12/03/2024',
		total: '2.350.000đ',
		status: 'delivered' as OrderStatus,
		staff: {
			name: 'Trần Thị B',
			avatar: '/placeholder-user.jpg',
			initials: 'TB',
		},
	},
	{
		id: 'ORD-5314',
		customer: {
			name: 'Ngô Văn L',
			avatar: '/placeholder-user.jpg',
			initials: 'NL',
		},
		date: '11/03/2024',
		total: '1.150.000đ',
		status: 'processing' as OrderStatus,
		staff: {
			name: 'Lê Văn D',
			avatar: '/placeholder-user.jpg',
			initials: 'LD',
		},
	},
	{
		id: 'ORD-5313',
		customer: {
			name: 'Trịnh Văn M',
			avatar: '/placeholder-user.jpg',
			initials: 'TM',
		},
		date: '11/03/2024',
		total: '750.000đ',
		status: 'new' as OrderStatus,
		staff: {
			name: 'Nguyễn Văn F',
			avatar: '/placeholder-user.jpg',
			initials: 'NF',
		},
	},
	{
		id: 'ORD-5312',
		customer: {
			name: 'Bùi Thị N',
			avatar: '/placeholder-user.jpg',
			initials: 'BN',
		},
		date: '10/03/2024',
		total: '1.850.000đ',
		status: 'shipping' as OrderStatus,
		staff: {
			name: 'Trần Thị B',
			avatar: '/placeholder-user.jpg',
			initials: 'TB',
		},
	},
]

export function OrdersTable({
	selectedOrders,
	setSelectedOrders,
}: OrdersTableProps) {
	const [pageSize, setPageSize] = useState('10')

	const toggleSelectAll = () => {
		if (selectedOrders.length === orders.length) {
			setSelectedOrders([])
		} else {
			setSelectedOrders(orders.map((order) => order.id))
		}
	}

	const toggleSelectOrder = (orderId: string) => {
		if (selectedOrders.includes(orderId)) {
			setSelectedOrders(selectedOrders.filter((id) => id !== orderId))
		} else {
			setSelectedOrders([...selectedOrders, orderId])
		}
	}

	const getStatusBadge = (status: OrderStatus) => {
		switch (status) {
			case 'new':
				return (
					<Badge
						variant="outline"
						className="bg-blue-100 text-blue-700 hover:bg-blue-100 hover:text-blue-700"
					>
						Mới
					</Badge>
				)
			case 'processing':
				return (
					<Badge
						variant="outline"
						className="bg-orange-100 text-orange-700 hover:bg-orange-100 hover:text-orange-700"
					>
						Đang xử lý
					</Badge>
				)
			case 'shipping':
				return (
					<Badge
						variant="outline"
						className="bg-purple-100 text-purple-700 hover:bg-purple-100 hover:text-purple-700"
					>
						Đang giao
					</Badge>
				)
			case 'delivered':
				return (
					<Badge
						variant="outline"
						className="bg-green-100 text-green-700 hover:bg-green-100 hover:text-green-700"
					>
						Đã giao
					</Badge>
				)
			case 'cancelled':
				return (
					<Badge
						variant="outline"
						className="bg-red-100 text-red-700 hover:bg-red-100 hover:text-red-700"
					>
						Đã hủy
					</Badge>
				)
			default:
				return <Badge variant="outline">Không xác định</Badge>
		}
	}

	return (
		<div className="space-y-4">
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[50px]">
								<Checkbox
									checked={
										selectedOrders.length ===
											orders.length && orders.length > 0
									}
									onCheckedChange={toggleSelectAll}
								/>
							</TableHead>
							<TableHead className="w-[120px]">
								Mã đơn hàng
							</TableHead>
							<TableHead>Khách hàng</TableHead>
							<TableHead className="hidden md:table-cell">
								Ngày đặt
							</TableHead>
							<TableHead className="text-right">
								Tổng tiền
							</TableHead>
							<TableHead className="hidden md:table-cell">
								Trạng thái
							</TableHead>
							<TableHead className="hidden lg:table-cell">
								Nhân viên xử lý
							</TableHead>
							<TableHead className="w-[100px]">
								Hành động
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{orders.map((order) => (
							<TableRow key={order.id}>
								<TableCell>
									<Checkbox
										checked={selectedOrders.includes(
											order.id,
										)}
										onCheckedChange={() =>
											toggleSelectOrder(order.id)
										}
									/>
								</TableCell>
								<TableCell className="font-medium">
									<a
										href={`/admin/orders/${order.id}`}
										className="text-primary hover:underline"
									>
										{order.id}
									</a>
								</TableCell>
								<TableCell>
									<div className="flex items-center gap-2">
										<Avatar className="h-8 w-8">
											<AvatarImage
												src={order.customer.avatar}
												alt={order.customer.name}
											/>
											<AvatarFallback>
												{order.customer.initials}
											</AvatarFallback>
										</Avatar>
										<span>{order.customer.name}</span>
									</div>
								</TableCell>
								<TableCell className="hidden md:table-cell">
									{order.date}
								</TableCell>
								<TableCell className="text-right">
									{order.total}
								</TableCell>
								<TableCell className="hidden md:table-cell">
									{getStatusBadge(order.status)}
								</TableCell>
								<TableCell className="hidden lg:table-cell">
									<div className="flex items-center gap-2">
										<Avatar className="h-8 w-8">
											<AvatarImage
												src={order.staff.avatar}
												alt={order.staff.name}
											/>
											<AvatarFallback>
												{order.staff.initials}
											</AvatarFallback>
										</Avatar>
										<span>{order.staff.name}</span>
									</div>
								</TableCell>
								<TableCell>
									<div className="flex items-center justify-end gap-2">
										<Button
											variant="ghost"
											size="icon"
											asChild
										>
											<a href={`/orders/${order.id}`}>
												<Eye className="h-4 w-4" />
												<span className="sr-only">
													Xem chi tiết
												</span>
											</a>
										</Button>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													variant="ghost"
													size="icon"
												>
													<MoreHorizontal className="h-4 w-4" />
													<span className="sr-only">
														Mở menu
													</span>
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuLabel>
													Hành động
												</DropdownMenuLabel>
												<DropdownMenuItem>
													<Eye className="mr-2 h-4 w-4" />
													<span>Xem chi tiết</span>
												</DropdownMenuItem>
												<DropdownMenuItem>
													<Printer className="mr-2 h-4 w-4" />
													<span>In đơn hàng</span>
												</DropdownMenuItem>
												<DropdownMenuSeparator />
												<DropdownMenuItem>
													Cập nhật trạng thái
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<p className="text-sm text-muted-foreground">Hiển thị</p>
					<Select value={pageSize} onValueChange={setPageSize}>
						<SelectTrigger className="h-8 w-[70px]">
							<SelectValue placeholder="10" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="10">10</SelectItem>
							<SelectItem value="20">20</SelectItem>
							<SelectItem value="50">50</SelectItem>
							<SelectItem value="100">100</SelectItem>
						</SelectContent>
					</Select>
					<p className="text-sm text-muted-foreground">
						trên tổng số {orders.length} đơn hàng
					</p>
				</div>

				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious href="#" />
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="#" isActive>
								1
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="#">2</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="#">3</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
						<PaginationItem>
							<PaginationNext href="#" />
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		</div>
	)
}
