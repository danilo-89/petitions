import React, { useState } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';


const Sidebar = ({toggleDrawer, state}) => {


    return (
        <SwipeableDrawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
        >
            <div style={{ width: "300px" }}>
                <ul>
                    <li><a href="">Home</a></li>
                    <li><a href="">Sign in</a></li>
                    <li><a href="">Profile</a></li>
                    <li><a href="">New Petition</a></li>
                    <li><a href="">About</a></li>
                </ul>
            </div>
        </SwipeableDrawer>
    
    )};

export default Sidebar; 