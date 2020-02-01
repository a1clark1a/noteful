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
    const clickedfolderId = Number(this.props.clickedfolderId);
    const notes = !clickedfolderId
      ? this.context.notes
      : notesInFolderList(this.context.notes, clickedfolderId);
    const noteList = notes.map((note, i) => {
      const date = new Date(note.modified);
      return (
        <li key={`note${i}`} className="noteWrapper">
          <Link to={`/note/${note.id}`}>
            <h2 className="individNotes_name">{note.name}</h2>
          </Link>
          <code>Date modified: {date.toLocaleDateString()}</code>
          <DeleteNoteButton notes_id={note.id} />
        </li>
      );
    });
    return (
      <ErrorBoundary>
        <h2 className="notes header">List of Notes</h2>
        <ul>{noteList}</ul>
        <Link to="/AddNote">
          <button className="addNote_button">ADD NOTES</button>
        </Link>
      </ErrorBoundary>
    );
  }
}

DisplayNoteList.defaultProps = {
  clickedfolderId: 0,
  notes: []
};

DisplayNoteList.propTypes = {
  clickedfolderId: PropTypes.number.isRequired,
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      modified: PropTypes.string.isRequired,
      folderId: PropTypes.string.isRequired,
      content: PropTypes.string
    })
  )
};
