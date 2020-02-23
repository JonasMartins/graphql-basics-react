import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
	const [values, setValues] = useState(initialState);

	const handleInput = e => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const onSubmit = e => {
		e.preventDefault();
		callback();
	};
	return {
		handleInput,
		onSubmit,
		values
	};
};
