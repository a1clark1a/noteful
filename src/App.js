import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import MainRoute from "./components/MainRoute/MainRoute";
import DynamicFolder from "./components/DynamicFolderRoute/DynamicFolder";
import DynamicNoteRoute from "./components/DynamicNoteRoute/DynamicNoteRoute";
import Error from "./components/Error/Error";
import NotefulContext from "./notefulContext";
import "./App.css";

class App extends Component {
  state = {
    notes: [],
    folders: []
  };

  componentDidMount() {
    this.getFolders();
    this.getNotes();
  }

  getFolders = () => {
    return fetch("http://localhost:9090/folders")
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
    return fetch("http://localhost:9090/notes")
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

  setFolders = folders => {
    console.log(folders);
    this.setState({ folders });
  };

  setNotes = notes => {
    console.log("notes", notes);
    this.setState({ notes });
  };

  render() {
    return (
      <>
        <header>
          <nav>
            <Link to="/">
              <h1>Noteful App</h1>
            </Link>
          </nav>
        </header>
        <main className="App">
          <NotefulContext.Provider
            value={{
              folders: this.state.folders,
              notes: this.state.notes
            }}
          >
            <Switch>
              <Route path="/folder/:folderId" component={DynamicFolder} />
              <Route path="/note/:noteId" component={DynamicNoteRoute}></Route>
              <Route exact path="/" component={MainRoute} />
              <Route path="/*" component={Error} />
            </Switch>
          </NotefulContext.Provider>
        </main>
      </>
    );
  }
}

export default App;
