import React from 'react';

const PetitionSingle = (props) => {
    return ( 
        <>
        <img src={props.imageCover} alt="" />
        <h2>{props.title}</h2>
        <h3>For: {props.towards}</h3>
        <p>{props.overview}</p>
        <p>{props.details}</p>
        </>
     );
}
 
export default PetitionSingle;