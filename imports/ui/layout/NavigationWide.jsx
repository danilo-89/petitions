import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationWide.css'

const NavigationWide = () => {
    return ( 
        <div className="navigation-wide">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/create" className="nav-link active">Browse</Link>
        <Link to="/create" className="nav-link">Start a petition</Link>
        <Link to="/create" className="nav-link">About</Link>
        <Link to="/create" className="nav-link">Sign up</Link>
        <Link to="/create" className="nav-link">o</Link>
        </div>
     );
}
 
export default NavigationWide;