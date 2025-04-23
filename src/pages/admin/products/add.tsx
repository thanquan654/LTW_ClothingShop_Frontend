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
import { Button } from '@/components/ui/button'
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import type { UserRole } from '@/types'

export default function AddProductPage() {
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
											<BreadcrumbLink href="/products/add">
												Thêm sản phẩm mới
											</BreadcrumbLink>
										</BreadcrumbItem>
									</BreadcrumbList>
								</Breadcrumb>
								<h1 className="text-3xl font-bold tracking-tight mt-1">
									Thêm Sản phẩm mới
								</h1>
							</div>
							<div className="flex items-center gap-2">
								<Button variant="outline" size="sm" asChild>
									<a href="/products">
										<ArrowLeft className="mr-2 h-4 w-4" />
										Quay lại
									</a>
								</Button>
								<Button>
									<Save className="mr-2 h-4 w-4" />
									Lưu sản phẩm
								</Button>
							</div>
						</div>

						<Tabs defaultValue="general" className="space-y-4">
							<TabsList>
								<TabsTrigger value="general">
									Thông tin chung
								</TabsTrigger>
								<TabsTrigger value="variants">
									Biến thể
								</TabsTrigger>
								<TabsTrigger value="images">
									Hình ảnh
								</TabsTrigger>
								<TabsTrigger value="inventory">
									Kho hàng
								</TabsTrigger>
								<TabsTrigger value="seo">SEO</TabsTrigger>
							</TabsList>

							<TabsContent value="general" className="space-y-4">
								<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
									<div className="md:col-span-2 space-y-6">
										<Card>
											<CardHeader>
												<CardTitle>
													Thông tin cơ bản
												</CardTitle>
												<CardDescription>
													Nhập thông tin cơ bản của
													sản phẩm
												</CardDescription>
											</CardHeader>
											<CardContent className="space-y-4">
												<div className="space-y-2">
													<Label htmlFor="product-name">
														Tên sản phẩm{' '}
														<span className="text-red-500">
															*
														</span>
													</Label>
													<Input
														id="product-name"
														placeholder="Nhập tên sản phẩm"
													/>
												</div>
												<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
													<div className="space-y-2">
														<Label htmlFor="product-sku">
															Mã sản phẩm (SKU){' '}
															<span className="text-red-500">
																*
															</span>
														</Label>
														<Input
															id="product-sku"
															placeholder="Nhập mã sản phẩm"
														/>
													</div>
													<div className="space-y-2">
														<Label htmlFor="product-barcode">
															Mã vạch (Barcode)
														</Label>
														<Input
															id="product-barcode"
															placeholder="Nhập mã vạch"
														/>
													</div>
												</div>
												<div className="space-y-2">
													<Label htmlFor="product-description">
														Mô tả sản phẩm
													</Label>
													<Textarea
														id="product-description"
														placeholder="Nhập mô tả sản phẩm"
														className="min-h-[150px]"
													/>
												</div>
											</CardContent>
										</Card>

										<Card>
											<CardHeader>
												<CardTitle>
													Giá sản phẩm
												</CardTitle>
												<CardDescription>
													Thiết lập giá bán và giá
													khuyến mãi
												</CardDescription>
											</CardHeader>
											<CardContent className="space-y-4">
												<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
													<div className="space-y-2">
														<Label htmlFor="product-price">
															Giá bán{' '}
															<span className="text-red-500">
																*
															</span>
														</Label>
														<Input
															id="product-price"
															type="number"
															placeholder="Nhập giá bán"
														/>
													</div>
													<div className="space-y-2">
														<Label htmlFor="product-compare-price">
															Giá so sánh
														</Label>
														<Input
															id="product-compare-price"
															type="number"
															placeholder="Nhập giá so sánh"
														/>
														<p className="text-xs text-muted-foreground">
															Giá so sánh sẽ hiển
															thị dưới dạng giá
															gạch ngang
														</p>
													</div>
												</div>
												<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
													<div className="space-y-2">
														<Label htmlFor="product-cost">
															Giá vốn
														</Label>
														<Input
															id="product-cost"
															type="number"
															placeholder="Nhập giá vốn"
														/>
													</div>
													<div className="space-y-2">
														<Label htmlFor="product-tax">
															Thuế (%)
														</Label>
														<Input
															id="product-tax"
															type="number"
															placeholder="Nhập thuế"
														/>
													</div>
												</div>
											</CardContent>
										</Card>
									</div>

									<div className="space-y-6">
										<Card>
											<CardHeader>
												<CardTitle>Phân loại</CardTitle>
												<CardDescription>
													Phân loại sản phẩm
												</CardDescription>
											</CardHeader>
											<CardContent className="space-y-4">
												<div className="space-y-2">
													<Label htmlFor="product-category">
														Danh mục{' '}
														<span className="text-red-500">
															*
														</span>
													</Label>
													<Select>
														<SelectTrigger id="product-category">
															<SelectValue placeholder="Chọn danh mục" />
														</SelectTrigger>
														<SelectContent>
															<SelectItem value="shirts">
																Áo
															</SelectItem>
															<SelectItem value="pants">
																Quần
															</SelectItem>
															<SelectItem value="dresses">
																Váy
															</SelectItem>
															<SelectItem value="accessories">
																Phụ kiện
															</SelectItem>
															<SelectItem value="shoes">
																Giày dép
															</SelectItem>
														</SelectContent>
													</Select>
												</div>
												<div className="space-y-2">
													<Label htmlFor="product-brand">
														Thương hiệu
													</Label>
													<Select>
														<SelectTrigger id="product-brand">
															<SelectValue placeholder="Chọn thương hiệu" />
														</SelectTrigger>
														<SelectContent>
															<SelectItem value="haru">
																HARU
															</SelectItem>
															<SelectItem value="nike">
																Nike
															</SelectItem>
															<SelectItem value="adidas">
																Adidas
															</SelectItem>
															<SelectItem value="zara">
																Zara
															</SelectItem>
															<SelectItem value="uniqlo">
																Uniqlo
															</SelectItem>
														</SelectContent>
													</Select>
												</div>
												<div className="space-y-2">
													<Label htmlFor="product-tags">
														Thẻ (Tags)
													</Label>
													<Input
														id="product-tags"
														placeholder="Nhập thẻ, phân cách bằng dấu phẩy"
													/>
													<p className="text-xs text-muted-foreground">
														Ví dụ: thời trang, nam,
														mùa hè
													</p>
												</div>
											</CardContent>
										</Card>

										<Card>
											<CardHeader>
												<CardTitle>
													Trạng thái
												</CardTitle>
												<CardDescription>
													Thiết lập trạng thái hiển
													thị
												</CardDescription>
											</CardHeader>
											<CardContent className="space-y-4">
												<div className="flex items-center justify-between">
													<Label htmlFor="product-status">
														Hiển thị sản phẩm
													</Label>
													<Switch
														id="product-status"
														defaultChecked
													/>
												</div>
												<div className="flex items-center justify-between">
													<Label htmlFor="product-featured">
														Sản phẩm nổi bật
													</Label>
													<Switch id="product-featured" />
												</div>
											</CardContent>
										</Card>
									</div>
								</div>
							</TabsContent>

							<TabsContent value="variants" className="space-y-4">
								<Card>
									<CardHeader>
										<CardTitle>Biến thể sản phẩm</CardTitle>
										<CardDescription>
											Thêm các biến thể như kích thước,
											màu sắc
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="space-y-2">
											<div className="flex items-center justify-between">
												<Label>
													Sản phẩm có nhiều biến thể
												</Label>
												<Switch id="has-variants" />
											</div>
											<p className="text-sm text-muted-foreground">
												Bật tùy chọn này nếu sản phẩm có
												nhiều phiên bản như kích thước,
												màu sắc
											</p>
										</div>

										<Separator />

										<div className="space-y-4">
											<div className="flex items-center justify-between">
												<h3 className="text-sm font-medium">
													Tùy chọn biến thể
												</h3>
												<Button
													variant="outline"
													size="sm"
												>
													<Plus className="mr-2 h-4 w-4" />
													Thêm tùy chọn
												</Button>
											</div>

											<div className="space-y-4">
												<div className="grid grid-cols-12 gap-4">
													<div className="col-span-3">
														<Label htmlFor="option-name-1">
															Tên tùy chọn
														</Label>
														<Select defaultValue="size">
															<SelectTrigger id="option-name-1">
																<SelectValue placeholder="Chọn tùy chọn" />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value="size">
																	Kích thước
																</SelectItem>
																<SelectItem value="color">
																	Màu sắc
																</SelectItem>
																<SelectItem value="material">
																	Chất liệu
																</SelectItem>
																<SelectItem value="style">
																	Kiểu dáng
																</SelectItem>
															</SelectContent>
														</Select>
													</div>
													<div className="col-span-8">
														<Label htmlFor="option-values-1">
															Giá trị tùy chọn
														</Label>
														<Input
															id="option-values-1"
															placeholder="Nhập giá trị, phân cách bằng dấu phẩy"
															defaultValue="S, M, L, XL"
														/>
													</div>
													<div className="col-span-1 flex items-end">
														<Button
															variant="ghost"
															size="icon"
															className="text-red-500"
														>
															<Trash2 className="h-4 w-4" />
														</Button>
													</div>
												</div>

												<div className="grid grid-cols-12 gap-4">
													<div className="col-span-3">
														<Label htmlFor="option-name-2">
															Tên tùy chọn
														</Label>
														<Select defaultValue="color">
															<SelectTrigger id="option-name-2">
																<SelectValue placeholder="Chọn tùy chọn" />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value="size">
																	Kích thước
																</SelectItem>
																<SelectItem value="color">
																	Màu sắc
																</SelectItem>
																<SelectItem value="material">
																	Chất liệu
																</SelectItem>
																<SelectItem value="style">
																	Kiểu dáng
																</SelectItem>
															</SelectContent>
														</Select>
													</div>
													<div className="col-span-8">
														<Label htmlFor="option-values-2">
															Giá trị tùy chọn
														</Label>
														<Input
															id="option-values-2"
															placeholder="Nhập giá trị, phân cách bằng dấu phẩy"
															defaultValue="Đen, Trắng, Xanh, Đỏ"
														/>
													</div>
													<div className="col-span-1 flex items-end">
														<Button
															variant="ghost"
															size="icon"
															className="text-red-500"
														>
															<Trash2 className="h-4 w-4" />
														</Button>
													</div>
												</div>
											</div>
										</div>

										<Separator />

										<div className="space-y-4">
											<h3 className="text-sm font-medium">
												Danh sách biến thể
											</h3>
											<p className="text-sm text-muted-foreground">
												Tổng cộng 8 biến thể được tạo từ
												các tùy chọn trên
											</p>

											<div className="rounded-md border">
												<table className="w-full">
													<thead>
														<tr className="border-b">
															<th className="px-4 py-3 text-left text-sm font-medium">
																Biến thể
															</th>
															<th className="px-4 py-3 text-left text-sm font-medium">
																Giá
															</th>
															<th className="px-4 py-3 text-left text-sm font-medium">
																SKU
															</th>
															<th className="px-4 py-3 text-left text-sm font-medium">
																Tồn kho
															</th>
														</tr>
													</thead>
													<tbody>
														<tr className="border-b">
															<td className="px-4 py-3 text-sm">
																S / Đen
															</td>
															<td className="px-4 py-3 text-sm">
																<Input
																	type="number"
																	className="h-8 w-24"
																	defaultValue="250000"
																/>
															</td>
															<td className="px-4 py-3 text-sm">
																<Input
																	className="h-8 w-32"
																	defaultValue="AT-NAM-001-S-DEN"
																/>
															</td>
															<td className="px-4 py-3 text-sm">
																<Input
																	type="number"
																	className="h-8 w-24"
																	defaultValue="10"
																/>
															</td>
														</tr>
														<tr className="border-b">
															<td className="px-4 py-3 text-sm">
																S / Trắng
															</td>
															<td className="px-4 py-3 text-sm">
																<Input
																	type="number"
																	className="h-8 w-24"
																	defaultValue="250000"
																/>
															</td>
															<td className="px-4 py-3 text-sm">
																<Input
																	className="h-8 w-32"
																	defaultValue="AT-NAM-001-S-TRANG"
																/>
															</td>
															<td className="px-4 py-3 text-sm">
																<Input
																	type="number"
																	className="h-8 w-24"
																	defaultValue="10"
																/>
															</td>
														</tr>
														<tr className="border-b">
															<td className="px-4 py-3 text-sm">
																M / Đen
															</td>
															<td className="px-4 py-3 text-sm">
																<Input
																	type="number"
																	className="h-8 w-24"
																	defaultValue="250000"
																/>
															</td>
															<td className="px-4 py-3 text-sm">
																<Input
																	className="h-8 w-32"
																	defaultValue="AT-NAM-001-M-DEN"
																/>
															</td>
															<td className="px-4 py-3 text-sm">
																<Input
																	type="number"
																	className="h-8 w-24"
																	defaultValue="15"
																/>
															</td>
														</tr>
														<tr>
															<td className="px-4 py-3 text-sm">
																M / Trắng
															</td>
															<td className="px-4 py-3 text-sm">
																<Input
																	type="number"
																	className="h-8 w-24"
																	defaultValue="250000"
																/>
															</td>
															<td className="px-4 py-3 text-sm">
																<Input
																	className="h-8 w-32"
																	defaultValue="AT-NAM-001-M-TRANG"
																/>
															</td>
															<td className="px-4 py-3 text-sm">
																<Input
																	type="number"
																	className="h-8 w-24"
																	defaultValue="15"
																/>
															</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
									</CardContent>
								</Card>
							</TabsContent>

							<TabsContent value="images" className="space-y-4">
								<Card>
									<CardHeader>
										<CardTitle>Hình ảnh sản phẩm</CardTitle>
										<CardDescription>
											Tải lên hình ảnh sản phẩm
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="border-2 border-dashed rounded-lg p-8 text-center">
											<div className="mx-auto flex flex-col items-center justify-center gap-1">
												<div className="text-muted-foreground">
													<p className="mb-2 text-sm">
														Kéo thả hình ảnh vào đây
														hoặc
													</p>
													<Button variant="outline">
														Chọn hình ảnh
													</Button>
												</div>
												<p className="text-xs text-muted-foreground mt-2">
													Hỗ trợ định dạng: PNG, JPG,
													JPEG. Kích thước tối đa:
													5MB.
												</p>
											</div>
										</div>
									</CardContent>
								</Card>
							</TabsContent>

							<TabsContent
								value="inventory"
								className="space-y-4"
							>
								<Card>
									<CardHeader>
										<CardTitle>Quản lý kho hàng</CardTitle>
										<CardDescription>
											Thiết lập thông tin kho hàng
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="space-y-2">
											<div className="flex items-center justify-between">
												<Label>Theo dõi tồn kho</Label>
												<Switch
													id="track-inventory"
													defaultChecked
												/>
											</div>
											<p className="text-sm text-muted-foreground">
												Bật tùy chọn này để theo dõi số
												lượng tồn kho của sản phẩm
											</p>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div className="space-y-2">
												<Label htmlFor="inventory-quantity">
													Số lượng tồn kho
												</Label>
												<Input
													id="inventory-quantity"
													type="number"
													placeholder="Nhập số lượng tồn kho"
												/>
											</div>
											<div className="space-y-2">
												<Label htmlFor="low-stock-threshold">
													Ngưỡng cảnh báo sắp hết hàng
												</Label>
												<Input
													id="low-stock-threshold"
													type="number"
													placeholder="Nhập ngưỡng cảnh báo"
												/>
											</div>
										</div>

										<div className="space-y-2">
											<div className="flex items-center justify-between">
												<Label>
													Cho phép đặt hàng khi hết
													hàng
												</Label>
												<Switch id="allow-backorder" />
											</div>
											<p className="text-sm text-muted-foreground">
												Bật tùy chọn này để cho phép
												khách hàng đặt hàng khi sản phẩm
												hết hàng
											</p>
										</div>
									</CardContent>
								</Card>
							</TabsContent>

							<TabsContent value="seo" className="space-y-4">
								<Card>
									<CardHeader>
										<CardTitle>Tối ưu hóa SEO</CardTitle>
										<CardDescription>
											Thiết lập thông tin SEO cho sản phẩm
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="space-y-2">
											<Label htmlFor="seo-title">
												Tiêu đề SEO
											</Label>
											<Input
												id="seo-title"
												placeholder="Nhập tiêu đề SEO"
											/>
											<p className="text-xs text-muted-foreground">
												Nếu để trống, tiêu đề sản phẩm
												sẽ được sử dụng
											</p>
										</div>
										<div className="space-y-2">
											<Label htmlFor="seo-description">
												Mô tả SEO
											</Label>
											<Textarea
												id="seo-description"
												placeholder="Nhập mô tả SEO"
												className="min-h-[100px]"
											/>
											<p className="text-xs text-muted-foreground">
												Mô tả ngắn gọn về sản phẩm, tối
												đa 160 ký tự
											</p>
										</div>
										<div className="space-y-2">
											<Label htmlFor="seo-url">
												Đường dẫn thân thiện (URL)
											</Label>
											<Input
												id="seo-url"
												placeholder="Nhập đường dẫn thân thiện"
											/>
											<p className="text-xs text-muted-foreground">
												Nếu để trống, URL sẽ được tạo tự
												động từ tên sản phẩm
											</p>
										</div>
									</CardContent>
								</Card>
							</TabsContent>
						</Tabs>
					</main>
				</div>
			</div>
		</SidebarProvider>
	)
}
