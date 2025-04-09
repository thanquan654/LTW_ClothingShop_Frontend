import { Menu } from '@headlessui/react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import Link from 'next/link'

import InstagramLogo from '../../public/icons/InstagramLogo'
import FacebookLogo from '../../public/icons/FacebookLogo'
import DownArrow from '../../public/icons/DownArrow'

type LinkProps = {
	href: string
	locale: 'en' | 'vi'
	active: boolean
	children: React.ReactNode
}

const MyLink: React.FC<LinkProps> = ({
	href,
	locale,
	children,
	active,
	...rest
}) => {
	return (
		<Link
			href={href}
			locale={locale}
			className={`py-2 px-4 text-center ${
				active ? 'bg-gray-200 text-gray-500' : 'bg-white text-gray-500'
			}`}
			{...rest}
		>
			{children}
		</Link>
	)
}

const TopNav = () => {
	const router = useRouter()
	const { asPath, locale } = router
	const t = useTranslations('Navigation')

	return (
		<div className="bg-gray-500 text-gray-100 hidden lg:block">
			<div className="flex justify-between app-max-width">
				<ul className={`flex ml-8`}>
					<li className="text-xs my-2 mr-4 hover:text-gray-300">
						<a href="#" aria-label="Haru Fashion Facebook Page">
							<FacebookLogo />
						</a>
					</li>
					<li className="text-xs my-2 mr-4 hover:text-gray-300">
						<a href="#" aria-label="Haru Fashion Instagram Account">
							<InstagramLogo />
						</a>
					</li>
					<li className="text-xs my-2 mr-4 hover:text-gray-300">
						<a href="#">{t('about_us')}</a>
					</li>
					<li className="text-xs my-2 mr-4 hover:text-gray-300">
						<a href="#">{t('our_policy')}</a>
					</li>
				</ul>
				<ul className={`flex`}>
					<li className="text-xs my-2 ml-4 hover:text-gray-300">
						<Menu as="div" className="relative">
							<Menu.Button as="a" href="#" className="flex">
								{locale === 'en' ? t('eng') : t('vi')}{' '}
								<DownArrow />
							</Menu.Button>
							<Menu.Items
								className="flex flex-col w-20 right-0 absolute p-1 border border-gray-200 bg-white mt-2 outline-none"
								style={{ zIndex: 9999 }}
							>
								<Menu.Item>
									{({ active }) => (
										<MyLink
											active={active}
											href={asPath}
											locale="en"
										>
											{t('eng')}
										</MyLink>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<MyLink
											active={active}
											href={asPath}
											locale="vi"
										>
											{t('vi')}
										</MyLink>
									)}
								</Menu.Item>
							</Menu.Items>
						</Menu>
					</li>
					<li className="text-xs my-2 ml-4 hover:text-gray-300">
						<Menu as="div" className="relative">
							<Menu.Button as="a" href="#" className="flex">
								{t('usd')} <DownArrow />
							</Menu.Button>
							<Menu.Items
								className="flex flex-col w-20 right-0 absolute p-1 border border-gray-200 bg-white mt-2 outline-none"
								style={{ zIndex: 9999 }}
							>
								<Menu.Item>
									{({ active }) => (
										<a
											href="#"
											className={`${
												active
													? 'bg-gray-100 text-gray-500'
													: 'bg-white text-gray-500'
											} py-2 px-4 text-center focus:outline-none`}
										>
											{t('usd')}
										</a>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<a
											href="#"
											className={`${
												active
													? 'bg-gray-100 text-gray-500'
													: 'bg-white text-gray-500'
											} py-2 px-4 text-center focus:outline-none`}
										>
											{t('vnd')}
										</a>
									)}
								</Menu.Item>
							</Menu.Items>
						</Menu>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default TopNav
