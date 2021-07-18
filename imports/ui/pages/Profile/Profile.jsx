import React, { useState, useEffect } from 'react';
import Petitions from '../../../../lib/petitions';
import { useTracker } from 'meteor/react-meteor-data';
import './Profile.css';
import Register from '../SignUp/Register';
import FileUpload from '../../components/FileUpload';
import Images from '/lib/dropbox.js';
import helpers from '../../components/GlobalHelpers';

const Profile = () => {

    const [uImage, setUImage] = useState("");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');




    const submit = e => {
        e.preventDefault();

        Meteor.loginWithPassword(username, password);
    };

    const {user, isUserLoading} = useTracker(() => {
        const handler = Meteor.subscribe('userData')
        const noDataAvailable = {user: {}};

        if (!handler.ready()) {
            return { ...noDataAvailable, isUserLoading: true };
        }
        const user = Meteor.user();
        return {user}
    });

    useEffect(() => {
        const pic = user?.profile?.picture || "";
        setUImage(() => pic)
    }, [isUserLoading])

    const onSetImage = (uImg) => {
        setUImage(()=>uImg)
    }

    const { petitions, isLoading } = useTracker(() => {
        const noDataAvailable = { petitions: [] };
        const handler = Meteor.subscribe('petitions')

        if (!handler.ready()) {
            return { ...noDataAvailable, isLoading: true };
        }

        const petitions = Petitions.find().fetch();

        return { petitions, isLoading: false };
    })

    return (
        <div className="container">

            <FileUpload 
                uImage={uImage}
                setImage={onSetImage}
            />

        <div>picture: {uImage}</div>

            <div>
                <Register />
            </div>
            <div>
                <form onSubmit={submit} className="login-form">
                    <label htmlFor="username">Username</label>

                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        required
                        onChange={e => setUsername(e.target.value)}
                    />

                    <label htmlFor="password">Password</label>

                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button type="submit">Log In</button>
                </form>
            </div>
            <div className="text-center pt-3 mb-5">
                <div className="avatar mx-auto mb-2">
                    <img className="avatar__img" src={helpers.getImgUrlById(uImage)} alt="" />
                </div>
                { user && <div>{user.username}</div>}
            </div>
            <div>
                <div className="row">
                    <div className="col-12">


                        {isLoading ? <div>loading...</div> :

                            petitions.map((pet) => {
                                return (
                                    <div
                                        className="my-petiton mb-3"
                                        key={pet._id}
                                    >
                                        <div className="my-petiton__cover"
                                            style={
                                                {
                                                    backgroundImage: `url(${pet.imageCover})`
                                                }
                                            }
                                        >
                                        </div>
                                        <div className="my-petiton__details px-2 py-1">
                                            <h4 className="my-petiton__details__title">{pet.title}</h4>
                                            {/* <p className="my-petiton__details__date">22/09/2020</p> */}
                                            <p className="my-petiton__details__signatures">12 of {pet.milestone} signatures</p>
                                        </div>
                                    </div>
                                )
                            })

                        }



                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;