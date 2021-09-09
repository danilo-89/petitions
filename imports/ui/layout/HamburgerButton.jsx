import React from "react";

const HamburgerButton = ({ toggleDrawer, state }) => {
    return (
<>
        <button type="button"
            className={"main-header__btn hamburger-button" + (state.right ? " active" : "")}
            onClick={(event) => {
                toggleDrawer(!state.right)()}}>
            <span className="hamburger-button__top"></span>
            <span className="hamburger-button__middle"></span>
            <span className="hamburger-button__bottom"></span>
        </button>
</>
    );
}

export default HamburgerButton;