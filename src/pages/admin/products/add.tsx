import { AdminSidebar } from '@/components/admin-sidebar'
import { MainNav } from '@/components/main-nav'
import { ModeToggle } from '@/components/mode-toggle'
import { Search } from '@/components/search'
import { Button } from '@/components/ui/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { UserNav } from '@/components/user-nav'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import Image from 'next/image'

export default function AddProductPage() {
	const [userRole, setUserRole] = useState<UserRole>('admin')
	const [name, setName] = useState('')
	const [price, setPrice] = useState('')
	const [description, setDescription] = useState('')
	const [category, setCategory] = useState('')
	const [brand, setBrand] = useState('')
	const [status, setStatus] = useState(true)
	const [image, setImage] = useState<File | null>(null)
	const [imagePreview, setImagePreview] = useState<string | null>(null)
	const [variants, setVariants] = useState([
		{ size: '', color: '', price: '', sku: '', stock: '' },
	])

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setImage(e.target.files[0])
			setImagePreview(URL.createObjectURL(e.target.files[0]))
		}
	}

	const handleAddVariant = () => {
		setVariants([...variants, { size: '', color: '', sku: '', stock: '' }])
	}

	const handleVariantChange = (idx: number, field: string, value: string) => {
		const newVariants = [...variants]
		newVariants[idx][field] = value
		setVariants(newVariants)
	}

	const handleRemoveVariant = (idx: number) => {
		setVariants(variants.filter((_, i) => i !== idx))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		let imageUrl = ''

		// 1. Upload ảnh trước nếu có
		if (image) {
			const imgForm = new FormData()
			imgForm.append('file', image)
			const res = await fetch(
				'https://localhost:7275/api/Product/upload-image',
				{
					method: 'POST',
					body: imgForm,
				},
			)
			const imgData = await res.json()
			imageUrl =
				imgData.url ||
				imgData.imageUrl ||
				imgData.link ||
				imgData.path ||
				''
			if (!imageUrl) {
				alert('Upload ảnh thất bại!')
				return
			}
		}

		// 2. Gửi data text lên API
		const productData = {
			tenSanPham: name,
			giaTien: price,
			moTa: description,
			danhMuc: category,
			imageUrl: imageUrl,
			variants: variants,
		}

		const res2 = await fetch('https://localhost:7275/api/Product', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(productData),
		})

		if (res2.ok) {
			alert('Thêm sản phẩm thành công!')
			// reset form nếu muốn
		} else {
			alert('Tạo sản phẩm thất bại!')
		}
	}

	const toggleRole = () => {
		setUserRole(userRole === 'admin' ? 'staff' : 'admin')
	}

	return (
		<SidebarProvider>
			<AdminSidebar userRole={userRole} />
			<main className="flex-1 bg-gray-50 min-h-screen">
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
				<div className="max-w-3xl mx-auto">
					<Card className="shadow-lg border-0">
						<CardHeader>
							<CardTitle className="text-2xl font-bold">
								Thêm sản phẩm mới
							</CardTitle>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleSubmit} className="space-y-8">
								{/* Thông tin cơ bản */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="space-y-4">
										<div>
											<Label htmlFor="product-name">
												Tên sản phẩm
											</Label>
											<Input
												id="product-name"
												placeholder="Nhập tên sản phẩm"
												value={name}
												onChange={(e) =>
													setName(e.target.value)
												}
												required
											/>
										</div>
										<div>
											<Label htmlFor="product-price">
												Giá bán
											</Label>
											<Input
												id="product-price"
												type="number"
												placeholder="Nhập giá bán"
												value={price}
												onChange={(e) =>
													setPrice(e.target.value)
												}
												required
											/>
										</div>
										<div>
											<Label htmlFor="product-category">
												Danh mục
											</Label>
											<Select
												value={category}
												onValueChange={setCategory}
											>
												<SelectTrigger id="product-category">
													<SelectValue placeholder="Chọn danh mục" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="Áo">
														Áo
													</SelectItem>
													<SelectItem value="Quần">
														Quần
													</SelectItem>
												</SelectContent>
											</Select>
										</div>
									</div>
									<div className="flex flex-col items-center gap-4">
										<Label>Ảnh đại diện</Label>
										<div className="w-40 h-40 border rounded-lg flex items-center justify-center bg-gray-100 overflow-hidden">
											{imagePreview ? (
												<Image
													src={imagePreview}
													alt="Preview"
													className="object-cover w-full h-full"
													width={160}
													height={160}
												/>
											) : (
												<span className="text-gray-400">
													Chưa chọn ảnh
												</span>
											)}
										</div>
										<Input
											type="file"
											accept="image/*"
											onChange={handleImageChange}
										/>
									</div>
								</div>
								<div>
									<Label htmlFor="product-description">
										Mô tả sản phẩm
									</Label>
									<Textarea
										id="product-description"
										placeholder="Nhập mô tả sản phẩm"
										value={description}
										onChange={(e) =>
											setDescription(e.target.value)
										}
									/>
								</div>
								{/* Biến thể */}
								<div>
									<Label className="font-semibold mb-2 block">
										Biến thể
									</Label>
									{variants.map((variant, idx) => (
										<div
											key={idx}
											className="flex flex-col md:flex-row gap-2 mb-2"
										>
											<Input
												placeholder="Size"
												value={variant.size}
												onChange={(e) =>
													handleVariantChange(
														idx,
														'size',
														e.target.value,
													)
												}
												className="md:w-24"
											/>
											<Input
												placeholder="Màu"
												value={variant.color}
												onChange={(e) =>
													handleVariantChange(
														idx,
														'color',
														e.target.value,
													)
												}
												className="md:w-24"
											/>
											<Input
												placeholder="SKU"
												value={variant.sku}
												onChange={(e) =>
													handleVariantChange(
														idx,
														'sku',
														e.target.value,
													)
												}
												className="md:w-32"
											/>
											<Input
												placeholder="Tồn kho"
												type="number"
												value={variant.stock}
												onChange={(e) =>
													handleVariantChange(
														idx,
														'stock',
														e.target.value,
													)
												}
												className="md:w-24"
											/>
											<Button
												type="button"
												variant="ghost"
												onClick={() =>
													handleRemoveVariant(idx)
												}
												className="text-red-500"
											>
												Xóa
											</Button>
										</div>
									))}
									<Button
										type="button"
										variant="outline"
										onClick={handleAddVariant}
										className="mt-2"
									>
										Thêm biến thể
									</Button>
								</div>
								<div className="flex justify-end">
									<Button
										type="submit"
										className="mt-4 px-8 py-2 text-base font-semibold"
									>
										Lưu sản phẩm
									</Button>
								</div>
							</form>
						</CardContent>
					</Card>
				</div>
			</main>
		</SidebarProvider>
	)
}
