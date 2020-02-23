import React, { useContext, useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { AuthContext } from '../context/auth';
import { useForm } from '../utils/Hooks';
import gql from 'graphql-tag';

const Login = props => {
	const context = useContext(AuthContext);
	const [errors, setErrors] = useState({});
	const { handleInput, onSubmit, values } = useForm(loginUserCallback, {
		username: '',
		password: ''
	});

	const [loginUser, { loading }] = useMutation(LOGIN_USER, {
		update(_, result) {
			context.login(result.data.login);
			props.history.push('/');
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables: values
	});

	function loginUserCallback() {
		loginUser();
	}

	return (
		<div>
			<Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
				<h1>Login</h1>
				<Form.Input
					label='Username'
					name='username'
					value={values.username}
					error={errors.username ? true : false}
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
				<Button type='submit' primary content='Login' />
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

const LOGIN_USER = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			id
			username
			email
			createdAt
			token
		}
	}
`;

export default Login;
