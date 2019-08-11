import {SIGN_IN, SIGN_OUT} from '../actions/types'


const INITIAL_STATE = {
    isLoggedIn: false,
    token: null,
    user_id: null
}

export default(state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            
            localStorage.setItem('token', action.payload.token)
            const user_id = action.payload.user_id
            return {...state, isLoggedIn: true, token: action.payload.token , user_id: user_id }
        case SIGN_OUT:
            localStorage.clear()
            return INITIAL_STATE
        default:
            return state;
    }
}