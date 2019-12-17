import React, { Component } from "react";
import { Link } from "react-router-dom";
import NotefulContext from "../../notefulContext";
import DisplayFolder from "../DisplayFolder/DisplayFolder";
import DeleteNoteButton from "../DeleteNoteButton/DeleteNoteButton";
import "./DynamicFolder.css";

export default class DynamicFolder extends Component {
  static contextType = NotefulContext;
  render() {
    const clickedfolder = this.props.match.params.folderId;
    console.log(clickedfolder);
    const notes = this.context.notes;
    const notesInFolderList = notes.filter(note => {
      return note.folderId === clickedfolder;
    });

    const renderNotesInFolder = notesInFolderList.map((note, i) => {
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

    console.log(notesInFolderList);
    console.log(clickedfolder);
    return (
      <>
        <section className="sidebar">
          <DisplayFolder />
          <button>Add a folder</button>
        </section>
        <section className="noteList">
          <ul>{renderNotesInFolder}</ul>
          <button>Add a Note</button>
        </section>
      </>
    );
  }
}
