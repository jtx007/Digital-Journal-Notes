import React, { Component } from 'react'

export default class JournalList extends Component {
    render() {
        return (
            <div>
                <div className="ui container">
                    <h1 className="header">Chingu Journal</h1>
                         <p>If logged in, your Journal Entries will appear here, otherwise it will tell you to login</p>

                </div>
            </div>
        )
    }
}