/* eslint-disable @next/next/no-html-link-for-pages */
'use client'

import {
	BarChart3,
	ShoppingBag,
	Package,
	PackageOpen,
	FileBarChart,
	Tag,
	Users,
	UserCircle,
	Settings,
	LogOut,
} from 'lucide-react'
import {
	Sidebar,
	SidebarHeader,
	SidebarContent,
	SidebarFooter,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { UserRole } from '@/types'
import Link from 'next/link'

interface AdminSidebarProps {
	userRole: UserRole
}

export function AdminSidebar({ userRole }: AdminSidebarProps) {
	return (
		<Sidebar>
			<SidebarHeader className="border-b">
				<div className="flex h-16 items-center px-4">
					<h2 className="text-xl font-bold tracking-tight">HARU</h2>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild tooltip="Dashboard">
							<Link href="/admin/">
								<BarChart3 />
								<span>Dashboard</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton asChild tooltip="Đơn hàng">
							<Link href="/admin/orders">
								<ShoppingBag />
								<span>Đơn hàng</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton asChild tooltip="Sản phẩm">
							<Link href="/admin/products">
								<Package />
								<span>Sản phẩm</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton asChild tooltip="Kho hàng">
							<Link href="/inventory">
								<PackageOpen />
								<span>Kho hàng</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton asChild tooltip="Báo cáo">
							<Link href="/reports">
								<FileBarChart />
								<span>Báo cáo</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton asChild tooltip="Khuyến mãi">
							<Link href="/promotions">
								<Tag />
								<span>Khuyến mãi</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>

					{userRole === 'admin' && (
						<>
							<SidebarMenuItem>
								<SidebarMenuButton asChild tooltip="Nhân viên">
									<a href="/staff">
										<Users />
										<span>Nhân viên</span>
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</>
					)}

					<SidebarMenuItem>
						<SidebarMenuButton asChild tooltip="Khách hàng">
							<a href="/customers">
								<UserCircle />
								<span>Khách hàng</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton asChild tooltip="Cài đặt">
							<a href="/settings">
								<Settings />
								<span>Cài đặt</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarContent>
			<SidebarFooter className="border-t">
				<div className="flex items-center justify-between p-4">
					<div className="flex items-center gap-2">
						<Avatar className="h-8 w-8">
							<AvatarImage
								src="/placeholder-user.jpg"
								alt="Avatar"
							/>
							<AvatarFallback>AD</AvatarFallback>
						</Avatar>
						<div className="space-y-0.5">
							<p className="text-sm font-medium">
								{userRole === 'admin' ? 'Admin' : 'Nhân viên'}
							</p>
						</div>
					</div>
					<LogOut className="h-5 w-5 cursor-pointer text-muted-foreground hover:text-foreground" />
				</div>
			</SidebarFooter>
		</Sidebar>
	)
}
