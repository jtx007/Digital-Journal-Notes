import React from 'react'
import { Router, Route, Switch} from 'react-router-dom';
import Navbar from './Navbar'
import history from '../history'
import Form from './Form'
import JournalList from './JournalList';

const App = () => {
    return (
        <div>
            <Router history={history}>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={JournalList} />
                    <Route exact path="/login" render={() => <Form formType={"Existing User Login"}  label1={"Enter Username"} label2={"Enter Password"}/>} />
                </Switch>
            </Router>
        </div>
    )
}

export default App