import React, { useEffect, useState } from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { InvertedTransparent } from '../styles/TooltipStyle';

import { Button, Popup } from 'semantic-ui-react';

const LikeButton = ({ user, post: { id, likeCount, likes } }) => {
	const [liked, setLiked] = useState(false);
	useEffect(() => {
		if (user && likes.find(like => like.username === user.username)) {
			setLiked(true);
		}
	}, [user, likes]);

	const messagePopup = user
		? liked
			? 'Unlike this post'
			: 'Like this Post'
		: 'You must log in to like this post';
	const [likePost] = useMutation(LIKE_POST_MUTATION, {
		variables: { postId: id }
	});

	return (
		<Popup
			content={messagePopup}
			style={InvertedTransparent}
			inverted
			trigger={
				liked ? (
					<Button
						content='Like'
						color='vk'
						icon='thumbs up'
						label={{ as: 'a', basic: true, content: likeCount }}
						labelPosition='right'
						onClick={likePost}
					/>
				) : (
					<Button
						as={Link}
						to='/login'
						content='Like'
						icon='thumbs up'
						label={likeCount}
						labelPosition='right'
					/>
				)
			}
		/>
	);
};

const LIKE_POST_MUTATION = gql`
	mutation likePost($postId: ID!) {
		likePost(postId: $postId) {
			id
			likes {
				id
				username
			}
			likeCount
		}
	}
`;

export default LikeButton;
