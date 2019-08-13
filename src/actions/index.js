import history from '../history';
import { SIGN_IN, SIGN_OUT } from './types'
import chinguLogin from '../api/chinguLogin'

export const sign_in = (username, password) => async dispatch => {
    
    const response = await chinguLogin.post(
        "/login", 
        {
            "username": username, "password": password
        },
        {
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })

    dispatch({type: SIGN_IN, payload: response.data})
    history.push("/")
}

export const sign_out = () => dispatch => {
    dispatch({type: SIGN_OUT})
    history.push("/")
}