import React, { useState, useEffect } from 'react';
import MatchMediaWrapper from '../components/MatchMediaWrapper.jsx';
import Sidebar from './Sidebar.jsx';
import HamburgerButton from './HamburgerButton.jsx';
import NavigationWide from './NavigationWide.jsx';
import { Button } from '@material-ui/core';
import './Header.css';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {

    const location = useLocation();


    const [sidebarState, setSidebarState] = useState({
        right: false
    });

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const setTitle = (fullPath) => {
        const firstPart = fullPath.split("/")[1].toLowerCase()
        switch (firstPart) {
            case '':
                return 'Home'
                break;
            case 'create':
                return 'Create New Petition'
                break;
            case 'my-petition':
                return 'Petiton Analytics'
                break;
            case "petition":
                return 'Petiton'
                break;
            default:
                return capitalizeFirstLetter(fullPath.substring(1))
        }
    }

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
            <div className="main-header-container">
            <Link to="/" className="main-header__logo">
                <img src="/logo.svg" alt="petitions logo" />
                <span className="logo-title">petitions</span>
            </Link>
            

            <MatchMediaWrapper
                mobileContent={
                    <>
                        <div className="main-header__title">{setTitle(location.pathname)}</div>
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
                    <NavigationWide />
                }
            />

            </div>


        </header>
    );
}

export default Header;