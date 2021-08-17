import React, { useState, useEffect, useContext } from 'react';
import Petitions from '../../../../lib/petitions';
import { useTracker } from 'meteor/react-meteor-data';
import './Profile.css';
import FileUpload from '../../components/FileUpload';
import Images from '/lib/dropbox.js';
import helpers from '../../components/GlobalHelpers';
import { getCipherInfo } from 'crypto';
import { getegid } from 'process';
import UserAvatar from '../../components/UserAvatar';
import { Link } from 'react-router-dom';

import { UserContext } from '../../../context/userContext';
import LoginOrRegister from '../SignUp/LoginOrRegister';
import { CardList } from 'react-bootstrap-icons';

const Profile = () => {

    const [uImage, setUImage] = useState("");
    const [profileUsername, setProfileUsername] = useState('');

    const { profileData, isUserLoading, isUserLogging, dispatch } = useContext(UserContext)
    
    // console.log('profileData inside profile')
    // console.log(profileData)
    // console.log(dispatch)
    // console.log('isUserLoading inside profile')
    // console.log(isUserLoading)


    // const {user, isUserLoading} = useTracker(() => {
    //     const handler = Meteor.subscribe('userData')
    //     const noDataAvailable = {user: null};

    //     if (!handler.ready()) {
    //         return { ...noDataAvailable, isUserLoading: true };
    //     }
    //     const user = Meteor.user();
    //     return {user}
    // });

    useEffect(() => {
        console.log('useEffect inside profile')
        const pic = profileData?.picture || "";
        setProfileUsername(Meteor.user()?.username || "");
        setUImage(() => pic)
    }, [profileData])

    const onSetImage = (uImg) => {
        setUImage(()=>uImg)
    }

    const { petitions, isLoading } = useTracker(() => {
        const noDataAvailable = { petitions: [] };
        const handler = Meteor.subscribe('petitionsAuthor')

        if (!handler.ready()) {
            return { ...noDataAvailable, isLoading: true };
        }

        const petitions = Petitions.find().fetch();

        return { petitions, isLoading: false };
    })

    const handleUpdateClick = () => {
        console.log("test")
        Meteor.call('update.account', profileUsername, uImage, (err, res) => {
            if (err) {
                console.log(err.reason)
            } else {
                if (res.isError) {
                    // Bert.alert(res.err.reason, 'danger');
                    console.log(res.err.reason)
                } else {
                    // Bert.alert('Success', 'success');
                    // resetForm();
                    // FlowRouter.go('/myRecipes');
                    console.log('success')
                }
            }
        });
    }

    const handleResetClick = () => {
        setUImage(profileData?.picture);
        setProfileUsername(Meteor.user()?.username);
    }

    const handleAvatarClick = () => {
        console.log("test")
        document.getElementById('fileinput').click();
    }

    return (
        <div className="container">

            <div className="pt-3">
            {!Meteor.userId() && <LoginOrRegister />}
            </div>
            
            
            {Meteor.userId() &&
            <>

            <div className="text-center">
                <button
                className="btn btn-outline-dark min-w-105px px-4 py-2"
                onClick={() => {Meteor.logout()}}
                >
                Log out
                </button>
            </div>

            <div className="text-center pt-3 mb-5">
                { profileData ? (

                    <>
                        <div className="profile-avatar-holder">
                            <UserAvatar 
                                handleClick={handleAvatarClick}
                                img={helpers.getImgUrlById(uImage)}
                            />
                        </div>

                        <FileUpload 
                            uImage={uImage}
                            setImage={onSetImage}
                        />
                    </>

                    ) : <div>no user</div>
                }
                
                { profileData && <input 
                    className="text-center px-2 py-1 custom-input mb-3"
                    type="text" 
                    value={profileUsername}
                    onChange={(e) => setProfileUsername(e.target.value)} 
                />}


                <div className="text-center">
                    {(Meteor.user()?.username != profileUsername || profileData?.picture != uImage) &&
                        <div>
                            <button
                            className="btn btn-secondary min-w-105px px-4 py-2 mr-2"
                            onClick={handleResetClick}
                            >
                            Reset
                            </button>
                            <button
                            className="btn btn-primary min-w-105px px-4 py-2"
                            onClick={handleUpdateClick}>
                            Update
                            </button>
                        </div>
                    }
                    
                </div>
            </div>
            <div>
                <div className="row">
                    <div className="col-12">
                        <div className="el-title-holder d-flex align-items-center">
                           <CardList /> <span className="ml-1">My petitions</span>
                        </div>
                    </div>
                    <div className="col-12">


                        {isLoading ? <div>loading...</div> :

                            petitions.map((pet) => {
                                return (
                                    <Link
                                        to={`/my-petition?p=${pet._id}`}
                                        className="my-petiton mb-3"
                                        key={pet._id}
                                    >
                                        <div className="my-petiton__cover"
                                            style={
                                                pet.imageCover ? {
                                                    backgroundImage: `url(${helpers.getImgUrlById(pet.imageCover)})`
                                                } : {
                                                    backgroundImage: `url(/logo.svg)`
                                                }
                                            }
                                        >
                                        </div>
                                        <div className="my-petiton__details px-2 py-1">
                                            <h4 className="my-petiton__details__title">{pet.title}</h4>
                                            {/* <p className="my-petiton__details__date">22/09/2020</p> */}
                                            <p className="my-petiton__details__signatures">12 of {pet.milestone} signatures</p>
                                        </div>
                                    </Link>
                                )
                            })

                        }



                    </div>
                </div>
            </div>
            </>
            }
        </div>
    );
}

export default Profile;