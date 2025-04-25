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
import { Edit, MoreHorizontal, Trash2, Eye, EyeOff, Copy } from 'lucide-react'
import Image from 'next/image'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface Product {
	id: string
	name: string
	image: string
	price: number
	stock: number
	category?: string
	brand?: string
	status?: string
	sku?: string
}

interface ProductsTableProps {
	selectedProducts: string[]
	setSelectedProducts: (products: string[]) => void
	products: Product[]
	currentPage?: number
	setCurrentPage?: (page: number) => void
	totalPages?: number
}

export function ProductsTable({
	selectedProducts,
	setSelectedProducts,
	products,
	currentPage,
	setCurrentPage,
	totalPages,
}: ProductsTableProps) {
	const [pageSize, setPageSize] = useState('10')
	const [showDeleteDialog, setShowDeleteDialog] = useState(false)
	const [productToDelete, setProductToDelete] = useState<string | null>(null)

	const toggleSelectAll = () => {
		if (selectedProducts.length === products.length) {
			setSelectedProducts([])
		} else {
			setSelectedProducts(products.map((product) => product.id))
		}
	}

	const toggleSelectProduct = (productId: string) => {
		if (selectedProducts.includes(productId)) {
			setSelectedProducts(
				selectedProducts.filter((id) => id !== productId),
			)
		} else {
			setSelectedProducts([...selectedProducts, productId])
		}
	}

	const handleDeleteClick = (productId: string) => {
		setProductToDelete(productId)
		setShowDeleteDialog(true)
	}

	const handleDeleteConfirm = () => {
		// Xử lý xóa sản phẩm
		console.log('Xóa sản phẩm:', productToDelete)
		setShowDeleteDialog(false)
		setProductToDelete(null)
	}

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('vi-VN', {
			style: 'currency',
			currency: 'VND',
		})
			.format(amount)
			.replace('₫', 'đ')
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
										selectedProducts.length ===
											products.length &&
										products.length > 0
									}
									onCheckedChange={toggleSelectAll}
								/>
							</TableHead>
							<TableHead className="w-[80px]">Hình ảnh</TableHead>
							<TableHead>Sản phẩm</TableHead>
							<TableHead className="hidden md:table-cell">
								Danh mục
							</TableHead>
							<TableHead className="hidden md:table-cell">
								Thương hiệu
							</TableHead>
							<TableHead className="text-right">
								Giá bán
							</TableHead>
							<TableHead className="hidden md:table-cell text-center">
								Trạng thái
							</TableHead>
							<TableHead className="hidden lg:table-cell text-center">
								Tồn kho
							</TableHead>
							<TableHead className="w-[100px]">
								Hành động
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{products.map((product) => (
							<TableRow key={product.id}>
								<TableCell>
									<Checkbox
										checked={selectedProducts.includes(
											product.id,
										)}
										onCheckedChange={() =>
											toggleSelectProduct(product.id)
										}
									/>
								</TableCell>
								<TableCell>
									<div className="h-16 w-16 relative">
										<Image
											src={
												product.image ||
												'/placeholder.svg'
											}
											alt={product.name}
											fill
											className="object-cover rounded-md"
										/>
									</div>
								</TableCell>
								<TableCell className="font-medium">
									<a
										href={`/products/${product.id}`}
										className="text-primary hover:underline"
									>
										{product.name}
									</a>
									<div className="text-sm text-muted-foreground mt-1">
										SKU: {product.sku || ''}
									</div>
									<div className="md:hidden text-sm text-muted-foreground mt-1">
										{product.category || ''} |{' '}
										{product.brand || ''}
									</div>
								</TableCell>
								<TableCell className="hidden md:table-cell">
									{product.category || ''}
								</TableCell>
								<TableCell className="hidden md:table-cell">
									{product.brand || ''}
								</TableCell>
								<TableCell className="text-right">
									{formatCurrency(product.price)}
								</TableCell>
								<TableCell className="hidden md:table-cell text-center">
									{product.status === 'visible' ? (
										<Badge
											variant="outline"
											className="bg-green-100 text-green-700 hover:bg-green-100 hover:text-green-700"
										>
											<Eye className="mr-1 h-3 w-3" />
											Hiển thị
										</Badge>
									) : (
										<Badge
											variant="outline"
											className="bg-gray-100 text-gray-700 hover:bg-gray-100 hover:text-gray-700"
										>
											<EyeOff className="mr-1 h-3 w-3" />
											Ẩn
										</Badge>
									)}
								</TableCell>
								<TableCell className="hidden lg:table-cell text-center">
									<span
										className={`${
											product.stock === 0
												? 'text-red-600 font-medium'
												: ''
										}`}
									>
										{product.stock}
									</span>
								</TableCell>
								<TableCell>
									<div className="flex items-center justify-end gap-2">
										<Button
											variant="ghost"
											size="icon"
											asChild
										>
											<a href={`/products/${product.id}`}>
												<Edit className="h-4 w-4" />
												<span className="sr-only">
													Chỉnh sửa
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
												<DropdownMenuItem asChild>
													<a
														href={`/products/${product.id}`}
													>
														<Edit className="mr-2 h-4 w-4" />
														<span>Chỉnh sửa</span>
													</a>
												</DropdownMenuItem>
												<DropdownMenuItem>
													<Copy className="mr-2 h-4 w-4" />
													<span>Nhân bản</span>
												</DropdownMenuItem>
												<DropdownMenuSeparator />
												{product.status ===
												'visible' ? (
													<DropdownMenuItem>
														<EyeOff className="mr-2 h-4 w-4" />
														<span>Ẩn sản phẩm</span>
													</DropdownMenuItem>
												) : (
													<DropdownMenuItem>
														<Eye className="mr-2 h-4 w-4" />
														<span>
															Hiển thị sản phẩm
														</span>
													</DropdownMenuItem>
												)}
												<DropdownMenuSeparator />
												<DropdownMenuItem
													className="text-red-600"
													onClick={() =>
														handleDeleteClick(
															product.id,
														)
													}
												>
													<Trash2 className="mr-2 h-4 w-4" />
													<span>Xóa sản phẩm</span>
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
						trên tổng số {products.length} sản phẩm
					</p>
				</div>

				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								href="#"
								onClick={() =>
									setCurrentPage &&
									currentPage! > 1 &&
									setCurrentPage(currentPage! - 1)
								}
							/>
						</PaginationItem>
						{[...Array(totalPages || 1)].map((_, idx) => (
							<PaginationItem key={idx}>
								<PaginationLink
									href="#"
									isActive={currentPage === idx + 1}
									onClick={() =>
										setCurrentPage &&
										setCurrentPage(idx + 1)
									}
								>
									{idx + 1}
								</PaginationLink>
							</PaginationItem>
						))}
						<PaginationItem>
							<PaginationNext
								href="#"
								onClick={() =>
									setCurrentPage &&
									currentPage! < (totalPages || 1) &&
									setCurrentPage(currentPage! + 1)
								}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>

			{/* Dialog xác nhận xóa sản phẩm */}
			<AlertDialog
				open={showDeleteDialog}
				onOpenChange={setShowDeleteDialog}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Xác nhận xóa sản phẩm
						</AlertDialogTitle>
						<AlertDialogDescription>
							Bạn có chắc chắn muốn xóa sản phẩm này? Hành động
							này không thể hoàn tác.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Hủy</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDeleteConfirm}
							className="bg-red-600 hover:bg-red-700 text-white"
						>
							Xóa sản phẩm
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	)
}
