'use client'

import { Checkbox } from '@/components/ui/checkbox'

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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Calendar } from '@/components/ui/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { CalendarIcon, Clock } from 'lucide-react'
import type { UserRole } from '@/types/types'

export default function AddPromotionPage() {
	const [userRole, setUserRole] = useState<UserRole>('admin')
	const [startDate, setStartDate] = useState<Date>()
	const [endDate, setEndDate] = useState<Date>()
	const [promotionType, setPromotionType] = useState('percentage')

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
											<BreadcrumbLink href="/promotions/add">
												Thêm khuyến mãi mới
											</BreadcrumbLink>
										</BreadcrumbItem>
									</BreadcrumbList>
								</Breadcrumb>
								<h1 className="text-3xl font-bold tracking-tight mt-1">
									Thêm Khuyến mãi mới
								</h1>
							</div>
							<div className="flex items-center gap-2">
								<Button variant="outline" size="sm" asChild>
									<a href="/promotions">
										<ArrowLeft className="mr-2 h-4 w-4" />
										Quay lại
									</a>
								</Button>
								<Button>
									<Save className="mr-2 h-4 w-4" />
									Lưu khuyến mãi
								</Button>
							</div>
						</div>

						<Tabs defaultValue="general" className="space-y-4">
							<TabsList>
								<TabsTrigger value="general">
									Thông tin chung
								</TabsTrigger>
								<TabsTrigger value="conditions">
									Điều kiện áp dụng
								</TabsTrigger>
								<TabsTrigger value="products">
									Sản phẩm áp dụng
								</TabsTrigger>
								<TabsTrigger value="customers">
									Khách hàng áp dụng
								</TabsTrigger>
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
													chương trình khuyến mãi
												</CardDescription>
											</CardHeader>
											<CardContent className="space-y-4">
												<div className="space-y-2">
													<Label htmlFor="promotion-name">
														Tên khuyến mãi{' '}
														<span className="text-red-500">
															*
														</span>
													</Label>
													<Input
														id="promotion-name"
														placeholder="Nhập tên khuyến mãi"
													/>
												</div>
												<div className="space-y-2">
													<Label htmlFor="promotion-code">
														Mã khuyến mãi{' '}
														<span className="text-red-500">
															*
														</span>
													</Label>
													<Input
														id="promotion-code"
														placeholder="Nhập mã khuyến mãi"
													/>
													<p className="text-xs text-muted-foreground">
														Mã khuyến mãi sẽ được sử
														dụng khi thanh toán
													</p>
												</div>
												<div className="space-y-2">
													<Label htmlFor="promotion-description">
														Mô tả khuyến mãi
													</Label>
													<Textarea
														id="promotion-description"
														placeholder="Nhập mô tả khuyến mãi"
														className="min-h-[100px]"
													/>
												</div>
											</CardContent>
										</Card>

										<Card>
											<CardHeader>
												<CardTitle>
													Loại khuyến mãi
												</CardTitle>
												<CardDescription>
													Chọn loại và giá trị khuyến
													mãi
												</CardDescription>
											</CardHeader>
											<CardContent className="space-y-4">
												<div className="space-y-2">
													<Label>
														Loại khuyến mãi{' '}
														<span className="text-red-500">
															*
														</span>
													</Label>
													<RadioGroup
														defaultValue="percentage"
														onValueChange={
															setPromotionType
														}
													>
														<div className="flex items-center space-x-2">
															<RadioGroupItem
																value="percentage"
																id="type-percentage"
															/>
															<Label htmlFor="type-percentage">
																Giảm giá phần
																trăm (%)
															</Label>
														</div>
														<div className="flex items-center space-x-2">
															<RadioGroupItem
																value="fixed"
																id="type-fixed"
															/>
															<Label htmlFor="type-fixed">
																Giảm giá tiền
																mặt (VNĐ)
															</Label>
														</div>
														<div className="flex items-center space-x-2">
															<RadioGroupItem
																value="shipping"
																id="type-shipping"
															/>
															<Label htmlFor="type-shipping">
																Miễn phí vận
																chuyển
															</Label>
														</div>
														<div className="flex items-center space-x-2">
															<RadioGroupItem
																value="gift"
																id="type-gift"
															/>
															<Label htmlFor="type-gift">
																Tặng quà
															</Label>
														</div>
														<div className="flex items-center space-x-2">
															<RadioGroupItem
																value="buy-x-get-y"
																id="type-buy-x-get-y"
															/>
															<Label htmlFor="type-buy-x-get-y">
																Mua X tặng Y
															</Label>
														</div>
													</RadioGroup>
												</div>

												<Separator />

												{promotionType ===
													'percentage' && (
													<div className="space-y-2">
														<Label htmlFor="discount-percentage">
															Phần trăm giảm giá{' '}
															<span className="text-red-500">
																*
															</span>
														</Label>
														<div className="flex items-center gap-2">
															<Input
																id="discount-percentage"
																type="number"
																placeholder="Nhập phần trăm giảm giá"
																className="max-w-[200px]"
															/>
															<span>%</span>
														</div>
													</div>
												)}

												{promotionType === 'fixed' && (
													<div className="space-y-2">
														<Label htmlFor="discount-amount">
															Số tiền giảm giá{' '}
															<span className="text-red-500">
																*
															</span>
														</Label>
														<div className="flex items-center gap-2">
															<Input
																id="discount-amount"
																type="number"
																placeholder="Nhập số tiền giảm giá"
																className="max-w-[200px]"
															/>
															<span>VNĐ</span>
														</div>
													</div>
												)}

												{promotionType ===
													'shipping' && (
													<div className="space-y-2">
														<Label htmlFor="shipping-discount">
															Giảm giá vận chuyển{' '}
															<span className="text-red-500">
																*
															</span>
														</Label>
														<Select defaultValue="full">
															<SelectTrigger
																id="shipping-discount"
																className="max-w-[300px]"
															>
																<SelectValue placeholder="Chọn loại giảm giá vận chuyển" />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value="full">
																	Miễn phí
																	hoàn toàn
																</SelectItem>
																<SelectItem value="percentage">
																	Giảm % phí
																	vận chuyển
																</SelectItem>
																<SelectItem value="fixed">
																	Giảm số tiền
																	cố định
																</SelectItem>
															</SelectContent>
														</Select>
													</div>
												)}

												{promotionType === 'gift' && (
													<div className="space-y-2">
														<Label htmlFor="gift-product">
															Sản phẩm tặng kèm{' '}
															<span className="text-red-500">
																*
															</span>
														</Label>
														<Select>
															<SelectTrigger id="gift-product">
																<SelectValue placeholder="Chọn sản phẩm tặng kèm" />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value="tote-bag">
																	Túi tote
																</SelectItem>
																<SelectItem value="keychain">
																	Móc khóa
																</SelectItem>
																<SelectItem value="socks">
																	Tất
																</SelectItem>
															</SelectContent>
														</Select>
													</div>
												)}

												{promotionType ===
													'buy-x-get-y' && (
													<div className="space-y-4">
														<div className="space-y-2">
															<Label htmlFor="buy-quantity">
																Số lượng mua (X){' '}
																<span className="text-red-500">
																	*
																</span>
															</Label>
															<Input
																id="buy-quantity"
																type="number"
																placeholder="Nhập số lượng cần mua"
																className="max-w-[200px]"
															/>
														</div>
														<div className="space-y-2">
															<Label htmlFor="get-quantity">
																Số lượng tặng
																(Y){' '}
																<span className="text-red-500">
																	*
																</span>
															</Label>
															<Input
																id="get-quantity"
																type="number"
																placeholder="Nhập số lượng tặng kèm"
																className="max-w-[200px]"
															/>
														</div>
													</div>
												)}
											</CardContent>
										</Card>
									</div>

									<div className="space-y-6">
										<Card>
											<CardHeader>
												<CardTitle>Thời gian</CardTitle>
												<CardDescription>
													Thiết lập thời gian áp dụng
													khuyến mãi
												</CardDescription>
											</CardHeader>
											<CardContent className="space-y-4">
												<div className="space-y-2">
													<Label>
														Thời gian bắt đầu{' '}
														<span className="text-red-500">
															*
														</span>
													</Label>
													<div className="grid gap-2">
														<Popover>
															<PopoverTrigger
																asChild
															>
																<Button
																	variant={
																		'outline'
																	}
																	className={cn(
																		'w-full justify-start text-left font-normal',
																		!startDate &&
																			'text-muted-foreground',
																	)}
																>
																	<CalendarIcon className="mr-2 h-4 w-4" />
																	{startDate
																		? format(
																				startDate,
																				'dd/MM/yyyy',
																				{
																					locale: vi,
																				},
																		  )
																		: 'Chọn ngày bắt đầu'}
																</Button>
															</PopoverTrigger>
															<PopoverContent className="w-auto p-0">
																<Calendar
																	mode="single"
																	selected={
																		startDate
																	}
																	onSelect={
																		setStartDate
																	}
																	initialFocus
																/>
															</PopoverContent>
														</Popover>
														<div className="flex items-center gap-2">
															<Clock className="h-4 w-4 text-muted-foreground" />
															<Select defaultValue="00:00">
																<SelectTrigger className="w-full">
																	<SelectValue placeholder="Chọn giờ bắt đầu" />
																</SelectTrigger>
																<SelectContent>
																	<SelectItem value="00:00">
																		00:00
																	</SelectItem>
																	<SelectItem value="06:00">
																		06:00
																	</SelectItem>
																	<SelectItem value="12:00">
																		12:00
																	</SelectItem>
																	<SelectItem value="18:00">
																		18:00
																	</SelectItem>
																</SelectContent>
															</Select>
														</div>
													</div>
												</div>

												<div className="space-y-2">
													<Label>
														Thời gian kết thúc{' '}
														<span className="text-red-500">
															*
														</span>
													</Label>
													<div className="grid gap-2">
														<Popover>
															<PopoverTrigger
																asChild
															>
																<Button
																	variant={
																		'outline'
																	}
																	className={cn(
																		'w-full justify-start text-left font-normal',
																		!endDate &&
																			'text-muted-foreground',
																	)}
																>
																	<CalendarIcon className="mr-2 h-4 w-4" />
																	{endDate
																		? format(
																				endDate,
																				'dd/MM/yyyy',
																				{
																					locale: vi,
																				},
																		  )
																		: 'Chọn ngày kết thúc'}
																</Button>
															</PopoverTrigger>
															<PopoverContent className="w-auto p-0">
																<Calendar
																	mode="single"
																	selected={
																		endDate
																	}
																	onSelect={
																		setEndDate
																	}
																	initialFocus
																/>
															</PopoverContent>
														</Popover>
														<div className="flex items-center gap-2">
															<Clock className="h-4 w-4 text-muted-foreground" />
															<Select defaultValue="23:59">
																<SelectTrigger className="w-full">
																	<SelectValue placeholder="Chọn giờ kết thúc" />
																</SelectTrigger>
																<SelectContent>
																	<SelectItem value="23:59">
																		23:59
																	</SelectItem>
																	<SelectItem value="18:00">
																		18:00
																	</SelectItem>
																	<SelectItem value="12:00">
																		12:00
																	</SelectItem>
																	<SelectItem value="06:00">
																		06:00
																	</SelectItem>
																</SelectContent>
															</Select>
														</div>
													</div>
												</div>
											</CardContent>
										</Card>

										<Card>
											<CardHeader>
												<CardTitle>
													Trạng thái
												</CardTitle>
												<CardDescription>
													Thiết lập trạng thái khuyến
													mãi
												</CardDescription>
											</CardHeader>
											<CardContent className="space-y-4">
												<div className="flex items-center justify-between">
													<Label htmlFor="promotion-status">
														Kích hoạt khuyến mãi
													</Label>
													<Switch
														id="promotion-status"
														defaultChecked
													/>
												</div>
												<div className="flex items-center justify-between">
													<Label htmlFor="promotion-featured">
														Khuyến mãi nổi bật
													</Label>
													<Switch id="promotion-featured" />
												</div>
											</CardContent>
										</Card>
									</div>
								</div>
							</TabsContent>

							<TabsContent
								value="conditions"
								className="space-y-4"
							>
								<Card>
									<CardHeader>
										<CardTitle>Điều kiện áp dụng</CardTitle>
										<CardDescription>
											Thiết lập các điều kiện để áp dụng
											khuyến mãi
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="space-y-2">
											<Label htmlFor="min-purchase">
												Giá trị đơn hàng tối thiểu
											</Label>
											<div className="flex items-center gap-2">
												<Input
													id="min-purchase"
													type="number"
													placeholder="Nhập giá trị đơn hàng tối thiểu"
													className="max-w-[300px]"
												/>
												<span>VNĐ</span>
											</div>
											<p className="text-xs text-muted-foreground">
												Để trống nếu không có giá trị
												tối thiểu
											</p>
										</div>

										<Separator />

										<div className="space-y-2">
											<Label htmlFor="usage-limit">
												Giới hạn sử dụng
											</Label>
											<Input
												id="usage-limit"
												type="number"
												placeholder="Nhập số lần sử dụng tối đa"
												className="max-w-[300px]"
											/>
											<p className="text-xs text-muted-foreground">
												Để trống nếu không giới hạn số
												lần sử dụng
											</p>
										</div>

										<Separator />

										<div className="space-y-2">
											<Label htmlFor="usage-per-customer">
												Giới hạn sử dụng trên mỗi khách
												hàng
											</Label>
											<Input
												id="usage-per-customer"
												type="number"
												placeholder="Nhập số lần sử dụng tối đa trên mỗi khách hàng"
												className="max-w-[300px]"
											/>
											<p className="text-xs text-muted-foreground">
												Để trống nếu không giới hạn số
												lần sử dụng trên mỗi khách hàng
											</p>
										</div>

										<Separator />

										<div className="space-y-2">
											<div className="flex items-center justify-between">
												<Label htmlFor="combine-with-other">
													Kết hợp với khuyến mãi khác
												</Label>
												<Switch id="combine-with-other" />
											</div>
											<p className="text-xs text-muted-foreground">
												Cho phép kết hợp khuyến mãi này
												với các khuyến mãi khác
											</p>
										</div>
									</CardContent>
								</Card>
							</TabsContent>

							<TabsContent value="products" className="space-y-4">
								<Card>
									<CardHeader>
										<CardTitle>Sản phẩm áp dụng</CardTitle>
										<CardDescription>
											Chọn sản phẩm hoặc danh mục sản phẩm
											được áp dụng khuyến mãi
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="space-y-2">
											<Label>
												Phạm vi áp dụng{' '}
												<span className="text-red-500">
													*
												</span>
											</Label>
											<RadioGroup defaultValue="all">
												<div className="flex items-center space-x-2">
													<RadioGroupItem
														value="all"
														id="apply-all"
													/>
													<Label htmlFor="apply-all">
														Tất cả sản phẩm
													</Label>
												</div>
												<div className="flex items-center space-x-2">
													<RadioGroupItem
														value="categories"
														id="apply-categories"
													/>
													<Label htmlFor="apply-categories">
														Danh mục sản phẩm
													</Label>
												</div>
												<div className="flex items-center space-x-2">
													<RadioGroupItem
														value="products"
														id="apply-products"
													/>
													<Label htmlFor="apply-products">
														Sản phẩm cụ thể
													</Label>
												</div>
											</RadioGroup>
										</div>

										<Separator />

										<div className="space-y-2">
											<Label>Danh mục sản phẩm</Label>
											<div className="space-y-2">
												<div className="flex items-center space-x-2">
													<Checkbox id="category-shirts" />
													<Label htmlFor="category-shirts">
														Áo
													</Label>
												</div>
												<div className="flex items-center space-x-2">
													<Checkbox id="category-pants" />
													<Label htmlFor="category-pants">
														Quần
													</Label>
												</div>
												<div className="flex items-center space-x-2">
													<Checkbox id="category-dresses" />
													<Label htmlFor="category-dresses">
														Váy
													</Label>
												</div>
												<div className="flex items-center space-x-2">
													<Checkbox id="category-accessories" />
													<Label htmlFor="category-accessories">
														Phụ kiện
													</Label>
												</div>
												<div className="flex items-center space-x-2">
													<Checkbox id="category-shoes" />
													<Label htmlFor="category-shoes">
														Giày dép
													</Label>
												</div>
											</div>
										</div>

										<Separator />

										<div className="space-y-2">
											<div className="flex items-center justify-between">
												<Label>Sản phẩm cụ thể</Label>
												<Button
													variant="outline"
													size="sm"
												>
													<Plus className="mr-2 h-4 w-4" />
													Thêm sản phẩm
												</Button>
											</div>
											<p className="text-xs text-muted-foreground">
												Chọn các sản phẩm cụ thể được áp
												dụng khuyến mãi
											</p>

											<div className="rounded-md border mt-4">
												<table className="w-full">
													<thead>
														<tr className="border-b">
															<th className="px-4 py-3 text-left text-sm font-medium">
																Sản phẩm
															</th>
															<th className="px-4 py-3 text-left text-sm font-medium">
																Mã SKU
															</th>
															<th className="px-4 py-3 text-left text-sm font-medium">
																Giá
															</th>
															<th className="px-4 py-3 text-left text-sm font-medium">
																Hành động
															</th>
														</tr>
													</thead>
													<tbody>
														<tr className="border-b">
															<td className="px-4 py-3 text-sm">
																Áo thun nam
																basic
															</td>
															<td className="px-4 py-3 text-sm">
																AT-NAM-001
															</td>
															<td className="px-4 py-3 text-sm">
																250.000đ
															</td>
															<td className="px-4 py-3 text-sm">
																<Button
																	variant="ghost"
																	size="icon"
																	className="text-red-500"
																>
																	<Trash2 className="h-4 w-4" />
																</Button>
															</td>
														</tr>
														<tr className="border-b">
															<td className="px-4 py-3 text-sm">
																Quần jean slim
																fit
															</td>
															<td className="px-4 py-3 text-sm">
																QJ-NAM-001
															</td>
															<td className="px-4 py-3 text-sm">
																650.000đ
															</td>
															<td className="px-4 py-3 text-sm">
																<Button
																	variant="ghost"
																	size="icon"
																	className="text-red-500"
																>
																	<Trash2 className="h-4 w-4" />
																</Button>
															</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
									</CardContent>
								</Card>
							</TabsContent>

							<TabsContent
								value="customers"
								className="space-y-4"
							>
								<Card>
									<CardHeader>
										<CardTitle>
											Khách hàng áp dụng
										</CardTitle>
										<CardDescription>
											Chọn khách hàng hoặc nhóm khách hàng
											được áp dụng khuyến mãi
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="space-y-2">
											<Label>
												Phạm vi áp dụng{' '}
												<span className="text-red-500">
													*
												</span>
											</Label>
											<RadioGroup defaultValue="all">
												<div className="flex items-center space-x-2">
													<RadioGroupItem
														value="all"
														id="customer-all"
													/>
													<Label htmlFor="customer-all">
														Tất cả khách hàng
													</Label>
												</div>
												<div className="flex items-center space-x-2">
													<RadioGroupItem
														value="new"
														id="customer-new"
													/>
													<Label htmlFor="customer-new">
														Khách hàng mới
													</Label>
												</div>
												<div className="flex items-center space-x-2">
													<RadioGroupItem
														value="groups"
														id="customer-groups"
													/>
													<Label htmlFor="customer-groups">
														Nhóm khách hàng
													</Label>
												</div>
												<div className="flex items-center space-x-2">
													<RadioGroupItem
														value="specific"
														id="customer-specific"
													/>
													<Label htmlFor="customer-specific">
														Khách hàng cụ thể
													</Label>
												</div>
											</RadioGroup>
										</div>

										<Separator />

										<div className="space-y-2">
											<Label>Nhóm khách hàng</Label>
											<div className="space-y-2">
												<div className="flex items-center space-x-2">
													<Checkbox id="group-vip" />
													<Label htmlFor="group-vip">
														Khách hàng VIP
													</Label>
												</div>
												<div className="flex items-center space-x-2">
													<Checkbox id="group-regular" />
													<Label htmlFor="group-regular">
														Khách hàng thường xuyên
													</Label>
												</div>
												<div className="flex items-center space-x-2">
													<Checkbox id="group-wholesale" />
													<Label htmlFor="group-wholesale">
														Khách hàng bán buôn
													</Label>
												</div>
											</div>
										</div>

										<Separator />

										<div className="space-y-2">
											<div className="flex items-center justify-between">
												<Label>Khách hàng cụ thể</Label>
												<Button
													variant="outline"
													size="sm"
												>
													<Plus className="mr-2 h-4 w-4" />
													Thêm khách hàng
												</Button>
											</div>
											<p className="text-xs text-muted-foreground">
												Chọn các khách hàng cụ thể được
												áp dụng khuyến mãi
											</p>

											<div className="rounded-md border mt-4">
												<table className="w-full">
													<thead>
														<tr className="border-b">
															<th className="px-4 py-3 text-left text-sm font-medium">
																Khách hàng
															</th>
															<th className="px-4 py-3 text-left text-sm font-medium">
																Email
															</th>
															<th className="px-4 py-3 text-left text-sm font-medium">
																Số điện thoại
															</th>
															<th className="px-4 py-3 text-left text-sm font-medium">
																Hành động
															</th>
														</tr>
													</thead>
													<tbody>
														<tr className="border-b">
															<td className="px-4 py-3 text-sm">
																Nguyễn Văn A
															</td>
															<td className="px-4 py-3 text-sm">
																nguyenvana@example.com
															</td>
															<td className="px-4 py-3 text-sm">
																0912 345 678
															</td>
															<td className="px-4 py-3 text-sm">
																<Button
																	variant="ghost"
																	size="icon"
																	className="text-red-500"
																>
																	<Trash2 className="h-4 w-4" />
																</Button>
															</td>
														</tr>
														<tr className="border-b">
															<td className="px-4 py-3 text-sm">
																Trần Thị B
															</td>
															<td className="px-4 py-3 text-sm">
																tranthib@example.com
															</td>
															<td className="px-4 py-3 text-sm">
																0987 654 321
															</td>
															<td className="px-4 py-3 text-sm">
																<Button
																	variant="ghost"
																	size="icon"
																	className="text-red-500"
																>
																	<Trash2 className="h-4 w-4" />
																</Button>
															</td>
														</tr>
													</tbody>
												</table>
											</div>
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
