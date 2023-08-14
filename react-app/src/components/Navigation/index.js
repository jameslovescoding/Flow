import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import iconSrc from './favicon.png';

import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (<>
		<div className='nav-bar'>
			<NavLink className="home-icon-assembly" to="/">
				<img className="home-icon" src={iconSrc} alt="nav bar icon" />
				Flow
			</NavLink>
			<div className='right-section'>
				{isLoaded && (
					<>
						{sessionUser &&
							<NavLink className="create-new-song hover-shadow" to="/song/new"><i className="fa-solid fa-music fa-"></i> Upload</NavLink>
						}
						<ProfileButton user={sessionUser} />
					</>
				)}
			</div>
		</div>
	</>)
}

export default Navigation;