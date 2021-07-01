import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationWide.css'

const NavigationWide = () => {
    return ( 
        <>
        <Link to="/create" className="nav-link">Home</Link>
        <Link to="/create" className="nav-link active">Browse</Link>
        <Link to="/create" className="nav-link">Start a petition</Link>
        <Link to="/create" className="nav-link">About</Link>
        <Link to="/create" className="nav-link">Sign up</Link>
        <Link to="/create">o</Link>
        </>
     );
}
 
export default NavigationWide;