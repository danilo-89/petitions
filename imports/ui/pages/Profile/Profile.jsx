import React, { useState } from 'react';
import Petitions from '../../../../lib/petitions';
import { useTracker } from 'meteor/react-meteor-data';
import './Profile.css';

const Profile = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const submit = e => {
      e.preventDefault();
  
      Meteor.loginWithPassword(username, password);
    };

    const { petitions, isLoading } = useTracker(() => {
        const noDataAvailable = { petitions: [] };
        const handler = Meteor.subscribe('petitions')

        if (!handler.ready()) {
            return { ...noDataAvailable, isLoading: true };
        }

        const petitions = Petitions.find().fetch();

        return { petitions, isLoading: false};
    })

    return (
        <div className="container">
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
                    <img className="avatar__img" src="/avatar.webp" alt="" />
                </div>
                <div>User name</div>
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
                                style = {
                                    {
                                        backgroundImage:`url(${pet.imageCover})`
                                    }
                                }
                                >
                                </div>
                                <div className="my-petiton__details px-2 py-1">
                                    <h4  className="my-petiton__details__title">{pet.title}</h4>
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