import React from 'react';

export const userReducer = (state, action) => {
    switch(action.type) {
        case 'UPDATE_DATA':
            // console.log("inside UPDATE_DATA")
            // console.log(action.userData)
            return action.userData
        default :
            return state
    }
}