import React, { useState, useEffect } from 'react'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import axios from 'axios'
import https from 'https'

import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Button from '../../components/Buttons/Button'
import Slideshow from '../../components/HeroSection/Slideshow'
import OverlayContainer from '../../components/OverlayContainer/OverlayContainer'
import Card from '../../components/Card/Card'
import TestiSlider from '../../components/TestiSlider/TestiSlider'
import { apiProductsType, itemType } from '../../context/cart/cart-types'
import LinkButton from '../../components/Buttons/LinkButton'

// /bg-img/ourshop.png
import ourShop from '../../public/bg-img/ourshop.png'

type Props = {
	products: itemType[]
}

const Home: React.FC<Props> = ({ products }) => {
	const t = useTranslations('Index')
	const [currentItems, setCurrentItems] = useState(products)
	const [isFetching, setIsFetching] = useState(false)
	const [page, setPage] = useState(1)

	useEffect(() => {
		if (!isFetching) return
		const fetchData = async () => {
			const agent = new https.Agent({ rejectUnauthorized: false })
			const res = await axios.get(
				`https://localhost:7275/api/Product?Page=1&PageSize=10&SortBy=id&SortDirection=asc`,
				{ httpsAgent: agent },
			)
			const fetchedProducts = res.data.data

			console.log('🚀 ~ fetchedProducts:', fetchedProducts)

			const productsData = fetchedProducts.map((product: any) => ({
				id: product.id,
				name: product.tenSanPham,
				price: product.giaTien,
				// img1: product.anhDaiDien,
				img1: 'https://res.cloudinary.com/noezectz/image/upload/v1646028339/haru/65_ehs8cr.webp',
				saleCount: product.luotBan,
			}))

			setCurrentItems((products) => [...products, ...productsData])
			setIsFetching(false)
		}
		fetchData()
	}, [isFetching, page])

	const handleSeemore = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		e.preventDefault()
		setPage(page + 1)
		setIsFetching(true)
	}

	return (
		<>
			{/* ===== Header Section ===== */}
			<Header />

			{/* ===== Carousel Section ===== */}
			<Slideshow />

			<main id="main-content" className="-mt-20">
				{/* ===== Category Section ===== */}
				<section className="w-full h-auto py-10 border border-b-2 border-gray-100">
					<div className="app-max-width app-x-padding h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
						<div className="w-full sm:col-span-2 lg:col-span-2">
							<OverlayContainer
								imgSrc="/bg-img/banner_minipage1.jpg"
								imgSrc2="/bg-img/banner_minipage1-tablet.jpg"
								imgAlt="New Arrivals"
							>
								<LinkButton
									href="/product-category/new-arrivals"
									extraClass="absolute bottom-10-per sm:right-10-per z-20"
								>
									{t('new_arrivals')}
								</LinkButton>
							</OverlayContainer>
						</div>
						<div className="w-full">
							<OverlayContainer
								imgSrc="/bg-img/banner_minipage2.jpg"
								imgAlt="Women Collection"
							>
								<LinkButton
									href="/product-category/women"
									extraClass="absolute bottom-10-per z-20"
								>
									{t('women_collection')}
								</LinkButton>
							</OverlayContainer>
						</div>
						<div className="w-full">
							<OverlayContainer
								imgSrc="/bg-img/banner_minipage3.jpg"
								imgAlt="Men Collection"
							>
								<LinkButton
									href="/product-category/men"
									extraClass="absolute bottom-10-per z-20"
								>
									{t('men_collection')}
								</LinkButton>
							</OverlayContainer>
						</div>
					</div>
				</section>

				{/* ===== Best Selling Section ===== */}
				<section className="app-max-width w-full h-full flex flex-col justify-center mt-16 mb-20">
					<div className="flex justify-center">
						<div className="w-3/4 sm:w-1/2 md:w-1/3 text-center mb-8">
							<h2 className="text-3xl mb-4">
								{t('best_selling')}
							</h2>
							<span>{t('best_selling_desc')}</span>
						</div>
					</div>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 lg:gap-x-12 gap-y-6 mb-10 app-x-padding">
						<Card key={currentItems[1].id} item={currentItems[1]} />
						{/* <Card key={currentItems[2].id} item={currentItems[2]} />
						<Card key={currentItems[3].id} item={currentItems[3]} />
						<Card key={currentItems[4].id} item={currentItems[4]} /> */}
					</div>
				</section>

				{/* ===== Testimonial Section ===== */}
				<section className="w-full hidden h-full py-16 md:flex flex-col items-center bg-lightgreen">
					<h2 className="text-3xl">{t('testimonial')}</h2>
					<TestiSlider />
				</section>

				{/* ===== Featured Products Section ===== */}
				<section className="app-max-width app-x-padding my-16 flex flex-col">
					<div className="text-center mb-6">
						<h2 className="text-3xl">{t('featured_products')}</h2>
					</div>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10 sm:gap-y-6 mb-10">
						{currentItems.map((item) => (
							<Card key={item.id} item={item} />
						))}
					</div>
					<div className="flex justify-center">
						<Button
							value={!isFetching ? t('see_more') : t('loading')}
							onClick={handleSeemore}
						/>
					</div>
				</section>

				<div className="border-gray-100 border-b-2"></div>

				{/* ===== Our Shop Section */}
				<section className="app-max-width mt-16 mb-20 flex flex-col justify-center items-center text-center">
					<div className="textBox w-3/4 md:w-2/4 lg:w-2/5 mb-6">
						<h2 className="text-3xl mb-6">{t('our_shop')}</h2>
						<span className="w-full">{t('our_shop_desc')}</span>
					</div>
					<div className="w-full app-x-padding flex justify-center">
						<Image src={ourShop} alt="Our Shop" />
					</div>
				</section>
			</main>

			{/* ===== Footer Section ===== */}
			<Footer />
		</>
	)
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	const agent = new https.Agent({ rejectUnauthorized: false })
	const res = await axios.get(
		`https://localhost:7275/api/Product?Page=1&PageSize=10&SortBy=id&SortDirection=asc`,
		{ httpsAgent: agent },
	)
	const fetchedProducts = res.data.data

	console.log('🚀 ~ fetchedProducts:', fetchedProducts)

	const products = fetchedProducts.map((product: any) => ({
		id: product.id,
		name: product.tenSanPham,
		price: product.giaTien,
		img1: product.anhDaiDien,
		// img1: 'https://res.cloudinary.com/noezectz/image/upload/v1646028339/haru/65_ehs8cr.webp',
		saleCount: product.luotBan,
	}))

	return {
		props: {
			messages: (await import(`../../messages/common/${locale}.json`))
				.default,
			products,
		},
	}
}

export default Home
