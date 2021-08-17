import React, { createContext, useReducer, useEffect } from 'react';
import { userReducer } from '../reducers/userReducer'
// {title: 'name of the wind', author: 'patrick rothfuss', id: 1},
// {title: 'the final empire', author: 'brandon sanderson', id: 2}
import { useTracker } from 'meteor/react-meteor-data';

export const UserContext = createContext();


const UserContextProvider = (props) => {

    const {user, userId, isUserLoading, isUserLogging, picture} = useTracker(() => {

        const handler = Meteor.subscribe('userData');
        const noDataAvailable = {user: null};
        const isUserLogging = Meteor.loggingIn();
        const userId = Meteor.userId();
       
        console.log('loading user...')

        if (!handler.ready()) {

            return { ...noDataAvailable, userId: null, isUserLoading: true, isUserLogging, picture: '' };
        }
        const user = Meteor.user()?.profile;
        const picture = Meteor.user()?.profile?.picture;

        return {user, userId, isUserLoading: false, isUserLogging, picture}
    });

    const [profileData, dispatch] = useReducer(userReducer, null);


    useEffect(() => {
        console.log('useEffect inside context')
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