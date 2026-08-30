import { useState } from 'react';
import type { CartItem } from '../../lib/types/search';

const useBasket = () => {
	const [cartItems, setCartItems] = useState(() => {
		const cartJson = localStorage.getItem('cartData');
		return cartJson ? JSON.parse(cartJson) : [];
	});
	const onAdd = (input: CartItem) => {
		const exist = cartItems.find((item: CartItem) => item._id === input._id);
		if (exist) {
			const cartUpdate = cartItems.map((item: CartItem) => {
				return item._id === input._id
					? { ...exist, quantity: exist.quantity + 1 }
					: item;
			});
			setCartItems(cartUpdate);
			localStorage.setItem('cartData', JSON.stringify(cartUpdate));
		} else {
			const cartUpdate = [...cartItems, { ...input }];
			setCartItems(cartUpdate);
			localStorage.setItem('cartData', JSON.stringify(cartUpdate));
		}
	};
	const onRemove = (input: CartItem) => {
		const exist = cartItems.find((item: CartItem) => item._id === input._id);
		if (exist.quantity === 1) {
			const cartUpdate = cartItems.filter(
				(item: CartItem) => item._id !== input._id,
			);
			setCartItems(cartUpdate);
			localStorage.setItem('cartData', JSON.stringify(cartUpdate));
		} else {
			const cartUpdate = cartItems.map((item: CartItem) =>
				item._id === input._id
					? { ...item, quantity: item.quantity - 1 }
					: item,
			);
			setCartItems(cartUpdate);
			localStorage.setItem('cartData', JSON.stringify(cartUpdate));
		}
	};
	const onDelete = (input: CartItem) => {
		const cartUpdate = cartItems.filter(
			(item: CartItem) => item._id !== input._id,
		);
		setCartItems(cartUpdate);
		localStorage.setItem('cartData', JSON.stringify(cartUpdate));
	};

	const onDeleteAll = () => {
		setCartItems([]);
		localStorage.removeItem('cartData');
	};
	return {
		cartItems,
		onAdd,
		onRemove,
		onDeleteAll,
		onDelete,
	};
};
export default useBasket
