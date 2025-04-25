type Product = {
	maBienThe: number
	soLuongBan: number
	tenSanPham: string
}

export function TopProducts({ products }: { products: Product[] }) {
	return (
		<div className="overflow-x-auto rounded-lg shadow">
			<table className="w-full text-left bg-white rounded-lg">
				<thead className="bg-gray-50">
					<tr>
						<th className="py-2 px-3 font-semibold">
							Tên sản phẩm
						</th>
						<th className="py-2 px-3 font-semibold">Biến thể</th>
						<th className="py-2 px-3 font-semibold">
							Số lượng bán
						</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product) => (
						<tr
							key={product.maBienThe}
							className="border-b last:border-b-0 hover:bg-gray-50 transition"
						>
							<td className="py-2 px-3">{product.tenSanPham}</td>
							<td className="py-2 px-3">
								{product.tenMau} - {product.tenKichCo}
							</td>
							<td className="py-2 px-3 font-bold text-green-700">
								{product.soLuongBan}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
