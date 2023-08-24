import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import iconSrc from './favicon.png';
import UploadNewSongModalButton from './UploadNewSongModalButton';
import SongCreateModal from '../SongCreateModal';

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
						{sessionUser && (<>
							<UploadNewSongModalButton
								modalComponent={<SongCreateModal
									initialValues={{
										title: "",
										artist: "",
										album: "",
									}} />}
								buttonText={<><i className="fa-solid fa-music fa-"></i> Upload</>}
							/>
						</>)}
						<ProfileButton user={sessionUser} />
					</>
				)}
			</div>
		</div>
	</>)
}

export default Navigation;