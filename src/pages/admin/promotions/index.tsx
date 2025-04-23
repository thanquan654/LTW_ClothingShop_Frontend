'use client'

import { useState } from 'react'
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
import { PromotionFilters } from '@/components/promotion-filters'
import { PromotionsTable } from '@/components/promotions-table'
import { PromotionBulkActions } from '@/components/promotion-bulk-actions'
import { Button } from '@/components/ui/button'
import { Filter, Plus, Download } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import type { UserRole } from '@/types/types'

export default function PromotionsPage() {
	const [userRole, setUserRole] = useState<UserRole>('admin')
	const [selectedPromotions, setSelectedPromotions] = useState<string[]>([])
	const [filtersVisible, setFiltersVisible] = useState(true)

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
							<Search placeholder="Tìm khuyến mãi, mã khuyến mãi..." />
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
											<BreadcrumbLink href="/promotions">
												Khuyến mãi
											</BreadcrumbLink>
										</BreadcrumbItem>
										<BreadcrumbSeparator />
										<BreadcrumbItem>
											<BreadcrumbLink href="/promotions">
												Quản lý khuyến mãi
											</BreadcrumbLink>
										</BreadcrumbItem>
									</BreadcrumbList>
								</Breadcrumb>
								<h1 className="text-3xl font-bold tracking-tight mt-1">
									Quản lý Khuyến mãi
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
												Bộ lọc khuyến mãi
											</h3>
											<PromotionFilters className="flex flex-col space-y-4" />
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
								<Button asChild>
									<a href="/promotions/add">
										<Plus className="mr-2 h-4 w-4" />
										Thêm khuyến mãi mới
									</a>
								</Button>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
							{filtersVisible && (
								<div className="hidden md:block">
									<div className="bg-card rounded-lg border shadow-sm p-4">
										<h3 className="text-lg font-medium mb-4">
											Bộ lọc khuyến mãi
										</h3>
										<PromotionFilters className="space-y-4" />
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
											Danh sách khuyến mãi
										</h3>
										{selectedPromotions.length > 0 && (
											<PromotionBulkActions
												selectedPromotions={
													selectedPromotions
												}
											/>
										)}
									</div>
									<PromotionsTable
										selectedPromotions={selectedPromotions}
										setSelectedPromotions={
											setSelectedPromotions
										}
									/>
								</div>
							</div>
						</div>
					</main>
				</div>
			</div>
		</SidebarProvider>
	)
}
