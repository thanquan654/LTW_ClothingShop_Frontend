import Link from 'next/link'

export function MainNav() {
	return (
		<nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
			<Link
				href="/admin/"
				className="text-sm font-medium transition-colors hover:text-primary"
			>
				Dashboard
			</Link>
			<Link
				href="/admin/orders"
				className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
			>
				Đơn hàng
			</Link>
			<Link
				href="/admin/products"
				className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
			>
				Sản phẩm
			</Link>
			<Link
				href="/admin/reports"
				className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
			>
				Báo cáo
			</Link>
		</nav>
	)
}
