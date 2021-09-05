import React, { useState, useContext } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import './Sidebar.css';
import { UserContext } from '../../context/userContext';
import { Link, NavLink } from 'react-router-dom';
import helpers from '../components/GlobalHelpers';

const Sidebar = ({toggleDrawer, state}) => {

    const { profileData } = useContext(UserContext);

    return (
        <SwipeableDrawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
        >
            <div className="side-menu">
                <ul>
                    <li className="side-menu__title pl-0">
                        {Meteor.user() ?
                        <>
                        <NavLink exact to="/profile" className="nav-link profile-small" activeClassName="circle-active">
                            <img className="nav-avatar" src={profileData?.picture ? helpers.getImgUrlById(profileData?.picture || '') : '/abstract-user-flat-4.svg'} alt="user profile picture" />
                        </NavLink>
                        <NavLink exact to="/profile"
                        onClick={toggleDrawer(false)}
                        className="nav-link profile-small-1"
                        activeClassName="nav-active"
                        >
                        {Meteor.user().username}
                        </NavLink>
                        </>
                        :
                        <NavLink exact to="/profile" className="nav-link profile-small"
                        activeClassName="nav-active"
                        onClick={toggleDrawer(false)}
                        >
                            <span className="text-white">Sign in</span>
                        </NavLink>
                        } 
                    </li>
                    <li className="side-menu__item">
                        <NavLink exact to="/" className="nav-link profile-small"
                        activeClassName="nav-active"
                        onClick={toggleDrawer(false)}
                        >
                        Home
                        </NavLink>
                    </li>
                    <li className="side-menu__item">
                        <NavLink exact to="/create" className="nav-link profile-small"
                        activeClassName="nav-active"
                        onClick={toggleDrawer(false)}
                        >
                        Start a petition
                        </NavLink>
                    </li>
                    <li className="side-menu__item">
                        <NavLink exact to="/about" className="nav-link profile-small"
                        activeClassName="nav-active"
                        onClick={toggleDrawer(false)}
                        >
                        About
                        </NavLink>
                    </li>
                    {Meteor.userId() ? <li className="side-menu__item"><span onClick={()=>{Meteor.logout(); toggleDrawer(false)}}>Log out</span></li> : ""}
                    
                </ul>
            </div>
        </SwipeableDrawer>
    
    )};

export default Sidebar; 