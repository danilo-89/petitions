import React, { useState } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import './Sidebar.css'

const Sidebar = ({toggleDrawer, state}) => {


    return (
        <SwipeableDrawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
        >
            <div className="side-menu">
                <ul>
                    <li className="side-menu__item"><a href="">Home</a></li>
                    <li className="side-menu__item"><a href="">Browse</a></li>
                    <li className="side-menu__item"><a href="">Start a petition</a></li>
                    <li className="side-menu__item"><a href="">About</a></li>
                    <li className="side-menu__item"><a href="">Sign up</a></li>
                    <li className="side-menu__item"><a href="">John Doe</a></li>
                    <li className="side-menu__item"><a href="">Petitions</a></li>
                    <li className="side-menu__item"><a href="">Log out</a></li>
                </ul>
            </div>
        </SwipeableDrawer>
    
    )};

export default Sidebar; 