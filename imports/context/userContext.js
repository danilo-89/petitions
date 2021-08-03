import React, { createContext, useReducer, useEffect } from 'react';
import { userReducer } from '../reducers/userReducer'
// {title: 'name of the wind', author: 'patrick rothfuss', id: 1},
// {title: 'the final empire', author: 'brandon sanderson', id: 2}
import { useTracker } from 'meteor/react-meteor-data';

export const UserContext = createContext();


const UserContextProvider = (props) => {


    const {user, isUserLoading} = useTracker(() => {
        const handler = Meteor.subscribe('userData')
        const noDataAvailable = {user: null};

        if (!handler.ready()) {
            return { ...noDataAvailable, isUserLoading: true };
        }
        const user = Meteor.user();
        // console.log("from tracker")
        // console.log(user)
        return {user, isUserLoading: false}
    });

    const [userR, dispatch] = useReducer(userReducer, {}, () => {
        const userData = user;
        console.log('userData')
        console.log(userData)
        return isUserLoading ? {} : userData
    });


    useEffect(() => {
        // const pic = user?.profile?.picture || "";
        // setProfileUsername(user?.username || "");
        // setUImage(() => pic)
        // console.log("userR")
        // console.log(userR)
        const userData = user || {};
        
        console.log('user')
        console.log(userData)
        dispatch({type: 'ADD_DATA', userData, isUserLoading})
        console.log('userR')
        console.log(userR)
    }, [isUserLoading])

    // useEffect(() => {
    //     setFields(() => petition.fields)
    //     // console.log(fields)
    // }, [isLoading])

    // useEffect(() => {
    //     localStorage.setItem('books', JSON.stringify(books));
    // }, [books])

    return (
        <UserContext.Provider value={{userR, dispatch}}>
            { props.children }
        </UserContext.Provider>
    )
}
 
export default UserContextProvider;