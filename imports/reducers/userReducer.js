import React from 'react';

export const userReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_DATA':
            console.log("inside ADD_DATA")
            console.log(action.userData)
            return action.userData
        default :
            return state
    }
}