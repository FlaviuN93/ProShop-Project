import { ADD_ITEM_TO_CART, REMOVE_ITEM } from './cart.types';
import { addItemToCart } from './cart.utils';

const INITIAL_STATE = {
	cartItems: [],
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

		default:
			return state;
	}
};
