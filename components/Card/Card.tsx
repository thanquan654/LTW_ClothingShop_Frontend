import { FC, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import Heart from '../../public/icons/Heart'
import HeartSolid from '../../public/icons/HeartSolid'
import { itemType } from '../../context/cart/cart-types'
import { useCart } from '../../context/cart/CartProvider'
import { useWishlist } from '../../context/wishlist/WishlistProvider'

type Props = {
	item: itemType
}

const Card: FC<Props> = ({ item }) => {
	const t = useTranslations('CartWishlist')
	const { wishlist, addToWishlist, deleteWishlistItem } = useWishlist()
	const { addOne } = useCart()
	const [isHovered, setIsHovered] = useState(false)
	const [isWLHovered, setIsWLHovered] = useState(false)

	const { id, name, price, img1, img2 } = item

	const itemLink = `/products/${encodeURIComponent(id)}`

	const alreadyWishlisted =
		wishlist.filter((wItem) => wItem.id === id).length > 0

	const handleWishlist = () => {
		alreadyWishlisted ? deleteWishlistItem!(item) : addToWishlist!(item)
	}

	return (
		<div className="w-full">
			<div className="relative overflow-hidden mb-1">
				<Link href={itemLink}>
					<a
						tabIndex={-1}
						onMouseOver={() => setIsHovered(true)}
						onMouseLeave={() => setIsHovered(false)}
					>
						{!isHovered && (
							<Image
								src={img1 as string}
								alt={name}
								width={230}
								height={300}
								layout="responsive"
							/>
						)}
						{isHovered && (
							<Image
								className="transition-transform transform hover:scale-110 duration-1000"
								src={img2 as string}
								alt={name}
								width={230}
								height={300}
								layout="responsive"
							/>
						)}
					</a>
				</Link>
				<button
					type="button"
					className="absolute top-2 right-2 p-1 rounded-full"
					aria-label="Wishlist"
					onClick={handleWishlist}
					onMouseOver={() => setIsWLHovered(true)}
					onMouseLeave={() => setIsWLHovered(false)}
				>
					{isWLHovered || alreadyWishlisted ? (
						<HeartSolid />
					) : (
						<Heart />
					)}
				</button>
				<button
					type="button"
					onClick={() => addOne!(item)}
					className="hidden sm:block bg-white text-gray-400 hover:text-gray-100 hover:bg-gray-500 font-medium whitespace-nowrap px-4 py-2 mx-auto absolute bottom-4 md:-bottom-10 right-1/2 transform translate-x-1/2 transition-all duration-500 focus:bottom-8 focus:duration-75"
				>
					{t('add_to_cart')}
				</button>
			</div>

			<div className="content">
				<Link href={itemLink}>
					<a className="text-xs sm:text-base block no-underline text-gray-500 mb-1 truncate">
						{name}
					</a>
				</Link>
				<div className="text-gray400">$ {price}</div>
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
