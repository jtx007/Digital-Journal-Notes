import React, {useState, Fragment } from 'react'
import digitalJournalAPI from '../api/digitalJournalAPI'
import { connect } from 'react-redux'

const JournalEntryCard = ({ entry, token, handleDeleteEntry, handleEditEntry, user_id }) => {

    const [editFormShow, toggleEditForm] = useState(false)
    const [editedEntryTitle, changeEntryTitle] = useState(entry.title)
    const [editedEntryBody, changeEntryBody] = useState(entry.body)

    const renderForm = () => {
        if (editFormShow) {
            return (
                <div className="card">
                    <div className="content">
                        <h4 className="ui header">Edit Entry</h4>
                    </div>
                    <form onSubmit={editEntry} className="ui form container content">
                        <div className="field">
                            <label>Edit Title</label>
                            <input onChange={(event) => changeEntryTitle(event.target.value)} type="text" value={editedEntryTitle} />
                        </div>
                        <div className="field">
                            <label>Edit Body</label>
                            <textarea onChange={(event) => changeEntryBody(event.target.value)} type="text" value={editedEntryBody} />
                        </div>
                        <div className="extra content">
                            <button type="submit" className="ui primary button">Save</button>
                            <button onClick={() => toggleEditForm(prevState => !prevState)} className="ui red button">Undo</button>
                        </div>
                    </form>
                </div>
            )
        } else {
            return (
            <div className="card">
                <div className="content">
                    <div className="header">{entry.title}</div>
                    <div className="description">{entry.body}</div>
                </div>
                <div className="extra content">
                    <button onClick={() => toggleEditForm(prevState => !prevState)} className="ui primary button">Edit</button>
                    <button onClick={deleteEntry} className="ui red button">Delete</button>
                </div>
            </div>
            )
        }
    }

    const editEntry = async(event) => {
        event.preventDefault()
        const response = await digitalJournalAPI.patch(`entries/${entry.id}`, 
        {
            "entry": {"title": editedEntryTitle, "body": editedEntryBody, "user_id": user_id}
        },
        {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": token
            }
        })
        handleEditEntry(response.data)
        toggleEditForm(false)
    }

    const deleteEntry = async() => {
            await digitalJournalAPI.delete(`entries/${entry.id}`, {
                headers: {
                    "Authorization": token
                }
            })
            handleDeleteEntry(entry.id)
        }
    return (
            <Fragment>
                {renderForm()}

            </Fragment>
    
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