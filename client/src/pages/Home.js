import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { FETCH_POSTS_QUERY } from '../utils/graphql';
import { Grid, Transition } from 'semantic-ui-react';
import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { Icon } from 'semantic-ui-react';
const Home = () => {
	const { user } = useContext(AuthContext);
	const { loading, data } = useQuery(FETCH_POSTS_QUERY, {
		variables: { language: 'english' }
	});
	// const [posts, setPosts] = useState([]);
	// const [theArray, setTheArray] = useState(initialArray);
	// setTheArray(oldArray => [...oldArray, newElement]);
	// Sometimes you can get away without using that callback form, if you only update
	// the array in handlers for certain specific user events like click (but not like mousemove):
	// setTheArray([...theArray, newElement]);
	// useEffect(() => {
	// 	if (!loading) setPosts(data.getPosts);

	// 	return () => {};
	// }, [loading]);

	return (
		<Grid columns={1}>
			<Grid.Row>
				{user && (
					<Grid.Column>
						<PostForm />
					</Grid.Column>
				)}
				{loading ? (
					<div style={{ marginLeft: '50%', marginTop: '10%' }}>
						<Icon loading name='spinner' size='huge' />
					</div>
				) : (
					<Transition.Group>
						{data.getPosts &&
							data.getPosts.map(post => (
								<Grid.Column key={post.id} style={{ marginBottom: 20 }}>
									<PostCard post={post} />
								</Grid.Column>
							))}
					</Transition.Group>
				)}
			</Grid.Row>
		</Grid>
	);
};
export default Home;
