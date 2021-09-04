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
                        {Meteor.user().username}
                        </>
                        :
                        <span className="pl-3">Sign up</span>
                        } 
                    </li>
                    <li className="side-menu__item"><a href="">Home</a></li>
                    <li className="side-menu__item"><a href="">Start a petition</a></li>
                    <li className="side-menu__item"><a href="">About</a></li>
                    <li className="side-menu__item"><a href="">Log out</a></li>
                    
                </ul>
            </div>
        </SwipeableDrawer>
    
    )};

export default Sidebar; 