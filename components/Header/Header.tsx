import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import TopNav from './TopNav'
import WhistlistIcon from '../../public/icons/WhistlistIcon'
import UserIcon from '../../public/icons/UserIcon'
import AuthForm from '../Auth/AuthForm'
import SearchForm from '../SearchForm/SearchForm'
import CartItem from '../CartItem/CartItem'
import Menu from '../Menu/Menu'
import AppHeader from './AppHeader'

type Props = {
	title?: string
}

const Header: React.FC<Props> = ({ title }) => {
	const t = useTranslations('Navigation')
	const [scrolled, setScrolled] = useState<boolean>(false)
	const [didMount, setDidMount] = useState<boolean>(false) // to disable Can't perform a React state Warning

	const handleScroll = useCallback(() => {
		const offset = window.scrollY
		if (offset > 30) {
			setScrolled(true)
		} else {
			setScrolled(false)
		}
	}, [setScrolled])

	useEffect(() => {
		setDidMount(true)
		window.addEventListener('scroll', handleScroll)
		return () => setDidMount(false)
	}, [handleScroll])

	if (!didMount) {
		return null
	}
	return (
		<>
			{/* ===== <head> section ===== */}
			<AppHeader title={title} />

			{/* ===== Skip to main content button ===== */}
			<a
				href="#main-content"
				className="whitespace-nowrap absolute z-50 left-4 opacity-90 rounded-md bg-white px-4 py-3 transform -translate-y-40 focus:translate-y-0 transition-all duration-300"
			>
				{t('skip_to_main_content')}
			</a>

			{/* ===== Top Navigation ===== */}
			<TopNav />

			{/* ===== Main Navigation ===== */}
			<nav
				className={`${
					scrolled
						? 'bg-white sticky top-0 shadow-md z-50'
						: 'bg-transparent'
				} w-full z-50 h-20 relative`}
			>
				<div className="app-max-width w-full">
					<div
						className={`flex justify-between align-baseline app-x-padding py-6`}
					>
						{/* Hamburger Menu and Mobile Nav */}
						<div className="flex-1 lg:flex-0 lg:hidden">
							<Menu />
						</div>

						{/* Left Nav */}
						<ul className={`flex-0 lg:flex-1 flex`}>
							<li className="mr-12 hidden lg:block whitespace-nowrap hover:text-gray-400">
								<Link href={`/product-category/men`}>
									{t('men')}
								</Link>
							</li>
							<li className="mr-12 hidden lg:block whitespace-nowrap hover:text-gray-400">
								<Link href={`/product-category/women`}>
									{t('women')}
								</Link>
							</li>
							<li className="mr-12 hidden lg:block whitespace-nowrap hover:text-gray-400">
								<Link href="/product-category/bags">
									{t('bags')}
								</Link>
							</li>
							<li className=" hidden lg:block whitespace-nowrap hover:text-gray-400 mr-0">
								<Link href="/coming-soon">{t('blogs')}</Link>
							</li>
						</ul>

						{/* Haru Logo */}
						<div className="flex-1 flex justify-center items-center cursor-pointer">
							<div className="w-32 h-auto">
								<Link href="/">
									<Image
										className="justify-center"
										src="/logo.svg"
										alt="Picture of the author"
										width={220}
										height={50}
										layout="responsive"
									/>
								</Link>
							</div>
						</div>

						{/* Right Nav */}
						<ul className={`flex-1 flex justify-end`}>
							<li className="ml-12 hidden lg:block">
								<SearchForm />
							</li>
							<li className="ml-12 hidden lg:block">
								<AuthForm>
									<UserIcon />
								</AuthForm>
							</li>
							<li className="ml-12">
								<CartItem />
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	)
}

export default Header
