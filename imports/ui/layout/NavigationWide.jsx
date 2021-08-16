import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
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
        <Link to="/profile" className="nav-link">
            <img className="nav-avatar" src={helpers.getImgUrlById(profileData?.picture || '')} alt="" />
        </Link>
        </div>
     );
}
 
export default NavigationWide;