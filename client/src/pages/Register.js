import React, { useState, useContext } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { AuthContext } from '../context/auth';
import { useForm } from '../utils/Hooks';
const Register = props => {
	const context = useContext(AuthContext);
	const [errors, setErrors] = useState({});
	const { handleInput, onSubmit, values } = useForm(registerUser, {
		username: '',
		password: '',
		confirmPassword: '',
		email: ''
	});

	const [addUser, { loading }] = useMutation(REGISTER_USER, {
		update(_, result) {
			context.login(result.data.login);
			props.history.push('/');
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables: values
	});

	// function key word alweys runs first
	function registerUser() {
		addUser();
	}

	// const onSubmit = e => {
	// 	e.preventDefault();
	// 	addUser({ variables: values });
	// };

	return (
		<div>
			<Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
				<h1>Register</h1>
				<Form.Input
					label='Username'
					name='username'
					value={values.username}
					error={errors.username ? true : false}
					onChange={handleInput}
				/>
				<Form.Input
					label='Email'
					name='email'
					value={values.email}
					error={errors.email ? true : false}
					onChange={handleInput}
				/>
				<Form.Input
					label='Password'
					name='password'
					type='password'
					value={values.password}
					error={errors.password ? true : false}
					onChange={handleInput}
				/>
				<Form.Input
					label='Confirm Password'
					name='confirmPassword'
					type='password'
					value={values.confirmPassword}
					error={errors.confirmPassword ? true : false}
					onChange={handleInput}
				/>
				<Button type='submit' primary content='Register' />
			</Form>
			{Object.keys(errors).length > 0 && (
				<div className='ui error message'>
					<ul className='list'>
						{Object.values(errors).map((error, index) => (
							<li key={index}>{error}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

const REGISTER_USER = gql`
	mutation register(
		$username: String!
		$email: String!
		$password: String!
		$confirmPassword: String!
	) {
		register(
			registerInput: {
				username: $username
				email: $email
				password: $password
				confirmPassword: $confirmPassword
			}
		) {
			id
			username
			email
			createdAt
			token
		}
	}
`;

export default Register;
