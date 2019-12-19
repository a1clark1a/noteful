import React, { Component } from "react";
import { Link } from "react-router-dom";
import NotefulContext from "../../notefulContext";
import { getNumofNotesInFolder } from "../../helper";
import ErrorBoundary from "../Error/ErrorBoundary";

export default class DisplayFolder extends Component {
  static contextType = NotefulContext;
  render() {
    const { folders, notes } = this.context;
    const folderList = folders.map((folder, i) => {
      const num = getNumofNotesInFolder(folder, notes);
      return (
        <li key={`folder-${i}`} className="folderWrapper">
          <Link to={`/folder/${folder.id}`}>
            <h3>{folder.name}</h3>
          </Link>
          <code> {num}</code>
        </li>
      );
    });

    return (
      <ErrorBoundary>
        <ul>{folderList}</ul>
        <Link to="/AddFolder">
          <button>ADD FOLDER</button>
        </Link>
      </ErrorBoundary>
    );
  }
}
