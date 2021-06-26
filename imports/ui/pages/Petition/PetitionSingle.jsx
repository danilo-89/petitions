import React from 'react';
import './PetitionSingle.css'

const PetitionSingle = (props) => {
    return (
        <>
            <div className="petition-header">

                <div
                    className="cover-holder"
                >

                    <div className="cover-holder__title">
                        
                        <h2 className="cover-holder__title-name">
                        {props.title}
                        </h2>

                    </div>

                    <div
                        className="cover-holder__cover"
                        style={
                            { backgroundImage: `url(${props.imageCover})` }
                        }
                    >
                        <div className="cover-holder__top"></div>
                        <button className="sign-petition-button">Sign</button>
                    </div>
                    <div className="title-holder">
                        <div className="title-holder__left">
                            <div
                                className="title-holder__left-avatar"
                                style={
                                    { backgroundImage: `url(${props.imageCover})` }
                                }
                            ></div>
                        </div>
                        <div className="title-holder__right">
                            <p>Petition author:</p>
                            <h3>{props.towards}</h3>
                        </div>
                    </div>
                    {/* <div className="actions-holder">
                        <button>Sign</button>
                    </div> */}
                </div>
            </div>

            <div className="petition-content">
            <div className="towards-holder">
                            <h3>
                                <span className="towards-holder__for-span">For:</span> {props.towards}</h3>
                        </div>
                <h4 className="petition-content__overview">
                {props.overview}
                </h4>
                <p className="petition-content__details">
                {props.details}
                {props.video}
                </p>
                {/* <div id="sRVideo" className="petition-video-wrapper href-effect">
                            <iframe width="420" height="345" src="https://www.youtube.com/embed/awE_8ZG6DCw" allowFullScreen={true}>
                            </iframe>
                </div> */}
            </div>

            {/* <img src={props.imageCover} alt="" /> */}

        </>
    );
}

export default PetitionSingle;