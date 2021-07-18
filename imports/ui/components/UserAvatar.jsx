import React from 'react';
import './UserAvatar.css'

const UserAvatar = (props) => {
    return (
        <div onClick={props.handleClick ? props.handleClick: null } className="avatar mx-auto mb-2">
            <div className="avatar__holder">
                <img className="avatar__holder__img" src={props.img} alt="" />
            </div>
        </div>
    );
}

export default UserAvatar;