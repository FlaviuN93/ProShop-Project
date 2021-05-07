import axios from 'axios';
import { ADD_ITEM_TO_CART, REMOVE_ITEM } from './cart.types';

export const addToCart = (id, qty) => async (dispatch, getState) => {
	const { data } = await axios.get(`/api/products/${id}`);
	dispatch({
		type: ADD_ITEM_TO_CART,
		payload: {
			id: data._id,
			name: data.name,
			image: data.image,
			price: data.price,
			countInStock: data.countInStock,
			qty,
		},
	});

	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => async (dispatch, getState) => {
	dispatch({ type: REMOVE_ITEM, payload: id });
	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
