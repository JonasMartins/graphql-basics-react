import React, { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

const intialState = {
	user: null
};

if (localStorage.getItem('token')) {
	const decode = jwtDecode(localStorage.getItem('token'));
	if (decode.exp * 1000 < Date.now()) {
		localStorage.removeItem('token');
	} else {
		intialState.user = decode;
	}
}

const AuthContext = createContext({
	user: null,
	login: data => {},
	logout: () => {}
});

const authReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				user: action.payload
			};
		case 'LOGOUT':
			return {
				...state,
				user: null
			};
		default:
			return state;
	}
};

const AuthProvider = props => {
	const [state, dispatch] = useReducer(authReducer, intialState);
	const login = data => {
		localStorage.setItem('token', data.token);
		dispatch({
			type: 'LOGIN',
			payload: data
		});
	};
	const logout = () => {
		localStorage.removeItem('token');
		dispatch({ type: 'LOGOUT' });
	};
	return (
		<AuthContext.Provider
			value={{ user: state.user, login, logout }}
			{...props}
		/>
	);
};

export { AuthContext, AuthProvider };
