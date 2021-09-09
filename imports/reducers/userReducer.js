export const userReducer = (state, action) => {
    switch(action.type) {
        case 'UPDATE_DATA':
            return action.userData
        default :
            return state
    }
}