import React, { useContext } from 'react';
import Avatar from 'react-avatar';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Card, Button } from 'semantic-ui-react';
import moment from 'moment';
import DeleteButton from './DeleteButton';
import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';

const Post = props => {
	const postId = props.match.params.postId;
	const { user } = useContext(AuthContext);
	const { loading, data } = useQuery(FETCH_POST_QUERY, {
		variables: {
			postId
		}
	});

	let postMarkup = <></>;
	if (loading) {
		postMarkup = <p>Loading... </p>;
	} else {
		const {
			id,
			body,
			createdAt,
			username,
			comments,
			likes,
			likeCount,
			commentCount
		} = data.getPost;
		console.log(comments);

		postMarkup = (
			<Grid columns={2}>
				<Grid.Row>
					<Grid.Column width={3}>
						<Avatar name={username} round={true} />
					</Grid.Column>
					<Grid.Column width={13}>
						<Card fluid>
							<Card.Content>
								<Card.Header>{username}</Card.Header>
								<Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
								<Card.Description>{body}</Card.Description>
							</Card.Content>
							<Card.Content extra>
								<LikeButton user={user} post={{ id, likes, likeCount }} />
								<Button
									content='Comments'
									icon='comments'
									color='grey'
									label={{ as: 'a', basic: true, content: commentCount }}
									labelPosition='right'
								/>
								{user && user.username === username && (
									<DeleteButton
										postId={id}
										callback={() => {
											props.history.push('/');
										}}
									/>
								)}
							</Card.Content>
						</Card>
						{comments.map(comment => (
							<Card fluid key={comment.id}>
								<Card.Content>
									<Avatar
										name={username}
										size='40'
										style={{ float: 'right' }}
										round={true}
									/>
									<Card.Header>{comment.username}</Card.Header>
									<Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
									<Card.Description>{comment.body}</Card.Description>
								</Card.Content>
							</Card>
						))}
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
	return postMarkup;
};

const FETCH_POST_QUERY = gql`
	query($postId: ID!) {
		getPost(postId: $postId) {
			id
			body
			createdAt
			username
			likeCount
			likes {
				username
			}
			commentCount
			comments {
				id
				username
				createdAt
				body
			}
		}
	}
`;

export default Post;
