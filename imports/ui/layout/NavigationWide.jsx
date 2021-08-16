import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './NavigationWide.css'
import helpers from '../components/GlobalHelpers';
import { UserContext } from '../../context/userContext';


const NavigationWide = () => {

    const { profileData } = useContext(UserContext);

    return ( 
        <div className="navigation-wide">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/create" className="nav-link">Start a petition</Link>
        <Link to="/create" className="nav-link">About</Link>
        <Link to="/create" className="nav-link">Sign up</Link>
        <NavLink to="/profile" className="nav-link" activeClassName="circle-active">
            <img className="nav-avatar" src={profileData?.picture ? helpers.getImgUrlById(profileData?.picture || '') : '/abstract-user-flat-4.svg'} alt="user profile picture" />
        </NavLink>
        </div>
     );
}
 
export default NavigationWide;