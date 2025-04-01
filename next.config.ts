import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	i18n: {
		locales: ['vi', 'en'],
		defaultLocale: 'vi',
	},
	reactStrictMode: true,
}

export default nextConfig
