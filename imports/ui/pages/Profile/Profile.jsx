import React from 'react';
import './Profile.css';

const Profile = () => {
    return (
        <div className="container">
            <div className="text-center pt-3">
                <div className="avatar mx-auto mb-2">
                    <img className="avatar__img" src="/avatar.webp" alt="" />
                </div>
                <div>User name</div>
            </div>
            <div>
                <div className="row">
                    <div className="col-12">
                        <div className="my-petiton">
                            <div className="my-petiton__cover">
                            </div>
                            <div className="my-petiton__details px-2 py-1">
                                <h4  className="my-petiton__details__title">Lorem ipsum dolor sit amet consectetur adipisicing</h4>
                                <p className="my-petiton__details__date">Date created:</p>
                                <p className="my-petiton__details__signatures">12 of 50 signatures</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;