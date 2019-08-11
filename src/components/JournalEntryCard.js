import React from 'react'
import chinguRailsAPI from '../api/chinguBackendAPI'


const JournalEntryCard = ({ entry }) => {

 const deleteEntry = async() => {
        await chinguRailsAPI.delete(`entries/${entry.id}`, {
            headers: {
                "Authorization": "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1NjU0NzAzNTB9.gRyAKNB2bqgyVTiX0AOeCgesE91A_NU-IUUec7LU_94"
            }
        })
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

export default JournalEntryCard