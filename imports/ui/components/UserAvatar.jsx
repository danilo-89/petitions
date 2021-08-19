import React from 'react';
import './UserAvatar.css'

const UserAvatar = (props) => {
    return (
        <div onClick={props.handleClick ? props.handleClick: null } 
        className={`avatar mx-auto ${props.mBottom ? '' : 'mb-2'}`}
        style={
            props.mBottom ? {marginBottom: props.mBottom} : null
        }
        >
            <div className="avatar__holder"
                style={
                    props.padding ? {padding: props.padding} : null
                }
            >
                <img 
                className="avatar__holder__img" src={props.img} alt="" />
            </div>
        </div>
    );
}

export default UserAvatar;