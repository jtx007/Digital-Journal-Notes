import history from '../history';
import { SIGN_IN, SIGN_OUT } from './types'
import digitalJournalLogin from '../api/digitalJournalLogin'

export const sign_in = (username, password) => async dispatch => {
    
    const response = await digitalJournalLogin.post(
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
        .catch((error) => alert(error.response.data.error))

    if (response) {
    dispatch({type: SIGN_IN, payload: response.data})
    history.push("/")
    }
}

export const sign_out = ()  => {
    return {
        type: SIGN_OUT
    }
}