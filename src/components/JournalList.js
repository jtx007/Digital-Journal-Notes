import React, { Component } from 'react'
import chinguRailsAPI from '../api/chinguBackendAPI'
import JournalEntryCard from './JournalEntryCard'

export default class JournalList extends Component {

    state = {
        journalEntries: [],
        entryTitle: '',
        entryBody: ''
    }


async componentDidMount() {
    const response = await chinguRailsAPI.get("entries")
        this.setState({
            journalEntries: response.data
        })
    }

renderJournalCards = (entries) => {
    return entries.map((entry) => {
        return <JournalEntryCard key={entry.id}  entry={entry} />
    })
}

    handleTitleInputChange = (event) => {
        this.setState({
            entryTitle: event.target.value
        })
    }

    handleBodyTextAreaChange = (event) => {
        this.setState({
            entryBody: event.target.value
        })
    }

    render() {
        return (
            <div>
                <div className="ui container">
                    <h1 className="header">Chingu Journal</h1>
                        <form className="ui container form">
                            <div className="field">
                                <label>Entry Title</label>
                                <input 
                                onChange={this.handleTitleInputChange}
                                type="text" 
                                value={this.state.entryTitle
                                }/>
                            </div>
                            <div className="field">
                                <label>Body</label>
                                <textarea
                                onChange={this.handleBodyTextAreaChange} 
                                type="text" 
                                value={this.state.entryBody}
                                />       
                            </div>
                        <button className="ui primary button" type="submit">Submit</button>
                        </form>
                                
                        <div className="ui cards">
                            {this.renderJournalCards(this.state.journalEntries)}
                        </div>
                </div>
            </div>
        )
    }
}