import { createSelector } from 'reselect';

export const selectCart = (state) => state.cart;

export const shippingAddressFromCart = createSelector(
	[selectCart],
	(cart) => cart.shippingAddress
);

export const cartItemsFromCart = createSelector(
	[selectCart],
	(cart) => cart.cartItems
);
