import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	i18n: {
		locales: ['en', 'vi'],
		defaultLocale: 'en',
	},
	reactStrictMode: true,
	images: {
		domains: ['res.cloudinary.com', 'localhost'],
	},
}

export default nextConfig
