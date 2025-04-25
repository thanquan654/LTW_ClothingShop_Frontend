import React, { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useTranslations } from 'next-intl'
import https from 'https'

import SearchIcon from '../../public/icons/SearchIcon'
import axios from 'axios'
import { apiProductsType } from '../../context/cart/cart-types'
import { itemType } from '../../context/wishlist/wishlist-type'
import Card from '../Card/Card'
import Loading from '../../public/icons/Loading'
import GhostButton from '../Buttons/GhostButton'
import { useRouter } from 'next/router'

export default function SearchForm() {
	const t = useTranslations('Navigation')
	const router = useRouter()
	const [open, setOpen] = useState(false)
	const [searchValue, setSearchValue] = useState('')
	const [searchItems, setSearchItems] = useState<itemType[]>([])
	const [isFetching, setIsFetching] = useState(false)
	const [noResult, setNoResult] = useState(false)
	const [moreThanFour, setMoreThanFour] = useState(false)

	function closeModal() {
		setOpen(false)
		setSearchItems([])
		setNoResult(false)
		setMoreThanFour(false)
	}

	function openModal() {
		setOpen(true)
	}

	useEffect(() => {
		if (!isFetching) return
		const fetchData = async () => {
			const agent = new https.Agent({ rejectUnauthorized: false })
			const res = await axios.get(
				`https://localhost:7275/api/Product?Search=${encodeURIComponent(
					searchValue,
				)}&Page=1&PageSize=10&SortBy=id&SortDirection=asc`,
				{ httpsAgent: agent },
			)
			const fetchedProducts = res.data.data

			console.log('🚀 ~ fetchedProducts:', fetchedProducts)

			const items = fetchedProducts.map((product: any) => ({
				id: product.id,
				name: product.tenSanPham,
				price: product.giaTien,
				// img1: product.anhDaiDien,
				img1: 'https://res.cloudinary.com/noezectz/image/upload/v1646028339/haru/65_ehs8cr.webp',
				saleCount: product.luotBan,
			}))

			setSearchItems(items)
			setIsFetching(false)
		}
		fetchData()
	}, [isFetching, searchValue])

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setSearchItems([])
		setIsFetching(true)
	}

	const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
		setSearchValue((e.target as HTMLInputElement).value)
		setSearchItems([])
		setNoResult(false)
		setMoreThanFour(false)
	}

	return (
		<>
			<div className="">
				<button type="button" aria-label="Search" onClick={openModal}>
					<SearchIcon />
				</button>
			</div>
			<Transition show={open} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 overflow-y-auto"
					style={{ zIndex: 99999 }}
					static
					open={open}
					onClose={closeModal}
				>
					<div className="min-h-screen text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<div className="fixed inset-0 bg-gray-500 opacity-50" />
						</Transition.Child>

						{/* This element is to trick the browser into centering the modal contents. */}
						{/* <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span> */}
						<Transition.Child
							as={Fragment}
							enter="ease-linear duration-400"
							enterFrom="-translate-y-full"
							enterTo="translate-y-0"
							leave="ease-linear duration-300"
							leaveFrom="translate-y-0"
							leaveTo="-translate-y-full"
						>
							<div className="relative translate-y inline-block w-full pt-6 pb-12 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl">
								<div className="app-max-width app-x-padding">
									<div className="w-3/5 m-auto">
										<div className="flex justify-end mb-8">
											<button
												type="button"
												className="outline-none focus:outline-none text-2xl"
												onClick={closeModal}
											>
												&#10005;
											</button>
										</div>
										<form
											className="mt-2 flex items-center"
											onSubmit={handleSubmit}
										>
											{isFetching ? (
												<Loading />
											) : (
												<SearchIcon extraClass="text-gray300 w-8 h-8" />
											)}
											<input
												type="search"
												placeholder={t(
													'search_anything',
												)}
												className="px-4 py-2 w-full focus:outline-none text-2xl"
												onChange={handleChange}
											/>
										</form>
										<div className="border-t-2 border-gray300"></div>
									</div>
									{noResult ? (
										<div className="flex justify-center mt-8">
											<span>{t('no_result')}</span>
										</div>
									) : (
										<div className="text-center">
											<div
												className="grid gap-x-4 justify-center my-8"
												style={{
													gridTemplateColumns:
														'repeat( auto-fit, minmax(120px, 170px) )',
												}}
											>
												{searchItems.map((item) => (
													<Card
														key={item.id}
														item={item}
													/>
												))}
											</div>
											{moreThanFour && (
												<GhostButton
													onClick={() =>
														router.push(
															`/search?q=${searchValue}`,
														)
													}
												>
													{t('view_all')}
												</GhostButton>
											)}
										</div>
									)}
								</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</>
	)
}
