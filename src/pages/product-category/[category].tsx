import Link from 'next/link'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { Menu } from '@headlessui/react'
import { useTranslations } from 'next-intl'

import Header from '../../../components/Header/Header'
import Footer from '../../../components/Footer/Footer'
import Card from '../../../components/Card/Card'
import Pagination from '../../../components/Util/Pagination'
import { apiProductsType, itemType } from '../../../context/cart/cart-types'
import DownArrow from '../../../public/icons/DownArrow'

type OrderType = 'latest' | 'price' | 'price-desc'

type Props = {
	items: itemType[]
	page: number
	numberOfProducts: number
	orderby: OrderType
}

const ProductCategory: React.FC<Props> = ({
	items,
	page,
	numberOfProducts,
	orderby,
}) => {
	const t = useTranslations('Category')

	const router = useRouter()
	const { category } = router.query
	const lastPage = Math.ceil(numberOfProducts / 10)

	const capitalizedCategory =
		category!.toString().charAt(0).toUpperCase() +
		category!.toString().slice(1)

	const firstIndex = page === 1 ? page : page * 10 - 9
	const lastIndex = page * 10

	return (
		<div>
			{/* ===== Head Section ===== */}
			<Header title={`${capitalizedCategory} - Haru Fashion`} />

			<main id="main-content">
				{/* ===== Breadcrumb Section ===== */}
				<div className="bg-lightgreen h-16 w-full flex items-center">
					<div className="app-x-padding app-max-width w-full">
						<div className="breadcrumb">
							<Link href="/" className="text-gray-400">
								{t('home')}
							</Link>{' '}
							/{' '}
							<span className="capitalize">
								{t(category as string)}
							</span>
						</div>
					</div>
				</div>

				{/* ===== Heading & Filter Section ===== */}
				<div className="app-x-padding app-max-width w-full mt-8">
					<h3 className="text-4xl mb-2 capitalize">
						{t(category as string)}
					</h3>
					<div className="flex flex-col-reverse sm:flex-row gap-4 sm:gap-0 justify-between mt-4 sm:mt-6">
						<span>
							{t('showing_from_to', {
								from: firstIndex,
								to:
									numberOfProducts < lastIndex
										? numberOfProducts
										: lastIndex,
								all: numberOfProducts,
							})}
						</span>
						{category !== 'new-arrivals' && (
							<SortMenu orderby={orderby} />
						)}
					</div>
				</div>

				{/* ===== Main Content Section ===== */}
				<div className="app-x-padding app-max-width mt-3 mb-14">
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10 sm:gap-y-6 mb-10">
						{items.map((item) => (
							<Card key={item.id} item={item} />
						))}
					</div>
					{category !== 'new-arrivals' && (
						<Pagination
							currentPage={page}
							lastPage={lastPage}
							orderby={orderby}
						/>
					)}
				</div>
			</main>

			{/* ===== Footer Section ===== */}
			<Footer />
		</div>
	)
}

export const getServerSideProps: GetServerSideProps = async ({
	params,
	locale,
	query: { page = 1, orderby = 'latest' },
}) => {
	// const paramCategory = params!.category as string

	// const start = +page === 1 ? 0 : (+page - 1) * 10

	// let numberOfProducts = 0

	// if (paramCategory !== 'new-arrivals') {
	// 	const numberOfProductsResponse = await axios.get(
	// 		`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products/count?category=${paramCategory}`,
	// 	)
	// 	numberOfProducts = +numberOfProductsResponse.data.count
	// } else {
	// 	numberOfProducts = 10
	// }

	// let order_by: string

	// if (orderby === 'price') {
	// 	order_by = 'price'
	// } else if (orderby === 'price-desc') {
	// 	order_by = 'price.desc'
	// } else {
	// 	order_by = 'createdAt.desc'
	// }

	// const reqUrl =
	// 	paramCategory === 'new-arrivals'
	// 		? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products?order_by=createdAt.desc&limit=10`
	// 		: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products?order_by=${order_by}&offset=${start}&limit=10&category=${paramCategory}`

	// const res = await axios.get(reqUrl)

	// const fetchedProducts = res.data.data.map((product: apiProductsType) => ({
	// 	...product,
	// 	img1: product.image1,
	// 	img2: product.image2,
	// }))

	// let items: apiProductsType[] = []
	// fetchedProducts.forEach((product: apiProductsType) => {
	// 	items.push(product)
	// })
	// FIXME: Call API to get searched products
	const items = [
		{
			id: 100,
			name: 'Tempsoft',
			price: '33.56',
			img1: 'https://res.cloudinary.com/noezectz/image/upload/v1646031201/haru/125_zp8lpt.webp',
			img2: 'https://res.cloudinary.com/noezectz/image/upload/v1646031201/haru/126_oyivlh.webp',
		},
		{
			id: 99,
			name: 'Overhold',
			price: '123.91',
			img1: 'https://res.cloudinary.com/noezectz/image/upload/v1646028883/haru/83_or2yx2.webp',
			img2: 'https://res.cloudinary.com/noezectz/image/upload/v1646028883/haru/84_xhul9w.webp',
		},
		{
			id: 98,
			name: 'Ronstring',
			price: '134.08',
			img1: 'https://res.cloudinary.com/noezectz/image/upload/v1646024958/haru/11_x5vopz.jpg',
			img2: 'https://res.cloudinary.com/noezectz/image/upload/v1646024957/haru/12_fyz5hq.jpg',
		},
		{
			id: 97,
			name: 'Solarbreeze',
			price: '124.16',
			img1: 'https://res.cloudinary.com/noezectz/image/upload/v1646039361/haru/151_gsi9dp.webp',
			img2: 'https://res.cloudinary.com/noezectz/image/upload/v1646039361/haru/152_l7p79y.webp',
		},
		{
			id: 96,
			name: 'Voltsillam',
			price: '123.99',
			img1: 'https://res.cloudinary.com/noezectz/image/upload/v1646039402/haru/153_szqtx3.webp',
			img2: 'https://res.cloudinary.com/noezectz/image/upload/v1646039402/haru/154_gxsayj.webp',
		},
		{
			id: 95,
			name: 'Stringtough',
			price: '141.38',
			img1: 'https://res.cloudinary.com/noezectz/image/upload/v1646028602/haru/77_wz1few.webp',
			img2: 'https://res.cloudinary.com/noezectz/image/upload/v1646028602/haru/78_e1x1ae.webp',
		},
		{
			id: 94,
			name: 'Greenlam',
			price: '61.94',
			img1: 'https://res.cloudinary.com/noezectz/image/upload/v1646026083/haru/35_q9xywd.jpg',
			img2: 'https://res.cloudinary.com/noezectz/image/upload/v1646026083/haru/36_agho06.jpg',
		},
		{
			id: 93,
			name: 'Namfix',
			price: '150.91',
			img1: 'https://res.cloudinary.com/noezectz/image/upload/v1646028517/haru/73_h5kdt8.webp',
			img2: 'https://res.cloudinary.com/noezectz/image/upload/v1646028517/haru/74_jtxobp.webp',
		},
		{
			id: 92,
			name: 'Domainer',
			price: '178.12',
			img1: 'https://res.cloudinary.com/noezectz/image/upload/v1646038633/haru/133_iosxvx.webp',
			img2: 'https://res.cloudinary.com/noezectz/image/upload/v1646038633/haru/134_psybg7.webp',
		},
		{
			id: 91,
			name: 'Cardguard',
			price: '163.24',
			img1: 'https://res.cloudinary.com/noezectz/image/upload/v1646028339/haru/65_ehs8cr.webp',
			img2: 'https://res.cloudinary.com/noezectz/image/upload/v1646028339/haru/66_tmhgnk.webp',
		},
	]
	const numberOfProducts = items.length

	return {
		props: {
			messages: (await import(`../../../messages/common/${locale}.json`))
				.default,
			items,
			numberOfProducts,
			page: +page,
			orderby,
		},
	}
}

const SortMenu: React.FC<{ orderby: OrderType }> = ({ orderby }) => {
	const t = useTranslations('Navigation')
	const router = useRouter()
	const { category } = router.query

	let currentOrder: string

	if (orderby === 'price') {
		currentOrder = 'sort_by_price'
	} else if (orderby === 'price-desc') {
		currentOrder = 'sort_by_price_desc'
	} else {
		currentOrder = 'sort_by_latest'
	}
	return (
		<Menu as="div" className="relative">
			<Menu.Button
				as="a"
				href="#"
				className="flex items-center capitalize"
			>
				{t(currentOrder)} <DownArrow />
			</Menu.Button>
			<Menu.Items className="flex flex-col z-10 items-start text-xs sm:text-sm w-auto sm:right-0 absolute p-1 border border-gray200 bg-white mt-2 outline-none">
				<Menu.Item>
					{({ active }) => (
						<button
							type="button"
							onClick={() =>
								router.push(
									`/product-category/${category}?orderby=latest`,
								)
							}
							className={`${
								active ? 'bg-gray100 text-gray500' : 'bg-white'
							} py-2 px-4 text-left w-full focus:outline-none whitespace-nowrap ${
								currentOrder === 'sort_by_latest' &&
								'bg-gray500 text-gray100'
							}`}
						>
							{t('sort_by_latest')}
						</button>
					)}
				</Menu.Item>
				<Menu.Item>
					{({ active }) => (
						<button
							type="button"
							onClick={() =>
								router.push(
									`/product-category/${category}?orderby=price`,
								)
							}
							className={`${
								active ? 'bg-gray100 text-gray500' : 'bg-white'
							} py-2 px-4 text-left w-full focus:outline-none whitespace-nowrap ${
								currentOrder === 'sort_by_price' &&
								'bg-gray500 text-gray100'
							}`}
						>
							{t('sort_by_price')}
						</button>
					)}
				</Menu.Item>
				<Menu.Item>
					{({ active }) => (
						<button
							type="button"
							onClick={() =>
								router.push(
									`/product-category/${category}?orderby=price-desc`,
								)
							}
							className={`${
								active ? 'bg-gray100 text-gray500' : 'bg-white'
							} py-2 px-4 text-left w-full focus:outline-none whitespace-nowrap ${
								currentOrder === 'sort_by_price_desc' &&
								'bg-gray500 text-gray100'
							}`}
						>
							{t('sort_by_price_desc')}
						</button>
					)}
				</Menu.Item>
			</Menu.Items>
		</Menu>
	)
}

export default ProductCategory
