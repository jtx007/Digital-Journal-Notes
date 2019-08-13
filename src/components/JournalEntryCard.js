import React from 'react'
import chinguRailsAPI from '../api/chinguBackendAPI'
import { connect } from 'react-redux'

const JournalEntryCard = ({ entry, token, handleDeleteEntry }) => {




    const deleteEntry = async() => {
            await chinguRailsAPI.delete(`entries/${entry.id}`, {
                headers: {
                    "Authorization": token
                }
            })
            handleDeleteEntry(entry.id)
        }
        
    return (
        <div className="card">
            <div className="content">
                <div className="header">{entry.title}</div>
                <div className="description">{entry.body}</div>
            </div>
            <div className="extra content">
                <button className="ui primary button">Edit</button>
                <button onClick={deleteEntry} className="ui red button">Delete</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        token: state.auth.token,
        user_id: state.auth.user_id
    }
}

export default connect(mapStateToProps)(JournalEntryCard)