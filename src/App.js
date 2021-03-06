import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import MainRoute from "./components/MainRoute/MainRoute";
import DynamicFolder from "./components/DynamicFolderRoute/DynamicFolder";
import DynamicNoteRoute from "./components/DynamicNoteRoute/DynamicNoteRoute";
import Error from "./components/Error/Error";
import NotefulContext from "./notefulContext";
import AddFolder from "./components/AddFolder/AddFolder";
import AddNote from "./components/AddNote/AddNote";
import config from "./components/config";

import "./App.css";

class App extends Component {
  state = {
    notes: [],
    folders: [],
    error: null
  };

  componentDidMount() {
    this.getFolders();
    this.getNotes();
  }

  getFolders = () => {
    return fetch(config.FOLDERS_API_ENDPOINT)
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error(resp.status);
      })
      .then(this.setFolders)
      .catch(error => {
        console.log(error.message);
        return this.setState({ error });
      });
  };

  getNotes = () => {
    return fetch(config.NOTES_API_ENDPOINT)
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error(resp.status);
      })
      .then(this.setNotes)
      .catch(error => {
        console.log("notes error", error.message);
        return this.setState({ error });
      });
  };

  deleteNote = notes_id => {
    const newNoteList = this.state.notes.filter(note => {
      return note.id !== notes_id;
    });
    this.setState({
      notes: newNoteList
    });
  };

  setFolders = folders => {
    this.setState({ folders });
  };

  setNotes = notes => {
    this.setState({ notes });
  };

  addFolders = folder => {
    this.setState({
      folders: [...this.state.folders, folder]
    });
  };

  addNotes = note => {
    this.setState({
      notes: [...this.state.notes, note]
    });
  };

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote,
      addFolder: this.addFolders,
      addNote: this.addNotes
    };
    return (
      <>
        <header>
          <nav>
            <Link to="/">
              <h1 className="title">NOTEFUL APP</h1>
            </Link>
          </nav>
        </header>
        <main className="App">
          <NotefulContext.Provider value={contextValue}>
            <Switch>
              <Route exact path="/" component={MainRoute} />
              <Route path="/folder/:folders_id" component={DynamicFolder} />
              <Route path="/note/:notes_id" component={DynamicNoteRoute} />
              <Route path="/AddFolder" component={AddFolder} />
              <Route path="/AddNote" component={AddNote} />
              <Route path="/*" component={Error} />
            </Switch>
          </NotefulContext.Provider>
        </main>
      </>
    );
  }
}

export default App;
