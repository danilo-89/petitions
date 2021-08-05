import React, { createContext, useReducer, useEffect } from 'react';
import { userReducer } from '../reducers/userReducer'
// {title: 'name of the wind', author: 'patrick rothfuss', id: 1},
// {title: 'the final empire', author: 'brandon sanderson', id: 2}
import { useTracker } from 'meteor/react-meteor-data';

export const UserContext = createContext();


const UserContextProvider = (props) => {


    const {user, isUserLoading, isUserLogging} = useTracker(() => {
        const handler = Meteor.subscribe('userData')
        const noDataAvailable = {user: null};
        const isUserLogging = Meteor.loggingIn();
        const userId = Meteor.userId();

        if (!handler.ready()) {
            return { ...noDataAvailable, isUserLoading: false, isUserLogging };
        }
        const user = Meteor.user();
        return {user, isUserLoading: !!userId, isUserLogging}
    });

    const [currUser, dispatch] = useReducer(userReducer, null);


    useEffect(() => {
        // const pic = user?.profile?.picture || "";
        // setProfileUsername(user?.username || "");
        // setUImage(() => pic)
        // console.log("userR")
        // console.log(userR)
        console.log('useEffect inside context')
        
        const userData = user || null;
        dispatch({type: 'ADD_DATA', userData})
 
    }, [isUserLoading, isUserLogging])

    // useEffect(() => {
    //     setFields(() => petition.fields)
    //     // console.log(fields)
    // }, [isLoading])

    // useEffect(() => {
    //     localStorage.setItem('books', JSON.stringify(books));
    // }, [books])

    return (
        <UserContext.Provider value={{currUser, isUserLoading, isUserLogging, dispatch}}>
            { props.children }
        </UserContext.Provider>
    )
}
 
export default UserContextProvider;