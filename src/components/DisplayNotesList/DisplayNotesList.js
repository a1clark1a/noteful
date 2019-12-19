import React, { Component } from "react";
import { Link } from "react-router-dom";
import NotefulContext from "../../notefulContext";
import DeleteNoteButton from "../DeleteNoteButton/DeleteNoteButton";
import ErrorBoundary from "../Error/ErrorBoundary";
import { notesInFolderList } from "../../helper";
import PropTypes from "prop-types";

export default class DisplayNoteList extends Component {
  static contextType = NotefulContext;

  render() {
    const clickedfolderId = this.props.clickedfolderId;
    const notes = !clickedfolderId
      ? this.context.notes
      : notesInFolderList(this.context.notes, clickedfolderId);
    const noteList = notes.map((note, i) => {
      return (
        <li key={`note${i}`} className="noteWrapper">
          <Link to={`/note/${note.id}`}>
            <h2>{note.name}</h2>
          </Link>
          <span>{note.modified}</span>
          <DeleteNoteButton noteId={note.id} />
        </li>
      );
    });
    return (
      <ErrorBoundary>
        <ul>{noteList}</ul>
        <Link to="/AddNote">
          <button>ADD NOTES</button>
        </Link>
      </ErrorBoundary>
    );
  }
}

DisplayNoteList.defaultProps = {
  clickedfolderId: ""
};

DisplayNoteList.propTypes = {
  clickedfolderId: PropTypes.string.isRequired
};
