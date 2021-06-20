import React, { useState } from 'react';
import MatchMediaWrapper from '../components/MatchMediaWrapper.jsx';
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


    const mobileContent = (<div>This is what you see on mobile!</div>);
    const desktopContent = (<div>This is what you see on desktop!</div>);

    return (

        <header className="main-header">
            <div className="main-header__logo">
                <img src="/logo.svg" alt="petitions logo" />
                <span className="logo-title">petitions</span>
            </div>
            

            <MatchMediaWrapper
                mobileContent={
                    <>
                        <div className="main-header__title">title</div>
                        <HamburgerButton
                            toggleDrawer={toggleDrawer}
                            state={sidebarState}
                        />
                        <Sidebar
                            toggleDrawer={toggleDrawer}
                            state={sidebarState}
                        />
                    </>
                }
                desktopContent={
                    <>
                    <span>Home</span>
                    <span>Browse</span>
                    <span>Start a petition</span>
                    <span>About</span>
                    <span>Sign up</span>
                    <span>o</span>
                    </>
                }
            />
        </header>
    );
}

export default Header;