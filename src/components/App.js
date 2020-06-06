import React, {useState} from 'react'
import { Router, Route, Switch} from 'react-router-dom';
import Navbar from './Navbar'
import history from '../history'
import LoginForm from './LoginForm'
import JournalList from './JournalList';
import RegisterForm from './registerForm'
import { LoginContext } from '../auth/loginContext'

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn" || " "))
    const [token, setToken] = useState(localStorage.getItem("token") || " ");
    const [user_id, setUserId] = useState(localStorage.getItem("user_id" || " "))
    
    return (
        <div>
            <Router history={history}>
                <LoginContext.Provider
                    value={{
                        isLoggedIn,
                        token,
                        user_id,
                        setIsLoggedIn,
                        setUserId,
                        setToken
                    }}
                 >
                <Navbar />
                <Switch>
                    <Route exact path="/" component={JournalList} />
                    <Route exact path="/login" render={() => <LoginForm formType={"Existing User Login"}  label1={"Enter Username"} label2={"Enter Password"}/>} />
                    <Route exact path="/register" render={() => <RegisterForm  formType={"Register New User"} label1={"Create Username"} label2={"Create Password"}/>} />
                </Switch>
                </LoginContext.Provider>
            </Router>
        </div>
    )
}

export default App