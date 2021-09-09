import React, { createContext, useReducer, useEffect } from 'react';
import { userReducer } from '../reducers/userReducer'
import { useTracker } from 'meteor/react-meteor-data';

export const UserContext = createContext();

const UserContextProvider = (props) => {

    const {user, userId, isUserLoading, isUserLogging, picture} = useTracker(() => {

        const handler = Meteor.subscribe('userData');
        const noDataAvailable = {user: null};
        const isUserLogging = Meteor.loggingIn();
        const userId = Meteor.userId();

        if (!handler.ready()) {

            return { ...noDataAvailable, userId: null, isUserLoading: true, isUserLogging, picture: '' };
        }
        const user = Meteor.user()?.profile;
        const picture = Meteor.user()?.profile?.picture;

        return {user, userId, isUserLoading: false, isUserLogging, picture}
    });

    const [profileData, dispatch] = useReducer(userReducer, null);


    useEffect(() => {
        const userData = user || null;
        dispatch({type: 'UPDATE_DATA', userData})
    }, [isUserLoading, isUserLogging, userId, picture])

    return (
        <UserContext.Provider value={{profileData, userId, isUserLoading, isUserLogging, dispatch}}>
            { props.children }
        </UserContext.Provider>
    )
}

export default UserContextProvider;