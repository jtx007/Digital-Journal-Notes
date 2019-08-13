import React, { Component } from 'react'
import chinguBackendAPI from '../api/chinguBackendAPI'
import { connect } from 'react-redux';
import { sign_in } from '../actions/index'
import { Redirect } from 'react-router-dom'

class Registerform extends Component {
    state = {
        username: '',
        password: ''
    }

    handleUsernameChange = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleFormSubmit =  async (event) => {
        event.preventDefault()
        await chinguBackendAPI.post("/users", 
        {
            "user": {"username": this.state.username, "password": this.state.password}
        },
        {headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }}
        ).catch((error) => alert(error.response.data.errors[0]))
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
            return <Redirect to="/" />
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

export default connect(mapStateToProps, { sign_in })(Registerform);