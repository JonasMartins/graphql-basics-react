import React, { useState, useContext } from 'react';
import { Menu, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';
import { AuthContext } from '../context/auth';
import { InvertedTransparent } from '../styles/TooltipStyle';

const pathname = window.location.pathname;

const MenuBar = () => {
	const { user, logout } = useContext(AuthContext);
	const path = pathname === '/' ? 'home' : pathname.substr(1);
	const [activeItem, setActiveItem] = useState(path);
	const handleItemClick = (e, { name }) => setActiveItem(name);

	return (
		<div style={{ marginBottom: '30px' }}>
			{user ? (
				<Menu pointing size='large'>
					<Menu.Item>
						<Avatar name={user.username} size='32' round={true} />
					</Menu.Item>
					<Popup
						content='Home'
						style={InvertedTransparent}
						inverted
						trigger={<Menu.Item name={user.username} active as={Link} to='/' />}
					/>
					<Menu.Menu position='right'>
						<Menu.Item name='logout' onClick={logout} />
					</Menu.Menu>
				</Menu>
			) : (
				<Menu pointing size='large'>
					<Menu.Item
						name='home'
						active={activeItem === 'home'}
						onClick={handleItemClick}
						as={Link}
						to='/'
					/>

					<Menu.Menu position='right'>
						<Menu.Item
							name='login'
							active={activeItem === 'login'}
							onClick={handleItemClick}
							as={Link}
							to='/login'
						/>
						<Menu.Item
							name='register'
							active={activeItem === 'register'}
							onClick={handleItemClick}
							as={Link}
							to='/register'
						/>
					</Menu.Menu>
				</Menu>
			)}
		</div>
	);
};
export default MenuBar;
