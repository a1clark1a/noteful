import React, { Component } from "react";
import { Link } from "react-router-dom";
import STORE from "../../dummy-store";
import "./MainRoute.css";

class MainRoute extends Component {
  render() {
    const { folders, notes } = STORE;
    const noteList = notes.map((note, i) => {
      return (
        <div key={`note${i}`} className="noteWrapper">
          <Link to={`/note/${note.id}`}>
            <h2>{note.name}</h2>
          </Link>
          <span>{note.modified}</span>
          <button>Remove</button>
        </div>
      );
    });

    const folderList = folders.map((folder, i) => {
      return (
        <div key={`folder-${i}`} className="folderWrapper">
          <Link to={`/folder/${folder.id}`}>
            <h3>{folder.name}</h3>
          </Link>
          <code> num</code>
        </div>
      );
    });
    return (
      <>
        <section>
          <div className="sidebar">{folderList}</div>
        </section>
        <section className="notesList">{noteList}</section>
      </>
    );
  }
}

export default MainRoute;
