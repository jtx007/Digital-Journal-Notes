import {SIGN_IN, SIGN_OUT} from '../actions/types'


const INITIAL_STATE = {
    isLoggedIn: localStorage.getItem('token') ? true : false,
    token: localStorage.getItem('token') || null,
    user_id: localStorage.getItem('userId') || null
}

export default(state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('userId', action.payload.user_id)
            return {...state, isLoggedIn: true, token: action.payload.token , user_id: action.payload.user_id }
        case SIGN_OUT:
            localStorage.clear()
            return {...state, isLoggedIn: false, token: null, user_id: null}
        default:
            return state;
    }
}