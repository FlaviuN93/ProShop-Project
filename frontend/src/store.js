import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	productDetailsReducer,
	productListReducer,
} from './reducers/products/products.reducer';
import { cartReducer } from './reducers/cart/cart.reducer';

const reducer = combineReducers({
	productList: productListReducer,
	productDetail: productDetailsReducer,
	cart: cartReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];

const initialState = {
	cart: { cartItems: cartItemsFromStorage },
};
const middleWare = [thunk];
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
