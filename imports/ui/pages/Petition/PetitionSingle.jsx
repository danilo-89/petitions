import React from 'react';
import './PetitionSingle.css'

const PetitionSingle = (props) => {
    return ( 
        <>
        <div 
        className="cover-holder"
        >
            <div 
            className="cover-holder__cover"
            style={
                {backgroundImage:`url(${props.imageCover})`}
            }
            >

            </div>
            <div
            className="cover-holder__avatar"
            style={
                {backgroundImage:`url(${props.imageCover})`}
            }
            >
                <div className=""></div>
                <div className="">test</div>
            </div>
        </div>
        {/* <img src={props.imageCover} alt="" /> */}
        <h2>{props.title}</h2>
        <h3>For: {props.towards}</h3>
        <p>{props.overview}</p>
        <p>{props.details}</p>
        </>
     );
}
 
export default PetitionSingle;