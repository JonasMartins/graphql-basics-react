import React, { useContext } from 'react';
import Avatar from 'react-avatar';
import { Card, Button } from 'semantic-ui-react';
import moment from 'moment';
import DeleteButton from './DeleteButton';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton';
import { AuthContext } from '../context/auth';
const PostCard = ({
	post: { id, body, username, likes, createdAt, likeCount, commentCount }
}) => {
	const { user } = useContext(AuthContext);

	const handleComment = e => {
		console.log('comment ', e);
	};

	return (
		<Card fluid raised style={{ padding: '10px', marginBottom: '10px' }}>
			<Card.Content>
				<Avatar
					name={username}
					size='46'
					style={{ float: 'right' }}
					round={true}
				/>
				<Card.Header>{username}</Card.Header>
				<Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
				<Card.Description as={Link} to={`/posts/${id}`}>
					{body}
				</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<LikeButton user={user} post={{ id, likes, likeCount }} />

				<Button
					content='Comments'
					icon='comments'
					label={{ as: 'a', basic: true, content: commentCount }}
					labelPosition='right'
					onClick={handleComment}
				/>

				{user && user.username === username && <DeleteButton postId={id} />}
			</Card.Content>
		</Card>
	);
};

export default PostCard;
