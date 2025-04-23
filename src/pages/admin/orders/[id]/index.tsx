'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { AdminSidebar } from '@/components/admin-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { UserNav } from '@/components/user-nav'
import { MainNav } from '@/components/main-nav'
import { Search } from '@/components/search'
import { ModeToggle } from '@/components/mode-toggle'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { OrderDetails } from '@/components/order-details'
import { CustomerDetails } from '@/components/customer-details'
import { OrderProducts } from '@/components/order-products'
import { OrderStatusHistory } from '@/components/order-status-history'
import { OrderNotes } from '@/components/order-notes'
import { OrderActions } from '@/components/order-actions'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import type { UserRole } from '@/types/types'
import { useRouter } from 'next/router'

export default function OrderDetailPage() {
	const router = useRouter()
	const orderId = router.query.id
	const [userRole, setUserRole] = useState<UserRole>('admin')

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
											<BreadcrumbLink
												href={`/orders/${orderId}`}
											>
												Chi tiết đơn hàng
											</BreadcrumbLink>
										</BreadcrumbItem>
									</BreadcrumbList>
								</Breadcrumb>
								<div className="flex items-center gap-4 mt-1">
									<h1 className="text-3xl font-bold tracking-tight">
										Chi tiết Đơn hàng #{orderId}
									</h1>
								</div>
							</div>
							<Button variant="outline" size="sm" asChild>
								<a href="/orders">
									<ArrowLeft className="mr-2 h-4 w-4" />
									Quay lại danh sách
								</a>
							</Button>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div className="md:col-span-2 space-y-6">
								<OrderDetails orderId={orderId} />
								<OrderProducts orderId={orderId} />
								<OrderNotes orderId={orderId} />
							</div>
							<div className="space-y-6">
								<CustomerDetails orderId={orderId} />
								<OrderStatusHistory orderId={orderId} />
								<OrderActions orderId={orderId} />
							</div>
						</div>
					</main>
				</div>
			</div>
		</SidebarProvider>
	)
}
