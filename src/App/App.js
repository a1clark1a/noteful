import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import NotePageMain from "../NotePageMain/NotePageMain";
import NoteListMain from "../NoteListMain/NoteListMain";
import NotePageNav from "../NotePageNav/NotePageNav";
import NoteListNav from "../NoteListNav/NoteListNav";
import STORE from "../dummy-store";
import { getNotesForFolder, findNote, findFolder } from "../note-helpers";
import "./App.css";

class App extends Component {
  state = {
    notes: [],
    folders: []
  };

  componentDidMount() {
    //fake date loading from API call
    setTimeout(() => this.setState(STORE), 600);
  }

  renderNavRoutes() {
    const { notes, folders } = this.state;
    return (
      <>
        {["/", "/folder/:folderId"].map(path => {
          return (
            <Route
              exact
              key={path}
              path={path}
              render={routeProps => (
                <NoteListNav folders={folders} notes={notes} {...routeProps} />
              )}
            />
          );
        })}

        <Route
          path="/note/:noteId"
          render={routeProps => {
            const { noteId } = routeProps.match.params;
            const note = findNote(notes, noteId) || {};
            const folder = findFolder(folders, note.folderId);
            return <NotePageNav {...routeProps} folder={folder} />;
          }}
        />
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NotePageNav} />
      </>
    );
  }

  renderMainRoutes() {
    const { notes, folders } = STORE;
    return (
      <>
        {["/", "/folder/:folderId"].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => {
              const { folderId } = routeProps.match.params;
              const notesForFolder = getNotesForFolder(notes, folderId);
              return <NoteListMain {...routeProps} notes={notesForFolder} />;
            }}
          />
        ))}
      </>
    );
  }

  render() {
    return <main className="App">FREEEESH</main>;
  }
}

export default App;
