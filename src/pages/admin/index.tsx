'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AdminDashboard } from '@/components/admin-dashboard'
import { StaffDashboard } from '@/components/staff-dashboard'
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
import type { UserRole } from '@/types/types'
import { AdminSidebar } from '@/components/admin-sidebar'

export default function DashboardPage() {
	// Normally this would come from an auth context or API
	const [userRole, setUserRole] = useState<UserRole>('admin')
	const pathname = usePathname()

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
							<Search />
							<ModeToggle />
							<UserNav
								userRole={userRole}
								onRoleToggle={toggleRole}
							/>
						</div>
					</header>
					<main className="flex-1 space-y-4 p-6">
						<div className="flex items-center justify-between">
							<Breadcrumb>
								<BreadcrumbList>
									<BreadcrumbItem>
										<BreadcrumbLink href="/">
											Trang chủ
										</BreadcrumbLink>
									</BreadcrumbItem>
									<BreadcrumbSeparator />
									<BreadcrumbItem>
										<BreadcrumbLink href="/dashboard">
											Dashboard
										</BreadcrumbLink>
									</BreadcrumbItem>
								</BreadcrumbList>
							</Breadcrumb>
						</div>
						<div className="space-y-4">
							<h1 className="text-3xl font-bold tracking-tight">
								Dashboard
							</h1>
							{userRole === 'admin' ? (
								<AdminDashboard />
							) : (
								<StaffDashboard />
							)}
						</div>
					</main>
				</div>
			</div>
		</SidebarProvider>
	)
}
