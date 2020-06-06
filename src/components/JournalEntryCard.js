import React, {useState } from 'react'
import digitalJournalAPI from '../api/digitalJournalAPI'
import { LoginContext } from '../auth/loginContext'

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
                            <input required onChange={(event) => changeEntryTitle(event.target.value)} type="text" value={editedEntryTitle} />
                        </div>
                        <div className="field">
                            <label>Edit Body</label>
                            <textarea required onChange={(event) => changeEntryBody(event.target.value)} type="text" value={editedEntryBody} />
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
        try {
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

        } catch (error) {
            console.log(error)
        }
    }

    const deleteEntry = async() => {
        try {
            await digitalJournalAPI.delete(`entries/${entry.id}`, {
                headers: {
                    "Authorization": token
                }
            })
            handleDeleteEntry(entry.id)

        } catch (error) {
            console.log(error)
        }
    }


    return (
            <>
            {renderForm()}
            </>
    )
}

const JournalEntryCardWithContext = (props) => {
    return (
        <LoginContext.Consumer>
            {value => {
                return <JournalEntryCard {...value} {...props} />
            }}
        </LoginContext.Consumer>
    )
}

export default JournalEntryCardWithContext