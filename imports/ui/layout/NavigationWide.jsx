import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './NavigationWide.css'
import helpers from '../components/GlobalHelpers';
import { UserContext } from '../../context/userContext';


const NavigationWide = () => {

    const { profileData } = useContext(UserContext);

    return ( 
        <div className="navigation-wide">
        <NavLink exact to="/" activeClassName="nav-active" className="nav-link">Home</NavLink>
        <NavLink exact to="/create"
        activeClassName="nav-active" className="nav-link">Start a petition</NavLink>
        <NavLink exact to="/create"
        activeClassName="nav-active" className="nav-link">About</NavLink>
        <NavLink exact to="/create"
        activeClassName="nav-active" className="nav-link">Sign up</NavLink>
        <NavLink exact to="/profile" className="nav-link" activeClassName="circle-active">
            <img className="nav-avatar" src={profileData?.picture ? helpers.getImgUrlById(profileData?.picture || '') : '/abstract-user-flat-4.svg'} alt="user profile picture" />
        </NavLink>
        </div>
     );
}
 
export default NavigationWide;