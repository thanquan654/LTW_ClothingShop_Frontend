type Order = {
	maDonHang: string
	ngayDatHang: string
	tongTien: number
	trangThaiDonHang: string
}

const statusColor = (status: string) => {
	switch (status) {
		case 'Chờ xác nhận':
			return 'bg-blue-100 text-blue-700'
		case 'Đang xử lý':
			return 'bg-orange-100 text-orange-700'
		case 'Đang giao hàng':
			return 'bg-purple-100 text-purple-700'
		case 'Đã giao':
			return 'bg-green-100 text-green-700'
		case 'Đã hủy':
			return 'bg-red-100 text-red-700'
		default:
			return 'bg-gray-100 text-gray-700'
	}
}

export function RecentOrders({ orders }: { orders: Order[] }) {
	return (
		<div className="overflow-x-auto rounded-lg shadow">
			<table className="w-full text-left bg-white rounded-lg">
				<thead className="bg-gray-50">
					<tr>
						<th className="py-2 px-3 font-semibold">Mã ĐH</th>
						<th className="py-2 px-3 font-semibold">Ngày đặt</th>
						<th className="py-2 px-3 font-semibold">Tổng tiền</th>
						<th className="py-2 px-3 font-semibold">Trạng thái</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((order) => (
						<tr
							key={order.maDonHang}
							className="border-b last:border-b-0 hover:bg-gray-50 transition"
						>
							<td className="py-2 px-3">{order.maDonHang}</td>
							<td className="py-2 px-3">
								{new Date(order.ngayDatHang).toLocaleString(
									'vi-VN',
								)}
							</td>
							<td className="py-2 px-3">
								{order.tongTien.toLocaleString()}₫
							</td>
							<td className="py-2 px-3">
								<span
									className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(
										order.trangThaiDonHang,
									)}`}
								>
									{order.trangThaiDonHang}
								</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
