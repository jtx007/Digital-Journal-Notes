import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { sign_in } from '../actions/index'

class LoginForm extends Component {

    state = {
        username: '',
        password: ''
    }

    handleUsernameChange = (e) => {
        this.setState({
            username: e.target.value.trim()
        })
    }

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value.trim()
        })
    }

    handleFormSubmit =  (event) => {
        event.preventDefault()
        this.props.sign_in(this.state.username, this.state.password)
    }

    render() {
        if (!this.props.isLoggedIn) {
            return (
                <form onSubmit={this.handleFormSubmit} className="ui segement container form">
                    <h1 className="header">{this.props.formType}</h1>
                    <div className="field">
                        <label>{this.props.label1}</label>
                        <input
                        onChange={this.handleUsernameChange}
                        type="text"  value={this.state.username}/>
                    </div>
                    <div className="field">
                        <label>{this.props.label2}</label>
                        <input
                        onChange={this.handlePasswordChange} 
                        type="password"  value={this.state.password}/>
                    </div>
                <button className="ui primary button" type="submit">Submit</button>
                </form>
            )
        } else {
            return <Redirect to ="/" />
        }
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        token: state.auth.token,
        user_id: state.auth.user_id
    }
}


export default connect(mapStateToProps, { sign_in })(LoginForm)