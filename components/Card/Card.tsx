import { FC, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { itemType } from '../../context/cart/cart-types'
import { useCart } from '../../context/cart/CartProvider'

type Props = {
	item: itemType
}

const Card: FC<Props> = ({ item }) => {
	const t = useTranslations('CartWishlist')
	const { addOne } = useCart()
	const [isHovered, setIsHovered] = useState(false)

	const { id, name, price, img1, img2 } = item

	const itemLink = `/products/${encodeURIComponent(id)}`

	return (
		<div className="w-full">
			<div className="relative overflow-hidden mb-1 group w-56 h-72">
				<Link
					href={itemLink}
					tabIndex={-1}
					onMouseOver={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					{!isHovered && (
						<img
							src={`https://localhost:7275/uploads/${img1?.toLocaleLowerCase()}`}
							alt={name}
							width={230}
							height={300}
						/>
					)}
					{isHovered && (
						<img
							className="transition-transform transform hover:scale-110 duration-1000"
							src={`https://localhost:7275/uploads/${img1?.toLocaleLowerCase()}`}
							alt={name}
							width={230}
							height={300}
						/>
					)}
				</Link>
				<button
					type="button"
					onClick={() => addOne!(item)}
					className="hidden sm:block bg-white text-gray-400 hover:text-gray-100 hover:bg-gray-500 font-medium whitespace-nowrap px-4 py-2 mx-auto absolute bottom-4 md:-bottom-10 right-1/2 transform translate-x-1/2 transition-all duration-500 focus:bottom-8 focus:duration-75 group-hover:md:bottom-8"
				>
					{t('add_to_cart')}
				</button>
			</div>

			<div className="content">
				<Link
					href={itemLink}
					className="text-xs sm:text-base block no-underline text-gray-500 mb-1 truncate"
				>
					{name}
				</Link>
				<div className="text-gray-400">{price} VNĐ</div>
				<button
					type="button"
					onClick={() => addOne!(item)}
					className="uppercase font-bold text-sm sm:hidden"
				>
					{t('add_to_cart')}
				</button>
			</div>
		</div>
	)
}

export default Card
