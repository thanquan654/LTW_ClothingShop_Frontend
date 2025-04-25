import { itemType } from '../cart/cart-types'

const addItemToCart = (
	cartItems: itemType[],
	item: itemType,
	add_one = false,
) => {
	const duplicate = cartItems.some(
		(cartItem) =>
			cartItem.id === item.id &&
			cartItem.colorCode === item.colorCode && // So sánh mã màu
			cartItem.sizeCode === item.sizeCode, // So sánh mã size
	)

	if (duplicate) {
		return cartItems.map((cartItem) => {
			if (
				cartItem.id === item.id &&
				cartItem.colorCode === item.colorCode &&
				cartItem.sizeCode === item.sizeCode
			) {
				let itemQty = 0
				!item.qty || add_one
					? (itemQty = cartItem.qty! + 1)
					: (itemQty = item.qty)

				return { ...cartItem, qty: itemQty }
			}
			return cartItem
		})
	}

	let itemQty = 0
	!item.qty ? itemQty++ : (itemQty = item.qty)
	return [
		...cartItems,
		{
			id: item.id,
			name: item.name,
			price: item.price,
			img1: item.img1,
			img2: item.img2,
			qty: itemQty,
			color: item.color,
			size: item.size,
			colorCode: item.colorCode, // Lưu mã màu
			sizeCode: item.sizeCode, // Lưu mã size
		},
	]
}

export default addItemToCart
