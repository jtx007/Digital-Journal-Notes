import React, { Component } from 'react'


export default class Form extends Component {

    state = {
        input1: '',
        input2: ''
    }

    handleInput1Change = (e) => {
        this.setState({
            input1: e.target.value
        })
    }

    handleInput2Change = (e) => {
        this.setState({
            input2: e.target.value
        })
    }

    handleFormSubmit = () => {
        if (this.props.formType === "Sign Up New User") {
            // create user
        } else {
            // login user
        }
    }

    render() {
        return (
            <form className="ui segement container form">
                <h1 className="header">{this.props.formType}</h1>
                <div className="field">
                    <label>{this.props.label1}</label>
                    <input
                     onChange={this.handleInput1Change}
                     type="text"  value={this.state.input1}/>
                </div>
                <div className="field">
                    <label>{this.props.label2}</label>
                    <input
                    onChange={this.handleInput2Change} 
                    type="password"  value={this.state.input2}/>
                </div>
            <button className="ui primary button" type="submit">Submit</button>
            </form>
        )
    }
}