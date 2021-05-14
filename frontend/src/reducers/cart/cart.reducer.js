import {
	ADD_ITEM_TO_CART,
	CART_SAVE_PAYMENT_METHOD,
	CART_SAVE_SHIPPING_ADDRESS,
	REMOVE_ITEM,
} from './cart.types';
import { addItemToCart } from './cart.utils';

const INITIAL_STATE = {
	cartItems: [],
	shippingAddress: {},
	paymentMethod: '',
};

export const cartReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADD_ITEM_TO_CART:
			return {
				...state,
				cartItems: addItemToCart(state.cartItems, action.payload),
			};
		case REMOVE_ITEM:
			return {
				...state,
				cartItems: state.cartItems.filter(
					(cartItem) => cartItem.id !== action.payload
				),
			};
		case CART_SAVE_SHIPPING_ADDRESS:
			return {
				...state,
				shippingAddress: action.payload,
			};
		case CART_SAVE_PAYMENT_METHOD:
			return {
				...state,
				paymentMethod: action.payload,
			};
		default:
			return state;
	}
};
