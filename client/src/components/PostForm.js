import React from 'react';
import { Card, Form, Button } from 'semantic-ui-react';
import { FETCH_POSTS_QUERY } from '../utils/graphql';
import gql from 'graphql-tag';
import { useForm } from '../utils/Hooks';
import { useMutation } from '@apollo/react-hooks';
const PostForm = () => {
	const { values, handleInput, onSubmit } = useForm(createPostCallback, {
		body: ''
	});

	const [createPost, { error }] = useMutation(CREATE_POST_MUTATTION, {
		update(cache, result) {
			const data = cache.readQuery({
				query: FETCH_POSTS_QUERY
			});
			// increment our posts array
			data.getPosts = [result.data.createPost, ...data.getPosts];
			cache.writeQuery({ query: FETCH_POSTS_QUERY, data });
			values.body = '';
		},
		variables: values
	});

	function createPostCallback() {
		createPost();
	}

	return (
		<Card fluid raised style={{ padding: '5px', marginBottom: '30px' }}>
			<Card.Content>
				<Form onSubmit={onSubmit}>
					<h2>Create a Post:</h2>
					<Form.Field>
						<Form.Input
							placeholder='Share something'
							name='body'
							onChange={handleInput}
							value={values.body}
							size='big'
							error={error ? true : false}
						/>
						<Button type='submit' content='Share' />
					</Form.Field>
				</Form>
				{error && (
					<div className='ui error message' style={{ marginBottom: '20px' }}>
						<ul>
							<li>{error.graphQLErrors[0].message}</li>
						</ul>
					</div>
				)}
			</Card.Content>
		</Card>
	);
};

const CREATE_POST_MUTATTION = gql`
	mutation createPost($body: String!) {
		createPost(body: $body) {
			id
			body
			createdAt
			username
			likes {
				id
				username
				createdAt
			}
			likeCount
			comments {
				body
				username
				createdAt
			}
			commentCount
		}
	}
`;

export default PostForm;
