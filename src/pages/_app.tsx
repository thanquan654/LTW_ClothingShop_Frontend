/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextComponentType, NextPageContext } from 'next'
import NProgress from 'nprogress'
import Router, { useRouter } from 'next/router'
import { NextIntlClientProvider } from 'next-intl'

import '../styles/globals.css'
import 'animate.css'
import 'nprogress/nprogress.css'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

type AppCustomProps = {
	Component: NextComponentType<NextPageContext, any, object>
	pageProps: any
}

export default function App({ Component, pageProps }: AppCustomProps) {
	const router = useRouter()

	return (
		<NextIntlClientProvider
			locale={router.locale}
			timeZone="Asia/Ho_Chi_Minh"
			messages={pageProps?.messages}
		>
			<Component {...pageProps} />
		</NextIntlClientProvider>
	)
}
