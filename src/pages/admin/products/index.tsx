'use client'

import { useEffect, useState } from 'react'
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
import { ProductFilters } from '@/components/product-filters'
import { ProductsTable } from '@/components/products-table'
import { ProductBulkActions } from '@/components/product-bulk-actions'
import { Button } from '@/components/ui/button'
import { Filter, Plus, Download } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import type { UserRole } from '@/types/types'
import Link from 'next/link'

export default function ProductsPage() {
	const [userRole, setUserRole] = useState<UserRole>('admin')
	const [selectedProducts, setSelectedProducts] = useState<string[]>([])
	const [filtersVisible, setFiltersVisible] = useState(true)
	const [products, setProducts] = useState<any[]>([])
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)

	useEffect(() => {
		fetch(
			`https://localhost:7275/api/Product?Page=${currentPage}&PageSize=10&SortBy=id&SortDirection=asc`,
		)
			.then((res) => res.json())
			.then((data) => {
				const mapped = data.data.map((item: any) => ({
					id: item.id,
					name: item.tenSanPham,
					price: item.giaTien,
					image: item.anhDaiDien
						? `/uploads/${item.anhDaiDien}`
						: '/placeholder.svg',
					stock: item.luotBan,
					category: '',
					brand: '',
					status: 'visible',
					sku: '',
				}))
				setProducts(mapped)
				setTotalPages(data.pagination?.totalPages || 1)
			})
	}, [currentPage])

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
							<Search placeholder="Tìm sản phẩm, mã SKU..." />
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
											<BreadcrumbLink href="/products">
												Sản phẩm
											</BreadcrumbLink>
										</BreadcrumbItem>
										<BreadcrumbSeparator />
										<BreadcrumbItem>
											<BreadcrumbLink href="/products">
												Quản lý sản phẩm
											</BreadcrumbLink>
										</BreadcrumbItem>
									</BreadcrumbList>
								</Breadcrumb>
								<h1 className="text-3xl font-bold tracking-tight mt-1">
									Quản lý Sản phẩm
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
												Bộ lọc sản phẩm
											</h3>
											<ProductFilters className="flex flex-col space-y-4" />
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
									<Link href="/admin/products/add">
										<Plus className="mr-2 h-4 w-4" />
										Thêm sản phẩm mới
									</Link>
								</Button>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
							{filtersVisible && (
								<div className="hidden md:block">
									<div className="bg-card rounded-lg border shadow-sm p-4">
										<h3 className="text-lg font-medium mb-4">
											Bộ lọc sản phẩm
										</h3>
										<ProductFilters className="space-y-4" />
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
											Danh sách sản phẩm
										</h3>
										{selectedProducts.length > 0 && (
											<ProductBulkActions
												selectedProducts={
													selectedProducts
												}
											/>
										)}
									</div>
									<ProductsTable
										selectedProducts={selectedProducts}
										setSelectedProducts={
											setSelectedProducts
										}
										products={products}
										currentPage={currentPage}
										setCurrentPage={setCurrentPage}
										totalPages={totalPages}
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
