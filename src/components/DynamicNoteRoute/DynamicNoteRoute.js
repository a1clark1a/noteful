import React from "react";
import { Link } from "react-router-dom";
import "./DynamicNoteRoute.css";

export default function DynamicNoteRoute(props) {
  const { folders, notes } = props;
  const note = notes.find(i => {
    return i.id === props.match.params.noteId;
  });

  const folder = folders.find(i => {
    return i.id === note.folderId;
  });

  console.log(props);
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

DynamicNoteRoute.defaultProps = {
  note: []
};
