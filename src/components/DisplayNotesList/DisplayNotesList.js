import React, { Component } from "react";
import { Link } from "react-router-dom";
import NotefulContext from "../../notefulContext";
import DeleteNoteButton from "../DeleteNoteButton/DeleteNoteButton";

export default class DisplayNoteList extends Component {
  static contextType = NotefulContext;
  render() {
    const notes = this.context.notes;
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
    return <ul>{noteList}</ul>;
  }
}
