import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Button, Confirm, Popup } from 'semantic-ui-react';
import { InvertedTransparent } from '../styles/TooltipStyle';

import { FETCH_POSTS_QUERY } from '../utils/graphql';

const DeleteButton = ({ postId, callback }) => {
	const [confirmOpen, setConfirmOpen] = useState(false);

	const [deletePost] = useMutation(DELETE_POST_MUTATION, {
		update(proxy) {
			setConfirmOpen(false);
			const data = proxy.readQuery({
				query: FETCH_POSTS_QUERY
			});
			data.getPosts = data.getPosts.filter(p => p.id !== postId);
			proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
			if (callback) callback();
		},
		variables: {
			postId
		}
	});
	return (
		<>
			<Popup
				content='Delete Post'
				style={InvertedTransparent}
				inverted
				trigger={
					<Button
						circular
						color='pink'
						size='big'
						icon='trash'
						floated='right'
						onClick={() => setConfirmOpen(true)}
					/>
				}
			/>
			<Confirm
				open={confirmOpen}
				onCancel={() => setConfirmOpen(false)}
				onConfirm={deletePost}
			/>
		</>
	);
};

const DELETE_POST_MUTATION = gql`
	mutation deletePost($postId: ID!) {
		deletePost(postId: $postId)
	}
`;

export default DeleteButton;
