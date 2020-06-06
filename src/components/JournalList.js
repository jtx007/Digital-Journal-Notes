import React, { useState, useEffect } from "react";
import digitalJournalAPI from "../api/digitalJournalAPI";
import { LoginContext } from "../auth/loginContext";
import JournalEntryCard from "./JournalEntryCard";
import InfoPanel from "./InfoPanel";

const JournalList = ({ isLoggedIn, token, user_id }) => {
  const [journalEntries, setJournalEntries] = useState([]);
  const [entryTitle, setEntryTitle] = useState("");
  const [entryBody, setEntryBody] = useState("");
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const getAllJournalEntries = async () => {
      await digitalJournalAPI.get("/users/ping");
      if (isLoggedIn) {
        const response = await digitalJournalAPI.get(`/users/${user_id}`, {
          headers: { Authorization: token },
        });
        setJournalEntries(response.data.entries);
        setCurrentUser(response.data.username);
      }
    };
    getAllJournalEntries();
  }, [isLoggedIn, token, user_id]);

  const renderNewEntryForm = () => {
    if (isLoggedIn) {
      return (
        <div className="ui container">
          <div className="ui hidden divider"></div>

          <InfoPanel
            header={`Welcome ${currentUser}  |  Create A Note`}
            cardContent={"Record your thoughts here"}
          />
          <form onSubmit={handleSubmitNewEntry} className="ui container form">
            <div className="field">
              <label>Entry Title</label>
              <input
                onChange={(e) => setEntryTitle(e.target.value)}
                type="text"
                value={entryTitle}
                required
              />
            </div>
            <div className="field">
              <label>Body</label>
              <textarea
                onChange={(e) => setEntryBody(e.target.value)}
                type="text"
                value={entryBody}
                required
              />
            </div>
            <button className="ui primary button" type="submit">
              Submit
            </button>
          </form>
          <div className="ui hidden divider"></div>

          <div className="ui  cards">{renderJournalCards(journalEntries)}</div>
        </div>
      );
    } else {
      return (
        <InfoPanel
          header={"Digital Journal"}
          cardHeader={"What It's All About"}
          cardContent={
            "Welcome to your Digital Journal, a place where you can log your innermost thoughts and some of your daily happenings. It's private and unique to you and you only. Edit and Delete your entries at will. Log in or sign up to get started."
          }
        />
      );
    }
  };

  const renderJournalCards = (entries) => {
    if (entries.length === 0) {
      return (
        <>
          <br />
          <br />
          <br />
          <h1>Your Journal is Empty</h1>
        </>
      );
    } else {
      return entries
        .map((entry) => {
          return (
            <JournalEntryCard
              key={entry.id}
              entry={entry}
              handleDeleteEntry={handleDeleteEntry}
              handleEditEntry={handleEditEntry}
            />
          );
        })
        .sort((entryA, entryB) => {
          return entryB.key - entryA.key;
        });
    }
  };

  const handleSubmitNewEntry = async (event) => {
    event.preventDefault();
    try {
      const response = await digitalJournalAPI.post(
        "/entries",
        {
          entry: { title: entryTitle, body: entryBody, user_id: user_id },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      );

      setEntryTitle("");
      setEntryBody("");
      setJournalEntries([...journalEntries, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteEntry = (id) => {
    setJournalEntries(
      journalEntries.filter((entry) => (entry.id !== id ? entry : null))
    );
  };

  const handleEditEntry = (editedEntry) => {
    setJournalEntries(
      journalEntries.map((entry) =>
        entry.id === editedEntry.id ? (entry = editedEntry) : entry
      )
    );
  };

  return <div>{renderNewEntryForm()}</div>;
};

const JournalListWithContext = () => {
  return (
    <LoginContext.Consumer>
      {(value) => {
        return <JournalList {...value} />;
      }}
    </LoginContext.Consumer>
  );
};

export default JournalListWithContext;
