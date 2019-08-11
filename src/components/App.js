import React from 'react'
import { Router, Route, Switch} from 'react-router-dom';
import Navbar from './Navbar'
import history from '../history'
import LoginForm from './LoginForm'
import JournalList from './JournalList';
import RegisterForm from './registerForm'

const App = () => {
    return (
        <div>
            <Router history={history}>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={JournalList} />
                    <Route exact path="/login" render={() => <LoginForm formType={"Existing User Login"}  label1={"Enter Username"} label2={"Enter Password"}/>} />
                    <Route exact path="/register" render={() => <RegisterForm  formType={"Register New User"} label1={"Create Username"} label2={"Create Password"}/>} />
                </Switch>
            </Router>
        </div>
    )
}

export default App