import {
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
} from './user.types';

const INITIAL_STATE = {
	loading: false,
	userInfo: {},
	error: undefined,
};

export const userLoginReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { ...state, loading: true };
		case USER_LOGIN_SUCCESS:
			return {
				...state,
				loading: false,
				userInfo: action.payload,
			};
		case USER_LOGIN_FAIL:
			return { ...state, loading: false, error: action.payload };
		case USER_LOGOUT:
			return {};
		default:
			return state;
	}
};

export const userRegisterReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
			return { ...state, loading: true };
		case USER_REGISTER_SUCCESS:
			return {
				...state,
				loading: false,
				userInfo: action.payload,
			};
		case USER_REGISTER_FAIL:
			return { ...state, loading: false, error: action.payload };

		default:
			return state;
	}
};
