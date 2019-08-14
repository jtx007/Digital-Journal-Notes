import React, { Component, Fragment } from 'react'
import chinguRailsAPI from '../api/chinguBackendAPI'
import JournalEntryCard from './JournalEntryCard'
import { connect } from 'react-redux';
import InfoPanel from './InfoPanel'

class JournalList extends Component {

    state = {
        journalEntries: [],
        entryTitle: '',
        entryBody: '',
        currentUser: ''
    }


async componentDidMount() {
    if (this.props.isLoggedIn) {
        const response = await chinguRailsAPI.get(`/users/${this.props.user_id}`, {headers: {"Authorization": this.props.token}})
        this.setState({
            journalEntries: response.data.entries,
            currentUser: response.data.username
        })
    }


}



renderNewEntryForm = () => {
    if (this.props.isLoggedIn) {
        return (
            <div className="ui container">
                <div className="ui hidden divider"></div>

                        <InfoPanel
                        header={`Welcome ${this.state.currentUser}`}
                        cardContent={"Record your thoughts here"}
                        />
                        <form onSubmit={this.handleSubmitNewEntry} className="ui container form">
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
                        <div className="ui hidden divider"></div>
        
                        <div className="ui  cards">
                            {this.renderJournalCards(this.state.journalEntries)}
                        </div>
                </div>
        )
    } else {
        return(
            <InfoPanel 
            header={"Welcome to Chingu Journal"} 
            cardHeader={"What It's All About"} 
            cardContent={"Welcome to Chingu Journal, a place where you can log your innermost thoughts and some of your daily happenings. It's private and unique to you and you only. Edit and Delete your entries at will. Log in or sign up to get started."} 
            />
        ) 
    }
}

renderJournalCards = (entries) => {
    
    if (entries.length === 0) {
        return (
                <Fragment>
                    <br />
                    <br />
                    <br />
                    <h1>Your Journal is Empty</h1>
                </Fragment>
            ) 
            
    } else {
        return entries.map((entry) => {
            return(
                
                    <JournalEntryCard key={entry.id}  entry={entry} handleDeleteEntry={this.handleDeleteEntry} handleEditEntry={this.handleEditEntry} />

                    ) 
                
                
    })
    }
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

    handleSubmitNewEntry = async (event) =>  {
        event.preventDefault()
        const response = await chinguRailsAPI.post(
        "/entries", 
        {
            "entry": {"title": this.state.entryTitle, "body": this.state.entryBody, "user_id": this.props.user_id}
        },
        {headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": this.props.token
        }}

        )
        this.setState(prevState => ({
            
            entryTitle: '',
            entryBody: '',
            journalEntries: [...prevState.journalEntries, response.data]
        }))
    
        
        
    }

    

    handleDeleteEntry = (id) => {
        this.setState((prevState) =>({
            journalEntries: prevState.journalEntries.filter((entry) => entry.id !== id ? entry : null)
        }))
    }

    handleEditEntry = (editedEntry) => {
        this.setState((prevState) => ({
            journalEntries: prevState.journalEntries.map((entry) => entry.id === editedEntry.id ? entry = editedEntry : entry )
        }))
    }

    render() {


        return (
            <div>
                {this.renderNewEntryForm()}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        token: state.auth.token,
        user_id: state.auth.user_id
    }
}

export default connect(mapStateToProps)(JournalList)