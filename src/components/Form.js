import React, { Component } from 'react'


export default class Form extends Component {

    state = {
        input1: '',
        input2: ''
    }

    render() {
        return (
            <form className="ui segement container form">
                <h1 className="header">{this.props.formType}</h1>
                <div className="field">
                    <label>{this.props.label1}</label>
                    <input type="text"  value={this.state.input1}/>
                </div>
                <div className="field">
                    <label>{this.props.label2}</label>
                    <input type="text"  value={this.state.input2}/>
                </div>
            <button className="ui primary button" type="submit">Submit</button>
            </form>
        )
    }
}