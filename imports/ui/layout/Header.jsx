import React, { useState } from 'react';
import Sidebar from './Sidebar.jsx';
import HamburgerButton from './HamburgerButton.jsx';
import { Button } from '@material-ui/core';
import './Header.css';

const Header = () => {

    const [sidebarState, setSidebarState] = useState({
        right: false
    });

    const toggleDrawer = (open) => (event) => {
        console.log(open)
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setSidebarState({ 'right': open });
    };


    return (

        <header className="main-header">
            <div className="main-header__logo">logo</div>
            <div className="main-header__title">title</div>
            <HamburgerButton 
                toggleDrawer={toggleDrawer}
                state={sidebarState}
            />
            <Sidebar
                toggleDrawer={toggleDrawer}
                state={sidebarState}
            />
        </header>
    );
}

export default Header;