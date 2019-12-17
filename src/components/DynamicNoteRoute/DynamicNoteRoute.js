import React, { Component } from "react";
import { Link } from "react-router-dom";
import NotefulContext from "../../notefulContext";
import "./DynamicNoteRoute.css";

export default class DynamicNoteRoute extends Component {
  static contextType = NotefulContext;

  render() {
    const { folders, notes } = this.context;
    const note = notes.find(i => {
      return i.id === this.props.match.params.noteId;
    });

    const folder = folders.find(i => {
      return i.id === note.folderId;
    });
    return (
      <>
        <section>
          <Link to="/">
            <h2>Go back</h2>
          </Link>
          <h2>{folder.name}</h2>
        </section>
        <article className="notes">
          <div>
            <h2>{note.name}</h2>
            <code>{note.modified}</code>
            <button>REMOVE</button>
          </div>
          <p>{note.content}</p>
        </article>
      </>
    );
  }
}

DynamicNoteRoute.defaultProps = {
  note: []
};
