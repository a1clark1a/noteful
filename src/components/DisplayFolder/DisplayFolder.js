import React, { Component } from "react";
import { Link } from "react-router-dom";
import NotefulContext from "../../notefulContext";
import { getNumofNotesInFolder } from "../../helper";
import ErrorBoundary from "../Error/ErrorBoundary";
import PropTypes from "prop-types";

export default class DisplayFolder extends Component {
  static contextType = NotefulContext;
  render() {
    const { folders, notes } = this.context;
    const folderList = folders.map((folder, i) => {
      const num = getNumofNotesInFolder(folder, notes);
      return (
        <li key={`folder-${i}`} className="folderWrapper">
          <Link to={`/folder/${folder.id}`}>
            <h3 className="individFolders_name">{folder.name}</h3>
          </Link>
          <code> Notes: {num}</code>
          {/* TODO add an Update Folder component */}
          {/* TODO add an Delete Folder component */}
        </li>
      );
    });

    return (
      <ErrorBoundary>
        <h2 className=" notes header">Folders</h2>
        <ul>{folderList}</ul>
        <Link to="/AddFolder">
          <button className="addFolder_button">ADD FOLDER</button>
        </Link>
      </ErrorBoundary>
    );
  }
}

DisplayFolder.defaultProps = {
  folders: [],
  notes: []
};

DisplayFolder.propTypes = {
  folders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ),
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      modified: PropTypes.string.isRequired,
      folderId: PropTypes.string.isRequired,
      content: PropTypes.string
    })
  )
};
