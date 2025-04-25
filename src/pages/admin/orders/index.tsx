'use client'

import { useEffect, useState } from 'react'
import { AdminSidebar } from '@/components/admin-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { UserNav } from '@/components/user-nav'
import { MainNav } from '@/components/main-nav'
import { Search } from '@/components/search'
import { ModeToggle } from '@/components/mode-toggle'
import { SidebarTrigger } from '@/components/ui/sidebar'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { OrderFilters } from '@/components/order-filters'
import { OrdersTable } from '@/components/orders-table'
import { OrderBulkActions } from '@/components/order-bulk-actions'
import { Button } from '@/components/ui/button'
import { Download, Filter } from 'lucide-react'
import type { UserRole } from '@/types/types'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export default function OrdersPage() {
	const [userRole, setUserRole] = useState<UserRole>('admin')
	const [selectedOrders, setSelectedOrders] = useState<string[]>([])
	const [filtersVisible, setFiltersVisible] = useState(true)
	const [orders, setOrders] = useState([])

	useEffect(() => {
		// Gọi API thực tế ở đây
		fetch('https://localhost:7275/api/Order')
			.then((res) => res.json())
			.then((data) => setOrders(data))
	}, [])

	const toggleRole = () => {
		setUserRole(userRole === 'admin' ? 'staff' : 'admin')
	}

	return (
		<SidebarProvider>
			<div className="flex min-h-screen w-full">
				<AdminSidebar userRole={userRole} />
				<div className="flex-1">
					<header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
						<SidebarTrigger />
						<MainNav />
						<div className="ml-auto flex items-center gap-4">
							<Search placeholder="Tìm đơn hàng, khách hàng..." />
							<ModeToggle />
							<UserNav
								userRole={userRole}
								onRoleToggle={toggleRole}
							/>
						</div>
					</header>
					<main className="flex-1 space-y-4 p-6">
						<div className="flex items-center justify-between">
							<div>
								<Breadcrumb>
									<BreadcrumbList>
										<BreadcrumbItem>
											<BreadcrumbLink href="/">
												Trang chủ
											</BreadcrumbLink>
										</BreadcrumbItem>
										<BreadcrumbSeparator />
										<BreadcrumbItem>
											<BreadcrumbLink href="/orders">
												Đơn hàng
											</BreadcrumbLink>
										</BreadcrumbItem>
										<BreadcrumbSeparator />
										<BreadcrumbItem>
											<BreadcrumbLink href="/orders">
												Danh sách đơn hàng
											</BreadcrumbLink>
										</BreadcrumbItem>
									</BreadcrumbList>
								</Breadcrumb>
								<h1 className="text-3xl font-bold tracking-tight mt-1">
									Quản lý Đơn hàng
								</h1>
							</div>
							<div className="flex items-center gap-2">
								<Button
									variant="outline"
									size="sm"
									className="hidden md:flex"
								>
									<Download className="mr-2 h-4 w-4" />
									Xuất Excel
								</Button>
								<Sheet>
									<SheetTrigger asChild>
										<Button
											variant="outline"
											size="sm"
											className="md:hidden"
										>
											<Filter className="h-4 w-4" />
										</Button>
									</SheetTrigger>
									<SheetContent
										side="right"
										className="w-[300px] sm:w-[400px]"
									>
										<div className="py-4">
											<h3 className="text-lg font-medium mb-4">
												Bộ lọc đơn hàng
											</h3>
											<OrderFilters className="flex flex-col space-y-4" />
										</div>
									</SheetContent>
								</Sheet>
								<Button
									variant="outline"
									size="sm"
									className="hidden md:flex"
									onClick={() =>
										setFiltersVisible(!filtersVisible)
									}
								>
									<Filter className="mr-2 h-4 w-4" />
									{filtersVisible
										? 'Ẩn bộ lọc'
										: 'Hiện bộ lọc'}
								</Button>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
							{filtersVisible && (
								<div className="hidden md:block">
									<div className="bg-card rounded-lg border shadow-sm p-4">
										<h3 className="text-lg font-medium mb-4">
											Bộ lọc đơn hàng
										</h3>
										<OrderFilters className="space-y-4" />
									</div>
								</div>
							)}

							<div
								className={`${
									filtersVisible
										? 'md:col-span-3'
										: 'md:col-span-4'
								}`}
							>
								<div className="bg-card rounded-lg border shadow-sm p-4">
									<div className="flex items-center justify-between mb-4">
										<h3 className="text-lg font-medium">
											Danh sách đơn hàng
										</h3>
										{selectedOrders.length > 0 && (
											<OrderBulkActions
												selectedOrders={selectedOrders}
											/>
										)}
									</div>
									<OrdersTable orders={orders} />
								</div>
							</div>
						</div>
					</main>
				</div>
			</div>
		</SidebarProvider>
	)
}
