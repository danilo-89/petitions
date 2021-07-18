import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import './PetitionSingle.css'
import UserAvatar from '../../components/UserAvatar';
import helpers from '../../components/GlobalHelpers';

const PetitionSingle = (props) => {
    // console.log('props in single')
    // console.log(props)
    // console.log('props in single END')

    const {userAuthor, isUserAuthorLoading} = useTracker(() => {
        const handler = Meteor.subscribe('userAuthor', props.author)
        const noDataAvailable = {userAuthor: null};

        if (!handler.ready()) {
            return { ...noDataAvailable, isUserAuthorLoading: true };
        }
        const userAuthor = Meteor.users.findOne({_id: props.author});
        console.log(userAuthor)
        return {userAuthor}
    });

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

                    <div className="cover-holder__top">
                        <div className="cover-holder__top__pet-status">
                            <div className="cover-holder__progress-bar">
                                <div className="cover-holder__progress-bar-line">
                                </div>
                            </div>
                            <span className="">
                                {props.totalSignatures || 0}
                            </span>
                            <span className="mr-2">
                                {
                                    props.milestone ? <> have signed | <span className="milestone-span">{props.milestone}</span> required signatures</> : ''
                                }

                            </span>

                            <button className="btn btn-outline-success sign-petition-button mt-3">Sign this petition</button>
                        </div>
                        
                    </div>

                    <div
                        className="cover-holder__cover"
                        style={
                            { backgroundImage: `url(${helpers.getImgUrlById(props.imageCover)})` }
                        }
                    >
                    </div>
                    <div className="title-holder">
                        <div className="title-holder__left">
                            <div
                                className="title-holder__left-avatar">
                                    {userAuthor && (<UserAvatar 
                                        // handleClick={handleAvatarClick}
                                        img={helpers.getImgUrlById(userAuthor.profile.picture)}
                                    />)
                                    }
                                </div>
                        </div>
                        <div className="title-holder__right">
                            <p>Petition author:</p>
                            {/* <h3>{userAuthor.username}</h3> */}
                            {userAuthor && <h3>{userAuthor.username}</h3>}
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