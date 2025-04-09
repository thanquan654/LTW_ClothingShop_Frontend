import Link from 'next/link'
import { useTranslations } from 'next-intl'

import FacebookLogo from '../../public/icons/FacebookLogo'
import InstagramLogo from '../../public/icons/InstagramLogo'
import Button from '../Buttons/Button'
import Input from '../Input/Input'

export default function Footer() {
	const t = useTranslations('Navigation')

	return (
		<>
			<div className="border-t-2 border-gray-100 py-16">
				<div
					className={`app-max-width app-x-padding flex flex-col md:flex-row justify-between`}
				>
					<div className="mb-6 md:mb-0">
						<h3 className="text-gray-400 text-lg mb-1 md:mb-3">
							{t('company')}
						</h3>
						<div className="flex flex-col">
							<a
								className="hover:text-gray-400 hover:underline py-2"
								href="example"
							>
								{t('about_us')}
							</a>
							<a
								className="hover:text-gray-400 hover:underline py-2"
								href="example"
							>
								{t('contact_us')}
							</a>
							<a
								className="hover:text-gray-400 hover:underline py-2"
								href="example"
							>
								{t('store_location')}
							</a>
							<a
								className="hover:text-gray-400 hover:underline py-2"
								href="example"
							>
								{t('careers')}
							</a>
						</div>
					</div>
					<div className="mb-6 md:mb-0">
						<h3 className="text-gray-400 text-lg mb-1 md:mb-3">
							{t('help')}
						</h3>
						<div className="flex flex-col">
							<a
								className="hover:text-gray-400 hover:underline py-2"
								href="example"
							>
								{t('order_tracking')}
							</a>
							<a
								className="hover:text-gray-400 hover:underline py-2"
								href="example"
							>
								{t('faqs')}
							</a>
							<a
								className="hover:text-gray-400 hover:underline py-2"
								href="example"
							>
								{t('privacy_policy')}
							</a>
							<a
								className="hover:text-gray-400 hover:underline py-2"
								href="example"
							>
								{t('terms_conditions')}
							</a>
						</div>
					</div>
					<div className="mb-6 md:mb-0">
						<h3 className="text-gray-400 text-lg mb-1 md:mb-3">
							{t('store')}
						</h3>
						<div className="flex flex-col">
							<Link
								href={`/product-category/women`}
								className="hover:text-gray-400 hover:underline py-2"
							>
								{t('women')}
							</Link>
							<Link
								href={`/product-category/men`}
								className="hover:text-gray-400 hover:underline py-2"
							>
								{t('men')}
							</Link>
							<Link
								href={`/product-category/bags`}
								className="hover:text-gray-400 hover:underline py-2"
							>
								{t('bags')}
							</Link>
						</div>
					</div>
					<div className="mb-6 md:mb-0">
						<h3 className="text-gray-400 text-lg mb-1 md:mb-3">
							{t('keep_in_touch')}
						</h3>
						<div className="flex flex-col">
							<span className="py-2">
								{t('address.detail')}
								<br />
								{t('address.road')}
								<br />
								{t('address.city')}
							</span>
							<span className="py-2">{t('phone_number')}</span>
							<span className="py-2">
								{t('open_all_days')} <br />-{' '}
								{t('opening_hours')}
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col items-center pb-16">
				<h4 className="text-3xl mb-4">{t('newsletter')}</h4>
				<span className="px-6 text-center">{t('newsletter_desc')}</span>
				<div className="mt-5 px-6 flex w-full sm:w-auto flex-col sm:flex-row">
					<Input
						label="Newsletter Input Box"
						name="email"
						type="email"
						extraClass=" w-full sm:w-auto"
					/>{' '}
					<Button
						size="lg"
						value={t('send')}
						extraClass="ml-0 mt-4 sm:mt-0 tracking-widest sm:tracking-normal sm:mt-0 sm:ml-4 w-auto w-full sm:w-auto"
					/>
				</div>
			</div>
			<div className="border-2 py-1 text-xs border-gray-200 text-gray-400">
				<div className="app-max-width app-x-padding w-full flex justify-between">
					<span className="">
						@2022 Haru. {t('all_rights_reserved')}
					</span>
					<span className="flex items-center">
						<span className="hidden sm:block">
							{t('follow_us_on_social_media')}:
						</span>{' '}
						<a
							href="www.facebook.com"
							aria-label="Facebook Page for Haru Fashion"
						>
							<FacebookLogo />
						</a>
						<a
							href="www.ig.com"
							aria-label="Instagram Account for Haru Fashion"
						>
							<InstagramLogo />
						</a>
					</span>
				</div>
			</div>
		</>
	)
}
