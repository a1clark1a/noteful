import React from "react";
import STORE from "../../dummy-store";
import "./DynamicNoteRoute.css";

export default function DynamicNoteRoute(props) {
  const note = STORE.notes.find(i => {
    return i.id === props.match.params.noteId;
  });

  return (
    <article className="notes">
      <h2>{note.name}</h2>
      <p>{note.content}</p>
    </article>
  );
}

DynamicNoteRoute.defaultProps = {
  note: []
};
