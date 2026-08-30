import { createContext, type ReactNode } from 'react';
import type { CartItem } from '../../lib/types/search';
import useBasket from '../hooks/useBasket';

interface CartContextValue {
	cartItems: CartItem[];
	onAdd: (item: CartItem) => void;
	onRemove: (item: CartItem) => void;
	onDeleteAll: () => void;
	onDelete: (input: CartItem) => void;
}

export const CartContext = createContext<CartContextValue | undefined>(
	undefined,
);

export function CartProvider({ children }: { children: ReactNode }) {
	const basket = useBasket();

	return <CartContext.Provider value={basket}>{children}</CartContext.Provider>;
}
